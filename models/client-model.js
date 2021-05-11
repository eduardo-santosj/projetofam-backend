const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FullClient = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        dateOfBirth: {type: Date, required: false, default: '' },
        identificationNumber: { type: String, required: false, default: '' },
        gender: {type: Number, required: false, default: ''},
        phone: {
            cellPhone: {type: String, required: false, default: ''},
            homePhone: {type: String, required: false, default: ''}
        },
        Address: {
            CEP: {type: String, required: false, default: ''},
            street: {type: String, required: false, default: ''},
            number: {type: Number, required: false, default: ''},
            complement: {type: String, required: false, default: ''},
            neighbourhood: {type: String, required: false, default: ''},
            city: {type: String, required: false, default: ''},
            state: {type: String, required: false, default: ''},
            type: {type: String, required: false, default: ''},
        },
        isOng: {type: Boolean, required: false, default: false},
        alreadyAdopted: {type: Boolean, required: false, default: false},
        howManyAdopted: {type: String, required: false, default: ''}
    }, { collection: 'users' }
)

module.exports = mongoose.model('numerics', FullClient)
