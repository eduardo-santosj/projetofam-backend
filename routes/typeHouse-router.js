const express = require('express')

const TypeHouseCtrl = require('../controllers/typeHouse-ctrl')

const router = express.Router()

router.get('/types', TypeHouseCtrl.getTypeHouse)

module.exports = router