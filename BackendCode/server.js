import express from "express";
import bcrypt from "bcrypt";
import cors from "cors";
import nodemailer from "nodemailer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());
const PORT = 3000;

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

app.post("/api/otp", async (req, res) => {
  const { email } = req.body;
  console.log("email in backend ", email);

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  const otp = generateOTP();

  // Nodemailer configuration
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "pavanlsuse@gmail.com", // Replace with your email
      pass: "qcfq elyy luyu fqr", // Replace with your email password or app password
    },
  });

  const mailOptions = {
    from: '"Zomato" pavanlsuse@gmail.com',
    to: email,
    subject: "Your OTP Code for food Delivery",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2 style="color: #ff6347;">Hello</h2>
        <h1 style="color: #555;">This is from <strong>Zomato</strong>.</h1>
        <p style="color: #333;">Your OTP code is:</p>
        <div style="font-size: 24px; font-weight: bold; color: #4CAF50;">${otp}</div>
        <p>Use this code to verify your email address. This OTP is valid for 10 minutes.</p>
        <br>
        <img src="cid:logo" alt="Tomato Logo" style="width: 150px; display: block; margin: 0 auto;" />
        <br>
        <p style="font-size: 14px; color: #999;">If you did not request this code, please ignore this email.</p>
      </div>
    `,
    attachments: [
      {
        filename: "zomato.png",
        path: path.join(__dirname, "../src/zomato.png"),
        cid: "logo", // Same as in the img src above
      },
    ],
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "OTP sent successfully", otp });
  } catch (error) {
    res.status(500).json({ message: "Error sending email", error });
  }
});

app.listen(PORT, () => {
  console.log(`Port listening in ${PORT}`);
});
