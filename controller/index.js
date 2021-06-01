const List = require('../models/list');
const Item = require('../models/item');

module.exports = {
    async getLists(req, res, next) {
        const lists = await List.find({});
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
        res.redirect('/lists');
    },
    async showList(req, res, next) {
        const { id } = req.params;
        const list = await List.findById(id).populate('items')
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
        const { id, item_id } = req.params;
        await List.findByIdAndUpdate(id, {
            $pull: { items: item_id }
        });
        await Item.findByIdAndDelete(item_id);
        req.flash('success', 'Item deleted from list');
        res.redirect(`/lists/${id}`);
    }

}