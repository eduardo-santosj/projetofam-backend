const ImagePost = require('../models/image-model');
const FullClient = require('../models/client-model');
const bcrypt = require('bcrypt');
const moment = require('moment-timezone');
const imageModel = require('../models/image-model');

async function uploadImage(req, res){

    const { originalName: name, size, key, location: url = '' } = req.file

    let image = new ImagePost({
        name,
        size,
        key,
        url
    });

    image
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: image._id,
                url: image.url,
                message: 'Imagem Salva!',
            })
        })
}

async function getImages(req, res){

    const image = await ImagePost.find();
    
    return res.json(image)
}

async function getImage(req, res){
    await ImagePost.findOne({ _id: req.params.id }, (err, image) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!image) {
            return res
                .status(404)
                .json({ success: false, error: `Imagem não encontrada` })
        }
        return res.status(200).json({ success: true, image: image })
    })
}


async function deleteImage(req, res){

    const image = await ImagePost.findById(req.params.id);

    await image.remove()
    
    return res.send()
}

module.exports = {
    uploadImage,
    getImages,
    getImage,
    deleteImage
}