const List = require('../models/list');
const Item = require('../models/item');

module.exports = {
    async getLists(req, res, next) {
        // pull user ID from logged in user.
        const { id } = res.locals.currentUser;
        const lists = await List.find({ user: { _id: id } })
            .populate('user')
            .populate({
                path: 'items',
                options: {
                    limit: 5,
                    sort: { created: -1 },
                },
            }).exec()
        res.render('lists/index', { lists });
    },
    getNewList(req, res, next) {
        res.render('lists/new');
    },
    async postNewList(req, res, next) {
        const { title } = req.body;
        const newList = await new List({ title });
        newList.user = req.user._id;
        await newList.save();
        req.flash('success', 'New list has been added');
        res.redirect(`/lists/${newList._id}`);
    },
    async showList(req, res, next) {
        const { id } = req.params;
        const list = await List.findById(id)
            .populate({
                path: 'items',
                options: {
                    sort: { title: 1 }
                }
            })
        res.render('lists/show', { list });
    },
    async postNewItem(req, res, next) {
        const { title, quantity } = req.body;
        const { id } = req.params;
        const list = await List.findById(id)
        const item = await new Item({ title, quantity });
        item.user = req.user._id;
        list.items.push(item);
        await item.save();
        await list.save();
        req.flash('success', 'Added a new item to this list!');
        res.redirect(`/lists/${id}`,);
    },
    async deleteList(req, res, next) {
        const { id } = req.params;
        await List.findByIdAndDelete(id);
        req.flash('success', 'Successfully deleted list');
        res.redirect('/lists');
    },
    async deleteItem(req, res, next) {
        const { id } = req.params;
        const { deleteItems } = req.body;
        if (deleteItems) {
            if ((typeof deleteItems) === 'string') {
                await List.findByIdAndUpdate(id, {
                    $pull: { items: deleteItems}
                });
                await Item.findByIdAndDelete(deleteItems);
                req.flash('success', 'Succesffully deleted item');
                return res.redirect(`/lists/${id}`);
            } else {
                const deletions = deleteItems.length;
                for(let i = 0; i < deletions; i++ ) {
                    await List.findByIdAndUpdate(id, {
                        $pull: { items: deleteItems[i]}
                    });
                    await Item.findByIdAndDelete(deleteItems[i]);
                }
                req.flash('success', 'Succesffully deleted multiple items');
                return res.redirect(`/lists/${id}`);
            }
        } else {
            // console.log('deleteItems is empty therefore undefined')
            return res.redirect(`/lists/${id}`);
        }
    },
    async getListApi(req, res, next) {
        const { id } = req.params;
        const list = await List.findById(id)
            .populate({
                path: 'items',
                options: {
                    sort: { title: 1 }
                }
            });
        res.send(list);
    },
    async putCheck(req, res, next) {
        const { itemId } = req.params;
        const item = await Item.findById(itemId);
        if(item.checked === true) {
            item.checked = false;
        } else if(item.checked === false) {
            item.checked = true;
        }
        item.save();
        res.send(item);
    }
}