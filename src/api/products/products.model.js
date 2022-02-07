const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: { type: String, trim: true, required: true },
    description: { type: String, trim: true, required: true},
    brand: { type: String, trim: true},
    image: {type: String, trim: true, required: true},
    allergens: [{ type: Schema.Types.ObjectId, ref: 'allergens' }],
    barcode: { type: String, trim: true, required: true}
    
}, { timestamps: true })


const Product = mongoose.model('products', ProductSchema)
module.exports = Product