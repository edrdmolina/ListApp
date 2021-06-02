const express = require('express');
const router = express.Router();
const {
    catchAsync,
} = require('../middleware')
const list = require('../controller');

// GET home index of list /lists/
router.get('/', catchAsync(list.getLists));

// GET new list /lists/new
router.get('/new', (list.getNewList));

// POST new list
router.post('/', catchAsync(list.postNewList))

// GET show list items /list/:id
router.get('/:id', catchAsync(list.showList));

// POST item into list /list/:id
router.post('/:id', catchAsync(list.postNewItem));

// DELETE list
router.delete('/:id', catchAsync(list.deleteList));

// DELETE ITEM
router.put('/:id', catchAsync(list.deleteItem));

module.exports = router;
