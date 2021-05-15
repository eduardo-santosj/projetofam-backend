const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OngsModel = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        dateOfBirth: {type: Date, required: false, default: '' },
        identificationNumber: { type: String, required: false, default: '' },
        password: {type: String, required: false, default: ''},
        phone: {
            cellPhone: {type: String, required: false, default: ''},
            homePhone: {type: String, required: false, default: ''}
        },
        Address: {
            zipcode: {type: String, required: false, default: ''},
            street: {type: String, required: false, default: ''},
            number: {type: Number, required: false, default: ''},
            complement: {type: String, required: false, default: ''},
            neighbourhood: {type: String, required: false, default: ''},
            city: {type: String, required: false, default: ''},
            state: {type: String, required: false, default: ''}
        },
        typeAccess: {type: String, required: false, default:'ONG'}
    }, { collection: 'ongs' }
)

module.exports = mongoose.model('brand', OngsModel)
