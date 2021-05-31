const List = require('../models/list');
const Item = require('../models/item');

module.exports = {
    async getLists(req, res, next) {
        res.render('lists/index');
    },
    getNewList(req, res, next) {
        res.render('lists/new');
    },
    async postNewList(req, res, next) {
        res.send('POST NEW LIST');
    },
    async showList(req, res, next) {
        res.render('lists/show');
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