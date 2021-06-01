const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');
const List = require('./list');

const ItemSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    quantity: Number,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
})

module.exports = mongoose.model('Item', ItemSchema);
