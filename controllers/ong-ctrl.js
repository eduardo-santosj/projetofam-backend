const PreClient = require('../models/preclient-model');
const OngsModel = require('../models/ong-model');
const bcrypt = require('bcrypt');
const moment = require('moment-timezone');
const SendEmail = require('./helpers/sendEmail')

async function createOng(req, res) {
    const body = req.body
    let returnClient, returnOng = ''
    if (!body.name) {
        return res.status(400).json({
            success: false,
            message: 'ONG não foi criada!',
        })
    }

    if (body.name) {
        await PreClient.countDocuments({ email: body.email }, (err, count) => {
            if(count>0) {
                returnClient = count
                return returnClient, res.status(400).json({ success: false, message: 'E-mail já Cadastrado em nosso sistema, caso não lembre a senha faça o lembrete de senha.' })
            }
        });
        await OngsModel.countDocuments({ email: body.email }, (err, ongCount) => {
            if(ongCount>0) {
                returnOng = ongCount
                return returnOng, res.status(400).json({ success: false, message: 'E-mail já Cadastrado em nosso sistema, caso não lembre a senha faça o lembrete de senha.' })
            }
        });
    }

    save();
    async function save() {
        if(((returnClient>0) || (returnOng>0))) {
            return res.status(400).json({ success: false, message: 'E-mail já Cadastrado em nosso sistema, caso não lembre a senha faça o lembrete de senha.' })
        } else {
            let ongs = new OngsModel({
                name: body.name,
                email: body.email,
                dateOfBirth: body.validation,
                identificationNumber: body.identificationNumber,
                password: await bcrypt.hash(body.password, 5),
                phone: body.phone,
                Address: body.Address,
                howManyAdopted: body.howManyAdopted
            });
        
            if (!ongs) {
                return res.status(400).json({ success: false, message: err })
            }
        
            ongs
                .save()
                .then(() => {
                    SendEmail.sendEmail(ongs, 'fullOngs')
                    return res.status(201).json({
                        success: true,
                        id: ongs._id,
                        message: 'ONG criada!',
                    })
                })
                .catch(error => {
                    return res.status(400).json({
                        success: false,
                        message: 'ONG não foi Criada!',
                    })
                })
        }
    }
    

}

updateOng = async (req, res) => {
    const body = req.body

    if (!body.identificationNumber) {
        return res.status(400).json({
            success: false,
            message: 'Você tem que fornecer dados para atualizar.',
        })
    }

    OngsModel.findOne({ _id: req.params.id }, (err, Ong) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Ong não encontrado!',
            })
        }

        Ong.identificationNumber = body.identificationNumber
        Ong.dateOfBirth = body.validation
        Ong.phone = body.phone
        Ong.Address = body.Address
        Ong.isOng = body.isOng
        Ong.alreadyAdopted = body.alreadyAdopted
        Ong.howManyAdopted = body.howManyAdopted
        Ong.gender = body.gender
        Ong
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: Ong._id,
                    message: 'ONG atualizada!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Não foi possivel atualizar a ONG!',
                })
            })
    })
}

deleteClient = async (req, res) => {
    await Client.findOneAndDelete({ _id: req.params.id }, (err, client) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!client) {
            return res
                .status(404)
                .json({ success: false, error: `Cliente não encontrado` })
        }

        return res.status(200).json({ success: true, data: client })
    }).catch(err => console.log(err))
}

getOngById = async (req, res) => {
    await OngsModel.findOne({ email: req.params.email }, (err, ongs) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!ongs) {
            return res
                .status(404)
                .json({ success: false, error: `Ong não encontrado` })
        }
        return res.status(200).json({ success: true, data: {id: ongs._id, email: ongs.email, name: ongs.name, identificationNumber: ongs.identificationNumber, dateOfBirth: ongs.dateOfBirth, gender: ongs.gender, phone: ongs.phone, Address: ongs.Address } })
    }).catch(err => console.log(err))
}

getClients = async (req, res) => {
    await Client.find({}, (err, client) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!client.length) {
            return res
                .status(404)
                .json({ success: false, error: `Clientes não encontrados` })
        }
        return res.status(200).json({ success: true, data: client })
    }).catch(err => console.log(err))
}

module.exports = {
    createOng,
    updateOng,
    updatePreClient,
    deleteClient,
    getClients,
    getClientById,
}