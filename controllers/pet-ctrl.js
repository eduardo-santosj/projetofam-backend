const OngsModel = require('../models/ong-model');
const Pets = require('../models/pet-model');

async function createPets(req, res) {
    const body = req.body
    let pets = null

    if (!body.name) {
        return res.status(400).json({
            success: false,
            message: 'Pet não foi criado!',
        })
    }

    pets = new Pets({
        name: body.name,
        old: body.old,
        gender: body.gender,
        castration: body.castration,
        vaccination: body.vaccination,
        infos_pet: body.infos_pet,
        type: body.type,
        breed: body.breed,
        color: body.color,
        images: body.images,
        userCreate: body.user,
        createDate: body.createDate,
    });

    if (!pets) {
        return res.status(400).json({ success: false, message: err })
    }

    pets
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: pets._id,
                message: 'Pet criado!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                success: false,
                message: 'Pet não foi Criado!',
            })
        })
    

}

async function getPets(req, res) {
    await Pets.find({}, (err, pet) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!pet) {
            return res
                .status(404)
                .json({ success: false, error: `Pet não encontrado` })
        }
        return res.status(200).json({ success: true, data: pet })
    }).catch(err => console.log(err))
}

async function getPetById(req, res) {
    await Pets.findOne({ _id: req.params.id }, (err, pet) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!pet) {
            return res
                .status(404)
                .json({ success: false, error: `Pet não encontrado` })
        }
        return res.status(200).json({ success: true, data: pet })
    }).catch(err => console.log(err))
}

async function getPetsIdUser(req, res) {
    await Pets.find({ userCreate: req.params.id }, (err, pet) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!pet) {
            return res
                .status(404)
                .json({ success: false, error: `Pet não encontrado` })
        }
        return res.status(200).json({ success: true, data: pet })
    }).catch(err => console.log(err))
}

module.exports = {
    createPets,
    getPets,
    getPetsIdUser,
    getPetById
}