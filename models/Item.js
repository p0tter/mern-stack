const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const ItemSChema = new Schema({
    name: {
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }    
});

module.exports = Item = mongoose.model('item',ItemSChema);