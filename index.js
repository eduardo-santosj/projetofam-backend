const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const path = require('path')
require('dotenv/config');


const db = require('./db')
const clientRouter = require('./routes/client-router')
const loginRouter = require('./routes/login-router')
const addressRouter = require('./routes/address-router')
const genderRouter = require('./routes/gender-router')
const typeHouseRouter = require('./routes/typeHouse-router')
const imageRouter = require('./routes/image-router')

const app = express()
const apiPort = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use('/files', express.static(path.resolve(__dirname, "tmp", "uploads")))

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/api', clientRouter)
app.use('/api', loginRouter)
app.use('/api', addressRouter)
app.use('/api', genderRouter)
app.use('/api', typeHouseRouter)
app.use('/api', imageRouter)

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))