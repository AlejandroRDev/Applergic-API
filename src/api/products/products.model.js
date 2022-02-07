const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: { type: String, trim: true, required: true },
    description: { type: String, trim: true, required: true},
    brand: { type: String, trim: true},
    image: {type: String, trim: true, required: true},
    allergens: [{ type: String, trim: true, required: true} ],
    barcode: { type: String, trim: true, required: true}
    
}, { timestamps: true })


const Product = mongoose.model('products', productSchema)
module.exports = Product