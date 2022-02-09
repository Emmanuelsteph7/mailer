const nodemailer = require("nodemailer");
const nodeMailgun = require("nodemailer-mailgun-transport");

exports.sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: `${process.env.SMTP_HOST}`,
    port: `${process.env.SMTP_PORT}`,
    auth: {
      user: `${process.env.SMTP_USER}`,
      pass: `${process.env.SMTP_PASSWORD}`,
    },
  });

  const message = {
    from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_USER}>`,
    to: options.email,
    subject: options.subject,
    // text: options.message,
    html: options.output,
  };

  try {
    await transporter.sendMail(message);
  } catch (err) {
    console.log(err);
  }
};

exports.sendMailgun = async (options) => {
  const auth = {
    auth: {
      api_key: `${process.env.MAILGUN_API_KEY}`,
      domain: `${process.env.MAILGUN_DOMAIN}`,
    },
  };

  // console.log("mailgun");
  const message = {
    from: options.from,
    to: options.email,
    subject: options.subject,
    html: options.output,
  };

  let transporter = nodemailer.createTransport(nodeMailgun(auth));
  try {
    await transporter.sendMail(message);

    // console.log(res);
  } catch (err) {
    console.log("err", err);
  }
};
