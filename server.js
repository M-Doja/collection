'use strict';

const cfg = require('./config.js');
const express = require('express');
const app = express();
const nodeMailer = require('nodemailer');
const router = express.Router();
const bodyParser = require('body-parser');


app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.sendFile('index.html');
});

// app.post('/contact/send', function(req,res){
// 	console.log('posting from server');
// 	var transporter = nodeMailer.createTransport({
// 		service:'Gmail',
// 		auth: {
//       user: cfg.fdsMailAccountSender,
//       pass: cfg.fdsMailAccountSenderPassword
// 		}
// 	});
//
// 	var mailOptions = {
// 		from:'LisanaPhoto <LisanaPhoto@gmail.com>',
// 		to:'dojadeveloper@gmail.com',
// 		subject:' website Submission',
// 		text: 'You have a submission with following details.... Name:'+req.body.name+ 'Email:' +req.body.email+ 'Message' +req.body.message,
// 		html:'<p>You have a submission with following details.... </p><ul><li>Name:' +req.body.name+'</li><li>Email:'+req.body.email+'</li><li>Message:'+req.body.message+' </li></ul>'
// 	};
//
// 	transporter.sendMail(mailOptions, function(error, info){
// 		if(error){
// 			console.log(error);
// 			res.redirect('/');
// 		} else {
// 			console.log('Message Sent:' +info.response);
// 			res.redirect('/');
// 		}
// 	})
// });

app.listen(3000,function(){
  console.log('Listening on port 3000');
})
