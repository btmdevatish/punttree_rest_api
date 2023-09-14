const mongoose = require('mongoose')
const Schema = mongoose.Schema

const blogSchema = Schema({
    _id: Schema.Types.ObjectId,
    title: {type: String, require: true},
    slug: { type: String, require: true },
    featured_img: { type: String, require: true },
    short_desc: { type: String, require: true },
    desc: {type: String}
})

module.exports = mongoose.model('Blog', blogSchema)