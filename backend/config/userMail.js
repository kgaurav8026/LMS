import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const USER_EMAIL = process.env.USER_EMAIL; // Your sender email
const USER_PASSWORD = process.env.USER_PASSWORD; // Your app password

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: USER_EMAIL,
    pass: USER_PASSWORD,
  },
});

const sendOtpEmail = async (toEmail, otp) => {
  const mailOptions = {
    from: USER_EMAIL,
    to: toEmail,
    subject: "Your OTP for Password Reset",
    text: `Your OTP for password reset is: ${otp}. It is valid for 10 minutes. Do not share it with anyone.`,
    html: `<p>Your OTP for password reset is: <strong>${otp}</strong>. It is valid for 10 minutes. Do not share it with anyone.</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`OTP email sent to ${toEmail}`);
    return { success: true, message: "OTP sent successfully" };
  } catch (error) {
    console.error("Error sending OTP email:", error);
    return { success: false, message: "Failed to send OTP email" };
  }
};

export default sendOtpEmail;
