const express = require('express')

const LoginCtrl = require('../controllers/login-ctrl')

const router = express.Router()

router.post('/login', LoginCtrl.loginClient)

module.exports = router