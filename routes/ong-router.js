const express = require('express')

const OngCtrl = require('../controllers/ong-ctrl')
const SendEmail = require('../controllers/helpers/sendEmail')

const router = express.Router()

router.post('/ongs', OngCtrl.createOng)
router.put('/ongs/:id', OngCtrl.updateOng)
router.put('/preclient/:id', OngCtrl.updatePreClient)
router.delete('/client/:id', OngCtrl.deleteClient)
router.get('/client/:email', OngCtrl.getClientById)
router.get('/clients', OngCtrl.getClients)
router.post('/send-email', SendEmail.sendEmail)

module.exports = router