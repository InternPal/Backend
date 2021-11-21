require('dotenv').config()
var nodemailer = require('nodemailer');

const sendEmail = (role, name ,email, password)=>{
require('dotenv').config()
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD
  }
});

var mailOptions = {
  from: process.env.EMAIL,
  to: email,
  subject: "InternPal Login Credentials",
  text: `Hi ${name}, Your Login Credentials for the Role of ${role} are : \n Email : ${email} \n Password : ${password}`     
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
}



module.exports = sendEmail;