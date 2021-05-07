const PreClient = require('../models/preclient-model');
const FullClient = require('../models/client-model');
const bcrypt = require('bcrypt');
const moment = require('moment-timezone');

async function createPreClient(req, res){
    const body = req.body

    if (!body.name) {
        return res.status(400).json({
            success: false,
            message: 'Cliente não foi criado!',
        })
    }

    let client = new PreClient({
        name: body.name,
        email: body.email,
        password: await bcrypt.hash(body.password, 5),
        finalizeRegistration: body.finalizeRegistration,
        createDate: moment(body.createDate, "YYYY-MM-DDT00:00:00.000Z").format()
    });

    if (!client) {
        return res.status(400).json({ success: false, message: err })
    }

    if (client) {
        await PreClient.findOne({ email: client.email }, (err, clientReturn) => {
            if(clientReturn)
                return res.status(400).json({ success: false, message: 'Cliente já Cadastrado em nosso sistema, caso não lembre a senha faça o lembrete de senha.' })
        }).catch(err => console.log(err))
    }

    client
        .save()
        .then(() => {
            return createClient(client, res)
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Cliente não foi criado!',
            })
        })
}

async function createClient(client, res){
    let Fullclient = new FullClient({
        name: client.name,
        email: client.email,
    });

    Fullclient
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: client._id,
                message: 'Cliente criado!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Cliente não foi criado!',
            })
        })
}

updateClient = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'Você tem que fornecer dados para atualizar.',
        })
    }

    Client.findOne({ _id: req.params.id }, (err, client) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Cliente não encontrado!',
            })
        }
        client.name = body.name
        client.email = body.email
        client.classification = body.classification
        client
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: client._id,
                    message: 'Cliente atualizado!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Não foi possivel atualizar o cliente!',
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

getClientById = async (req, res) => {
    await FullClient.findOne({ email: req.params.email }, (err, client) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!client) {
            return res
                .status(404)
                .json({ success: false, error: `Cliente não encontrado` })
        }
        return res.status(200).json({ success: true, data: {email: client.email, name: client.name, identificationNumber: client.identificationNumber, dateOfBirth: client.dateOfBirth, gender: client.gender, phone: client.phone, Address: client.Address, isOng: client.isOng, alreadyAdopted: client.alreadyAdopted, howManyAdopted: client.howManyAdopted } })
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
    createPreClient,
    createClient,
    updateClient,
    deleteClient,
    getClients,
    getClientById,
}