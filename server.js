const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const errorMiddleware = require("./middleware/errors");
require("dotenv").config({
  path: "./config/config.env",
});

// instantiate an express app
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors());

// let allowCrossDomain = function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
//   res.header("Access-Control-Allow-Headers", "Content-Type");

//   next();
// };

// app.use(allowCrossDomain);
// const router = express.Router;
app.use("/api", require("./routes/api/rahaah"));
app.use("/api", require("./routes/api/portfolio"));
app.use("/api", require("./routes/api/impero"));

app.get("/", (req, res) => {
  res.json({ message: "home" });
});

app.post("/hello", (req, res) => {
  res.json({ message: "working" });
});

app.get("/hello", (req, res) => {
  res.json({ message: "hello" });
});

app.post("/portfolio1", async (req, res) => {
  const { name, email, message } = req.body;

  const output = `
    <h2>Hello Emmanuel</h2>
    <p>You have a new mail from your Portfolio</p>
    <h3>Contact Details</h3>
    <ul>
      <li style="margin-bottom: 10px;">Name: ${name}</li>
      <li style="margin-bottom: 10px;">Email: ${email}</li>
      <li style="margin-bottom: 10px;">Message: ${message}</li>
    </ul>
  `;

  let transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false,
    auth: {
      user: `${process.env.AUTHEMAIL}`,
      pass: `${process.env.AUTHPASSWORD}`,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  let mailOptions = {
    from: `"My Portfolio" <${process.env.AUTHEMAIL}>`,
    to: `${process.env.EMAIL1}`,
    subject: "New Mail",
    text: "Hello world?",
    html: output,
  };

  try {
    await transporter.sendMail(mailOptions);
    // await transporter.sendMail(mailOptions), (error, info) => {
    // if (error) {
    //   return res.json(error);
    res.json({ success: true, message: "Email has been sent" });
  } catch (error) {
    res.json(error);
  }

  // console.log("Message sent: ", info.messageId);
  // console.log("Preview URL: ", nodemailer.getTextMessageUrl(info));
  // });
});

app.post("/contact", (req, res) => {
  const { name, email, phone, message } = req.body;

  if (phone) {
    const output = `
    <p>You have a new mail from ImperoTechne contact form</p>
    <h3>Contact Details</h3>
    <ul>
      <li style="margin-bottom: 10px;">Name: ${name}</li>
      <li style="margin-bottom: 10px;">Email: ${email}</li>
      <li style="margin-bottom: 10px;">Phone: ${phone}</li>
      <li style="margin-bottom: 10px;">Message: ${message}</li>
    </ul>
  `;

    let transporter = nodemailer.createTransport({
      host: "smtp-mail.outlook.com",
      port: 587,
      secure: false,
      auth: {
        user: `${process.env.AUTHEMAIL}`,
        pass: `${process.env.AUTHPASSWORD}`,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    let mailOptions = {
      from: `"ImperoTechne Contact Form" <${process.env.AUTHEMAIL}>`,
      to: `${process.env.COMPANYEMAIL}`,
      subject: "New Mail",
      text: "Hello world?",
      html: output,
    };

    try {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.json(error);
        }

        console.log("Message sent: ", info.messageId);
        console.log("Preview URL: ", nodemailer.getTextMessageUrl(info));
      });
      res.json({ message: "Email has been sent" });
    } catch (error) {
      res.json(error);
    }
  } else {
    const output = `
    <p>You have a new mail from ImperoTechne Get Quote Form</p>
    <h3>Contact Details</h3>
    <ul>
      <li style="margin-bottom: 10px;">Name: ${name}</li>
      <li style="margin-bottom: 10px;">Email: ${email}</li>
      <li style="margin-bottom: 10px;">Message: ${message}</li>
    </ul>
  `;

    let transporter = nodemailer.createTransport({
      host: "smtp-mail.outlook.com",
      port: 587,
      secure: false,
      auth: {
        user: `${process.env.AUTHEMAIL}`,
        pass: `${process.env.AUTHPASSWORD}`,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    let mailOptions = {
      from: `"ImperoTechne Get Quote Form" <${process.env.AUTHEMAIL}>`,
      to: `${process.env.EMAIL2}, ${process.env.EMAIL1}`,
      subject: "New Mail",
      text: "Hello world?",
      html: output,
    };

    try {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.json(error);
        }

        console.log("Message sent: ", info.messageId);
        console.log("Preview URL: ", nodemailer.getTextMessageUrl(info));
      });
      res.json({ message: "Email has been sent" });
    } catch (error) {
      res.json(error);
    }
  }
});

app.post("/contactForm", (req, res) => {
  const { name, companyName, email, phoneNumber, message } = req.body;

  if (phone) {
    const output = `
    <p>You have a new mail from ImperoTechne contact form</p>
    <h3>Contact Details</h3>
    <ul>
      <li style="margin-bottom: 10px;">Name: ${name}</li>
      <li style="margin-bottom: 10px;">Company Name: ${companyName}</li>
      <li style="margin-bottom: 10px;">Email: ${email}</li>
      <li style="margin-bottom: 10px;">Phone Number: ${phoneNumber}</li>
      <li style="margin-bottom: 10px;">Message: ${message}</li>
    </ul>
  `;

    let transporter = nodemailer.createTransport({
      host: "smtp-mail.outlook.com",
      port: 587,
      secure: false,
      auth: {
        user: `${process.env.AUTHEMAIL}`,
        pass: `${process.env.AUTHPASSWORD}`,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    let mailOptions = {
      from: `"ImperoTechne Contact Form" <${process.env.AUTHEMAIL}>`,
      to: `${process.env.COMPANYEMAIL}`,
      subject: "New Mail",
      text: "Hello world?",
      html: output,
    };

    try {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.json(error);
        }

        console.log("Message sent: ", info.messageId);
        console.log("Preview URL: ", nodemailer.getTextMessageUrl(info));
      });
      res.json({ message: "Email has been sent" });
    } catch (error) {
      res.json(error);
    }
  } else {
    const output = `
    <p>You have a new mail from ImperoTechne Get Quote Form</p>
    <h3>Contact Details</h3>
    <ul>
      <li style="margin-bottom: 10px;">Name: ${name}</li>
      <li style="margin-bottom: 10px;">Email: ${email}</li>
      <li style="margin-bottom: 10px;">Message: ${message}</li>
    </ul>
  `;

    let transporter = nodemailer.createTransport({
      host: "smtp-mail.outlook.com",
      port: 587,
      secure: false,
      auth: {
        user: `${process.env.AUTHEMAIL}`,
        pass: `${process.env.AUTHPASSWORD}`,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    let mailOptions = {
      from: `"ImperoTechne Get Quote Form" <${process.env.AUTHEMAIL}>`,
      to: `${process.env.EMAIL2}, ${process.env.EMAIL1}`,
      subject: "New Mail",
      text: "Hello world?",
      html: output,
    };

    try {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.json(error);
        }

        console.log("Message sent: ", info.messageId);
        console.log("Preview URL: ", nodemailer.getTextMessageUrl(info));
      });
      res.json({ message: "Email has been sent" });
    } catch (error) {
      res.json(error);
    }
  }
});

app.post("/portfolio", async (req, res) => {
  const { name, email, message } = req.body;

  const output = `
    <h2>Hello Emmanuel</h2>
    <p>You have a new mail from your Portfolio</p>
    <h3>Contact Details</h3>
    <ul>
      <li style="margin-bottom: 10px;">Name: ${name}</li>
      <li style="margin-bottom: 10px;">Email: ${email}</li>
      <li style="margin-bottom: 10px;">Message: ${message}</li>
    </ul>
  `;

  let transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false,
    auth: {
      user: `${process.env.AUTHEMAIL2}`,
      pass: `${process.env.AUTHPASSWORD2}`,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  let mailOptions = {
    from: `"My Portfolio" <${process.env.AUTHEMAIL2}>`,
    to: `${process.env.EMAIL4}`,
    subject: "New Mail from Portfolio",
    text: "Hello world?",
    html: output,
  };

  console.log("ll");
  // try {
  await transporter.sendMail(mailOptions);
  // if (error) {
  //   return res.json(error);
  // }
  // console.log("Message sent: ", info.messageId);
  // console.log("Preview URL: ", nodemailer.getTextMessageUrl(info));
  // });
  res.json({ message: "Email has been sent" });
  // } catch (error) {
  //   res.json(error);
  // }
});

// Middleware to handle errors
app.use(errorMiddleware);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server started at post ${process.env.PORT}`);
});
