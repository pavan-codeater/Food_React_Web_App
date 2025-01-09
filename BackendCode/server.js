import express from "express";
import bcrypt from "bcrypt";
import cors from "cors";
import nodemailer from "nodemailer";

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
      pass: "poxz chas oeqk yvno", // Replace with your email password or app password
    },
  });

  const mailOptions = {
    from: "pavanlsuse@gmail.com",
    to: email,
    subject: "Your OTP Code",
    text: `Hi This is from Tomato and Your OTP code is ${otp}`,
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
