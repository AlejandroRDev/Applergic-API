const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { validationPassword } = require('../../utils/validators/validations')
const { setError } = require('../../utils/error/error')

const userSchema = new mongoose.Schema({
    image: {type: String, trim: true, required: true},
    name: { type: String, trim: true, required: true },
    email: { type: String, trim: true, required: true, unique: true },
    password: { type: String, trim: true, required: true },
    phone: {type: Number, trim: true, required: true},
    emergencyContact: { type: String, trim: true},
    allergies: [{type: String, trim: true}]
}, { timestamps: true })

userSchema.pre("save", function (next) {
    if (!validationPassword(this.password)) {
        return next(setError(400, 'La contraseña no tiene los minimos requeridos'))
    }
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

const User = mongoose.model('users', userSchema)
module.exports = User