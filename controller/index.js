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
        const list = await List.findById(id);
        res.render('lists/show', { list });
    },
    async postNewItem(req, res, next) {
        res.send('POST NEW ITEM TO LIST');
    },
    async deleteList(req, res, next) {
        res.send('DELETE LIST');
    },
    async deleteItem(req, res, next) {
        res.send('DELETE ITEM');
    }

}