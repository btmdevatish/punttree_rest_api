const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = Schema({
    _id: Schema.Types.ObjectId,
    email: {type: String, require: true},
    password: {type: String, require: true},
    full_name: {type: String, require: true},
    phone: {type: Number, require: true},
    is_active: {type: Boolean, require: true},
    isDeletedPartial: {type: Boolean, require: true},
    admin_email: {type: String, require: true},
    role: {type: String, require: true}
})

module.exports = mongoose.model('User', userSchema)