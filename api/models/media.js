const mongoose = require('mongoose')
const Schema = mongoose.Schema

const mediaSchema = Schema({
    _id: Schema.Types.ObjectId,
    large_url: {type: String, require: true},
    small_url: { type: String, require: true },
    name: { type: String, require: true },
    modified_date: { type: String, require: true },
    is_delete: {type: String}
})

module.exports = mongoose.model('Media', mediaSchema)