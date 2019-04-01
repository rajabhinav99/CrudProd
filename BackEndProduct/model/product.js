const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    prdname: {
        type: String,
        required: false
    },
    prdqty: {
        type: Number,
        required: false
    },
    prdbought: {
        type: Boolean,
        required: false
    }
});

const products = mongoose.model('products', productSchema);

module.exports = products;