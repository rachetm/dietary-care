const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    "name" : {
        type : String,
    },

    "ingredients" : 
    {
        type: Array,
    }
});

module.exports = mongoose.model('Product', ProductSchema);