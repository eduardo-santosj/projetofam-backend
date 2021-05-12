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
                message: 'Imagem Salva!',
            })
        })
}

async function getImage(req, res){

    const image = await ImagePost.find();
    
    return res.json(image)
}

async function deleteImage(req, res){

    const image = await ImagePost.findById(req.params.id);

    await image.remove()
    
    return res.send()
}

module.exports = {
    uploadImage,
    getImage,
    deleteImage
}