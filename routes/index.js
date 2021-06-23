const express = require('express');
const router = express.Router();
const {
    catchAsync,
    isLoggedIn,
} = require('../middleware')
const list = require('../controller');

// GET home index of list /lists/
router.get('/', isLoggedIn, catchAsync(list.getLists));

// GET new list /lists/new
router.get('/new', isLoggedIn, (list.getNewList));

// POST new list
router.post('/', isLoggedIn, catchAsync(list.postNewList))

// GET show list items /list/:id
router.get('/:id', isLoggedIn, catchAsync(list.showList));

// POST item into list /list/:id
router.post('/:id', isLoggedIn, catchAsync(list.postNewItem));

// PUT item to check off /list/:id
router.put('/:id/api/:itemId', isLoggedIn, catchAsync(list.putCheck));

// DELETE list
router.delete('/:id', isLoggedIn, catchAsync(list.deleteList));

// DELETE ITEM
router.put('/:id', isLoggedIn, catchAsync(list.deleteItem));

module.exports = router;
