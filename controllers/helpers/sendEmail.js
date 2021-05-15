const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

const emails = require('./emails')


sendEmail = async (req, res) => {
  let mailOptions
  const transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 25,
    secure: false,
    auth: {
      user: 'numeric.bsifam@gmail.com',
      pass: 'Mortadela@1236'
    },
    tls: { rejectUnauthorized: false }
  }));

  if(res === 'preClient') {
    mailOptions = {
      from: 'S.O.S Pet',
      to: req.email,
      subject: 'teste de email',
      text: emails.preClient
    };
  } else if(res === 'fullClient') {
    mailOptions = {
      from: 'S.O.S Pet',
      to: req.email,
      subject: 'teste de email',
      text: emails.fullClient
    };
  } else if(res === 'fullOngs') {
    mailOptions = {
      from: 'S.O.S Pet',
      to: req.email,
      subject: 'teste de email',
      text: emails.fullOngs
    };
  } 
  // else {
  //   mailOptions = {
  //     from: 'S.O.S Pet',
  //     to: 'eduardosantosj2@gmail.com',
  //     subject: 'teste de email',
  //     html: emails.fullClient
  //   };
  // }
  
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      return console.log(error);
    } else {
      return console.log('Email sent: ' + info.response);
    }
  }); 
}

module.exports = {
  sendEmail,
}