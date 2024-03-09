const express = require("express");
const router = new express.Router();
const multer = require("multer");
const nodemailer = require("nodemailer");

const upload = multer({
  storage: multer.memoryStorage(),
});

// send mail
router.post("/send", upload.single("cv"), (req, res) => {
  const { selectedPosition, emailAddress, phNumber, shiftSystem, fullName } = req.body;

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
      subject: `QM Recruit - New Application From ${fullName}`,
      html: `
      <h3>A new application has been received from QM recruit site.</h3>
      <h4>Information</h4>
      <p>- Name is : ${fullName}</p>
      <p>- EmailAddress is : ${emailAddress}</p>
      <p>- PhoneNumber is : ${phNumber}</p>
      <p>- Position is : ${selectedPosition}</p>
      <p>- ShiftSystem is : ${shiftSystem}</p>
      <p>Please contact the applicant and ask he/she to send his/her resumes(CVs).</p>`,
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
