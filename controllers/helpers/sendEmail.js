var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var handlebars = require('handlebars');
var fs = require('fs');

sendEmail = async (req, res) => {

  var readHTMLFile = function(path, callback) {
    fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
      console.log('path',path, 'html',html, 'err', err)
        if (err) {
            throw err;
            callback(err);
        }
        else {
            callback(null, html);
        }
    });
  };
  
  smtpTransport = nodemailer.createTransport(smtpTransport({
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
    readHTMLFile(__dirname + '/templatesEmails/preClient.html', function(err, html) {
      var template = handlebars.compile(html);
      var replacements = {
           username: req.name
      };
      var htmlToSend = template(replacements);
      var mailOptions = {
        from: 'S.O.S Pet',
        to: req.email,
        subject: 'Pré Cadastro',
        html : htmlToSend,
      };
      smtpTransport.sendMail(mailOptions, function (error, response) {
          if (error) {
              console.log(error);
              callback(error);
          }
      });
    });
  } else if(res === 'fullClient') {
    readHTMLFile(__dirname + '/templatesEmails/fullClient.html', function(err, html) {
      var template = handlebars.compile(html);
      var replacements = {
           username: req.name
      };
      var htmlToSend = template(replacements);
      var mailOptions = {
        from: 'S.O.S Pet',
        to: req.email,
        subject: 'Cadastro de Cliente finalizado!',
        html : htmlToSend,
      };
      smtpTransport.sendMail(mailOptions, function (error, response) {
          if (error) {
              console.log(error);
              callback(error);
          }
      });
    });
  } else if(res === 'fullOngs') {
    readHTMLFile(__dirname + '/templatesEmails/fullOngs.html', function(err, html) {
      var template = handlebars.compile(html);
      var replacements = {
           username: req.name
      };
      var htmlToSend = template(replacements);
      var mailOptions = {
        from: 'S.O.S Pet',
        to: req.email,
        subject: 'Cadastro de Ong finalizado!',
        html : htmlToSend,
      };
      smtpTransport.sendMail(mailOptions, function (error, response) {
          if (error) {
              console.log(error);
              callback(error);
          }
      });
    });
  }
}

module.exports = {
  sendEmail,
}