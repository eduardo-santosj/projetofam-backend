const mongoose = require('mongoose')
const Schema = mongoose.Schema

const getGender = new Schema(
    {
        name: { type: String, required: true },
        id: { type: Number, required: true }
    }, { collection: 'gender' }
)

module.exports = mongoose.model('gender', getGender)
