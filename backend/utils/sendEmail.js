const nodemailer = require("nodemailer");
const Handlebars = require("handlebars");

const sendEmail = async (options) => {
  var transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "b2029aefb66429",
      pass: "878281482daf22",
    },
  });

  var source =
    "<h1>{{subject}}</h1>" + "<h4>{{message}}</h4>" + "<br/>" + "<a href={{href}}>{{link}}</a>";

  var template = Handlebars.compile(source);
  var data = {
    subject: `${options.subject}`,
    message: `${options.message}`,
    link: `${options.link}`,
  };
  var result = template(data);

  await transporter.sendMail({
    from: '"EcomApp", <admin@ecomApp.com>', // sender address
    to: `kamal,  ${options.email}`, // list of receivers
    subject: options.subject, // Subject line
    text: options.text, // plain text body
    html: result,
  });
};

module.exports = sendEmail;
// `
//     <h1>${options.subject}</h1>
//     <h4>${options.message}</h4>
//     <br/>
//     <a href="https://stackoverflow.com/" id="emaillink">${options.link}</a>
//     `
