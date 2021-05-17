const express = require('express')

const ClientCtrl = require('../controllers/client-ctrl')
const SendEmail = require('../controllers/helpers/sendEmail')

const router = express.Router()

router.post('/client', ClientCtrl.createPreClient)
router.put('/client/:id', ClientCtrl.updateClient)
router.put('/preclient/:id', ClientCtrl.updatePreClient)
router.delete('/client/:id', ClientCtrl.deleteClient)
router.get('/client/:email', ClientCtrl.getClientById)
router.get('/full/:email', ClientCtrl.getFullById)
router.get('/clients', ClientCtrl.getClients)
router.post('/send-email', SendEmail.sendEmail)

module.exports = router