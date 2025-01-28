const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
require("dotenv").config();
const cors = require("cors");

const app = express(); // appを定義

app.use(cors()); // 定義後にcorsを使用
app.use(bodyParser.json());

app.post("/send-email", (req, res) => {
  const { email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"お問い合わせ" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    subject: "お問い合わせ",
    text: `送信者: ${email}\n\nメッセージ:\n${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      return res.status(500).send("送信に失敗しました");
    }
    res.status(200).send("送信が成功しました");
  });
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
