const mongoose = require('mongoose')

mongoose
    .connect('mongodb+srv://numeric:LWpass2010@numeric.dkgfo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db
