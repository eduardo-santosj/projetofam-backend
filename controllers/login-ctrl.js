const PreClient = require('../models/preclient-model');
const OngsModel = require('../models/ong-model');
const bcrypt = require('bcrypt');
const moment = require('moment-timezone');
const { validate } = require('../models/preclient-model');

async function comparePassword(body, returnClient, send) {
  await bcrypt.compare(body.passwordLogin, returnClient.password, function(err, res) {
    if (res>0) {
      send.status(200).json({ success: true, data: {id: returnClient._id, email: returnClient.email, finalizeRegistration: returnClient.finalizeRegistration, typeAccess: returnClient.typeAccess } })
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
  let returnClient, returnOng = ''
  if (!body) {
      return res.status(400).json({
          success: false,
          message: 'Cliente não foi encontrado!',
      })
  }

  await validatePre();
  async function validatePre() {
    if(body){
      await PreClient.countDocuments({ email: body.emailLogin }, async (err, count) => {
          if(count>0) {
            await PreClient.findOne({ email: body.emailLogin }, async (err, client) => {
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
      });
    }
  }
  await validateOng();
  async function validateOng() {
    if(body){
      await OngsModel.countDocuments({ email: body.emailLogin }, async (err, ongCount) => {
        if(ongCount>0) {
          await OngsModel.findOne({ email: body.emailLogin }, async (err, client) => {
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
      });
    }
  }
  
  await save(body, returnClient, returnOng, res);
  
}

async function save(body, returnClient, returnOng, res) {
  if(returnClient>0) {
    await PreClient.findOne({ email: body.emailLogin }, async (err, client) => {
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
  } else if(returnOng>0) {
    await OngsModel.findOne({ email: body.emailLogin }, async (err, client) => {
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
}


module.exports = {
  loginClient
}