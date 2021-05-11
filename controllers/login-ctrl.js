const PreClient = require('../models/preclient-model');
const bcrypt = require('bcrypt');
const moment = require('moment-timezone');

async function comparePassword(body, returnClient, send) {
  await bcrypt.compare(body.passwordLogin, returnClient.password, function(err, res) {
    if (res) {
      send.status(200).json({ success: true, data: {id: returnClient._id, email: returnClient.email, finalizeRegistration: returnClient.finalizeRegistration} })
    } else {
      return send.status(400).json({
        success: false,
        message: 'A senha não confere',
    })
    }
  });
}
async function loginClient(req, res){
  const body = req.body
  let returnClient = null

  if (!body) {
      return res.status(400).json({
          success: false,
          message: 'Cliente não foi encontrado!',
      })
  }

  await PreClient.findOne({ email: body.emailLogin }, (err, client) => {
    returnClient = client
    if (err) {
        return res.status(400).json({ success: false, message: err })
    }

    if (!client) {
        return res
            .status(404)
            .json({ success: false, message: `Cliente não encontrado` })
    }

    comparePassword(body, returnClient, res);
  }).catch(err => console.log(err))
}


module.exports = {
  loginClient
}