const express = require('express')

const ImgCtrl = require('../controllers/image-ctrl')

const router = express.Router()
const multer = require('multer')
const multerConfig = require('../config/multer')

router.post('/image', multer(multerConfig).single('file'), ImgCtrl.uploadImage)
// router.put('/client/:id', ClientCtrl.updateClient)
// router.put('/preclient/:id', ClientCtrl.updatePreClient)
router.delete('/image/:id', ImgCtrl.deleteImage)
router.get('/images', ImgCtrl.getImages)
router.get('/image/:id', ImgCtrl.getImage)

module.exports = router