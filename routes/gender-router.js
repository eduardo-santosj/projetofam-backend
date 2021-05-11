const express = require('express')

const GenderCtrl = require('../controllers/gender-ctrl')

const router = express.Router()

router.get('/gender', GenderCtrl.getGender)

module.exports = router