const express = require("express");
const router = new express.Router();
const multer = require("multer");
const nodemailer = require("nodemailer");

const upload = multer({
  storage: multer.memoryStorage(),
});

// send mail
router.post("/register", upload.single("myfile"), (req, res) => {
  const { email, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: email,
      to: process.env.EMAIL,
      subject: "Sending Email With React And Nodejs",
      html: `<p>Email is : ${email}</p>
      <p>Message is : ${message}</p>`,
      attachments: [
        {
          filename: req.file.originalname,
          content: req.file.buffer,
        },
      ],
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error" + error);
      } else {
        console.log("Email sent:" + info.response);
        res.status(201).json({ status: 201, info });
      }
    });
  } catch (error) {
    console.log("Error" + error);
    res.status(401).json({ status: 401, error });
  }
});

module.exports = router;
