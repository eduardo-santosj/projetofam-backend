const express = require('express')

const ClientCtrl = require('../controllers/client-ctrl')

const router = express.Router()

router.post('/client', ClientCtrl.createPreClient)
router.put('/client/:id', ClientCtrl.updateClient)
router.delete('/client/:id', ClientCtrl.deleteClient)
router.get('/client/:email', ClientCtrl.getClientById)
router.get('/clients', ClientCtrl.getClients)

module.exports = router