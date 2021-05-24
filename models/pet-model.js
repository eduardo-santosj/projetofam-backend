const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Pets = new Schema(
    {
        name: { type: String, required: false },
        old: { type: String, required: false },
        gender: { type: String, required: false },
        castration: { type: Boolean },
        vaccination: { type: Boolean },
        infos_pet: { type: String, required: false },
        type: { type: String, required: false },
        breed: { type: String, required: false },
        color: { type: String, required: false },
        images: {type: Array, required: false},
        userCreate: { type: String, required: false },
        createDate: { type: Date },
    }, { collection: 'pets' }
)

module.exports = mongoose.model('pets', Pets)
