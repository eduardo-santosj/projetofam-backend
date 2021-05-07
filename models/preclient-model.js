const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PreClient = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        finalizeRegistration: { type: Boolean },
        createDate: { type: Date },
    }, { collection: 'users' }
)

module.exports = mongoose.model('numeric', PreClient)
