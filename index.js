const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv/config');


const db = require('./db')
const clientRouter = require('./routes/client-router')
const loginRouter = require('./routes/login-router')
const addressRouter = require('./routes/address-router')

const app = express()
const apiPort = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/api', clientRouter)
app.use('/api', loginRouter)
app.use('/api', addressRouter)

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))