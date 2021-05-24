const PreClient = require('../models/preclient-model');
const FullClient = require('../models/client-model');
const OngsModel = require('../models/ong-model');
const bcrypt = require('bcrypt');
const moment = require('moment-timezone');
const SendEmail = require('./helpers/sendEmail')

async function createPreClient(req, res) {
    const body = req.body
    let returnClient, returnOng = ''
    if (!body.name) {
        return res.status(400).json({
            success: false,
            message: 'Cliente não foi criado!',
        })
    }

    if (body.name) {
        await PreClient.countDocuments({ email: body.email }, (err, count) => {
            if (count > 0) {
                returnClient = count
                return returnClient, res.status(400).json({ success: false, message: 'E-mail já Cadastrado em nosso sistema, caso não lembre a senha faça o lembrete de senha.' })
            }
        });
        await OngsModel.countDocuments({ email: body.email }, (err, ongCount) => {
            if (ongCount > 0) {
                returnOng = ongCount
                return returnOng, res.status(400).json({ success: false, message: 'E-mail já Cadastrado em nosso sistema, caso não lembre a senha faça o lembrete de senha.' })
            }
        });
    }

    save();
    async function save() {
        if (((returnClient > 0) || (returnOng > 0))) {
            return res.status(400).json({ success: false, message: 'E-mail já Cadastrado em nosso sistema, caso não lembre a senha faça o lembrete de senha.' })
        } else {
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


            if (returnClient && returnClient.name) {
                return res.status(400).json({ success: false, message: 'Cliente já Cadastrado em nosso sistema, caso não lembre a senha faça o lembrete de senha.' })
            }

            client
                .save()
                .then(() => {
                    SendEmail.sendEmail(client, 'preClient')
                    return createClient(client, res)
                })
                .catch(error => {
                    return res.status(400).json({
                        success: false,
                        message: 'Cliente não foi criado!',
                    })
                })

        }
    }
}

async function createClient(client, res) {
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
                success: false,
                message: 'Cliente não foi criado!',
            })
        })
}

updateClient = async (req, res) => {
    const body = req.body

    if (!body.identificationNumber) {
        return res.status(400).json({
            success: false,
            message: 'Você tem que fornecer dados para atualizar.',
        })
    }

    FullClient.findOne({ _id: req.params.id }, (err, FullClient) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Cliente não encontrado!',
            })
        }

        FullClient.identificationNumber = body.identificationNumber
        FullClient.dateOfBirth = body.validation
        FullClient.phone = body.phone
        FullClient.Address = body.Address
        FullClient.isOng = body.isOng
        FullClient.alreadyAdopted = body.alreadyAdopted
        FullClient.howManyAdopted = body.howManyAdopted
        FullClient.gender = body.gender
        FullClient
            .save()
            .then(() => {
                SendEmail.sendEmail(client, 'fullClient')
                return res.status(200).json({
                    success: true,
                    id: FullClient._id,
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

updatePreClient = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            message: 'Você tem que fornecer dados para atualizar.',
        })
    }

    PreClient.findOne({ _id: req.params.id }, (err, preClient) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Cliente não encontrado!',
            })
        }
        preClient.finalizeRegistration = body.finalizeRegistration
        preClient
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: preClient._id,
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
        return res.status(200).json({ success: true, data: { id: client._id, email: client.email, name: client.name, identificationNumber: client.identificationNumber, dateOfBirth: client.dateOfBirth, gender: client.gender, phone: client.phone, Address: client.Address, isOng: client.isOng, alreadyAdopted: client.alreadyAdopted, howManyAdopted: client.howManyAdopted } })
    }).catch(err => console.log(err))
}

getFullByEmail = async (req, res) => {
    let body = ''
    body = req.params

    await validateClient();
    async function validateClient() {
        if(body){
        await FullClient.countDocuments({ email: body.email }, async (err, count) => {
            if(count>0) {
                await FullClient.findOne({ email: body.email }, (err, client) => {
                    if (err) {
                        return res.status(400).json({ success: false, error: err })
                    }
        
                    if (!client) {
                        return res
                            .status(404)
                            .json({ success: false, error: `Cliente não encontrado` })
                    }
                    return res.status(200).json({ success: true, data: { id: client._id, email: client.email, name: client.name, identificationNumber: client.identificationNumber, dateOfBirth: client.dateOfBirth, gender: client.gender, phone: client.phone, Address: client.Address, isOng: client.isOng, alreadyAdopted: client.alreadyAdopted, howManyAdopted: client.howManyAdopted, typeAccess: client.typeAccess } })
                }).catch(err => console.log(err))
            }
        });
        }
    }
    await validateOng();
    async function validateOng() {
        if(body){
            await OngsModel.countDocuments({ email: body.email }, async (err, ongCount) => {
                if(ongCount>0) {
                    await OngsModel.findOne({ email: body.email }, (err, ong) => {
                        if (err) {
                            return res.status(400).json({ success: false, error: err })
                        }
            
                        if (!ong) {
                            return res
                                .status(404)
                                .json({ success: false, error: `ONG não encontrado` })
                        }
            
                        return res.status(200).json({ success: true, data: { id: ong._id, email: ong.email, name: ong.name, identificationNumber: ong.identificationNumber, dateOfBirth: ong.dateOfBirth, phone: ong.phone, Address: ong.Address, howManyAdopted: ong.howManyAdopted, typeAccess: ong.typeAccess } })
                    }).catch(err => console.log(err))
                }
            });
        }
    }
}

getFullById = async (req, res) => {
    let body = ''
    body = req.params

    await validateClient();
    async function validateClient() {
        if(body){
        await FullClient.countDocuments({ _id: body.id }, async (err, count) => {
            if(count>0) {
                await FullClient.findOne({ _id: body.id }, (err, client) => {
                    if (err) {
                        return res.status(400).json({ success: false, error: err })
                    }
        
                    if (!client) {
                        return res
                            .status(404)
                            .json({ success: false, error: `Cliente não encontrado` })
                    }
                    return res.status(200).json({ success: true, data: { id: client._id, email: client.email, name: client.name, identificationNumber: client.identificationNumber, dateOfBirth: client.dateOfBirth, gender: client.gender, phone: client.phone, Address: client.Address, isOng: client.isOng, alreadyAdopted: client.alreadyAdopted, howManyAdopted: client.howManyAdopted, typeAccess: client.typeAccess } })
                }).catch(err => console.log(err))
            }
        });
        }
    }
    await validateOng();
    async function validateOng() {
        if(body){
            await OngsModel.countDocuments({ _id: body.id }, async (err, ongCount) => {
                if(ongCount>0) {
                    await OngsModel.findOne({ _id: body.id }, (err, ong) => {
                        if (err) {
                            return res.status(400).json({ success: false, error: err })
                        }
            
                        if (!ong) {
                            return res
                                .status(404)
                                .json({ success: false, error: `ONG não encontrado` })
                        }
            
                        return res.status(200).json({ success: true, data: { id: ong._id, email: ong.email, name: ong.name, identificationNumber: ong.identificationNumber, dateOfBirth: ong.dateOfBirth, phone: ong.phone, Address: ong.Address, howManyAdopted: ong.howManyAdopted, typeAccess: ong.typeAccess } })
                    }).catch(err => console.log(err))
                }
            });
        }
    }
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
    updatePreClient,
    deleteClient,
    getClients,
    getClientById,
    getFullByEmail,
    getFullById
}