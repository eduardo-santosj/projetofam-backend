const mongoose = require('mongoose')
const Schema = mongoose.Schema

const getTypeHouse = new Schema(
    {
        name: { type: String, required: true },
        id: { type: Number, required: true }
    }, { collection: 'typeHouse' }
)

module.exports = mongoose.model('typeHouse', getTypeHouse)
