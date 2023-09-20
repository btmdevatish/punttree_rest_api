const mongoose = require('mongoose')
const Schema = mongoose.Schema

const pagesSchema = Schema({
    _id: Schema.Types.ObjectId,
    logo: {type: String, require: true},
    land_mobile: { type: String, require: true },
    land_wave: { type: String, require: true },
    land_service1: { type: String, require: true },
    land_service2: { type: String, require: true },
    land_service3: { type: String, require: true },
    land_service4: { type: String, require: true },
    land_offer1: { type: String, require: true },
    land_offer2: { type: String, require: true },
    land_offer3: { type: String, require: true },
    land_offer4: { type: String, require: true },
    slider1:{ type: String, require: true },
    slider2:{ type: String, require: true }
})

module.exports = mongoose.model('Pages', pagesSchema)
