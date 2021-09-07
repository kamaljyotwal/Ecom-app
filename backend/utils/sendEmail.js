const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  var transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "b2029aefb66429",
      pass: "878281482daf22",
    },
  });

  await transporter.sendMail({
    from: '"plantApp", <admin@plantApp.com>', // sender address
    to: `kamal,  ${options.email}`, // list of receivers
    subject: options.subject, // Subject line
    text: options.text, // plain text body
    html: options.text, // html body
  });
};

module.exports = sendEmail;