const mongoose = require('mongoose')

const AllergenSchema = new mongoose.Schema({
    name: { type: String, trim: true, required: true },
    image: {type: String, trim: true, required: true},
    
}, { timestamps: true });


const Allergen = mongoose.model('allergens', AllergenSchema);
module.exports = Allergen;