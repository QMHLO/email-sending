const express = require("express");
const router = new express.Router();
const multer = require("multer");
const nodemailer = require("nodemailer");

const upload = multer({
  storage: multer.memoryStorage(),
});

// send mail
router.post("/register", upload.single("myfile"), (req, res) => {
  const { selectedPosition, emailAddress, fullName } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: emailAddress,
      to: process.env.EMAIL,
      subject: `New Message From ${fullName}`,
      html: `
      <p>Name is : ${fullName}</p>
      <p>EmailAddress is : ${emailAddress}</p>
      <p>Position is : ${selectedPosition}</p>`,
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
