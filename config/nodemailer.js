const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");
// const SMTPTransport = require("nodemailer/lib/smtp-transport");

let transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  //Todo done development part I check only local host I am pushing github paswword I write wrong .
  auth: {
    user: process.env.GOOGLE_USER_EMAIL,
    pass: process.env.GOOGLE_USER_PASSWORD,
  },
tls: {
    rejectUnauthorized: false,
  },
});

let renderTemplate = (data, relative) => {
  let mailHTML;
  ejs.renderFile(
    path.join(__dirname, "../views/mailers", relative),
    data,
    function (err, template) {
      if (err) {
        console.log("Error in rendering template", err);
        return;
      }

      mailHTML = template;
    }
  );

  return mailHTML;
};

module.exports = {
  transporter: transporter,
  renderTemplate: renderTemplate,
};
