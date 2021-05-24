const express = require('express')

const PetCtrl = require('../controllers/pet-ctrl')

const router = express.Router()

router.post('/pets', PetCtrl.createPets)
// router.put('/ongs/:id', OngCtrl.updateOng)
// router.put('/preclient/:id', OngCtrl.updatePreClient)
// router.delete('/client/:id', OngCtrl.deleteClient)
router.get('/pets/', PetCtrl.getPets)
router.get('/pets/:id', PetCtrl.getPetById)
router.get('/petsUser/:id', PetCtrl.getPetsIdUser)
// router.post('/send-email', SendEmail.sendEmail)

module.exports = router