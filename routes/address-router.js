const express = require('express')

const AddressCtrl = require('../controllers/address-ctrl')

const router = express.Router()

router.get('/address/:cep', AddressCtrl.getAddresCep)

module.exports = router