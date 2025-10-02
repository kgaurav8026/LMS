import bcrypt from "bcryptjs";
import validator from "validator";
import User from "../model/userModel.js";
import { generateToken } from "../config/token.js";
import sendOtpEmail from "../config/userMail.js";

export const signUp = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword, role });
    await newUser.save(); // ✅ Persist user in DB

    const token = generateToken(newUser._id);

    res.cookie("token", token, {
      // ✅ Use res.cookie
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      message: "User created successfully",
      user: { name: newUser.name, email: newUser.email, role: newUser.role },
      token,
    });
  } catch (error) {
    console.error("Signup error:", error); // 👈 Log for debugging
    res.status(500).json({ message: "Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let existUser = await User.findOne({ email });
    if (!existUser) {
      return res.status(400).json({ message: "User does not exist" });
    }
    let isPasswordMatch = await bcrypt.compare(password, existUser.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    let token = generateToken(existUser._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      message: "Login successful",
      user: {
        name: existUser.name,
        email: existUser.email,
        role: existUser.role,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
export const logout = (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: "Logout Server Error" });
  }
};

export const sendOtp = async (req, res) => {
  // Implementation for sending OTP
  try {
    const { email } = req.body;
    const existUser = await User.findOne({ email });
    if (!existUser) {
      return res.status(400).json({ message: "User does not exist" });
    }
    // Generate OTP and send email logic here
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
    existUser.resetOtp = otp;
    existUser.otpExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes expiry
    existUser.isOtpVerified = false;
    await existUser.save();

    // Send OTP email
    await sendOtpEmail(email, otp);
    return res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    res.status(500).json({ message: "Send OTP Server Error" });
  }
};

export const verifyOtp = async (req, res) => {
  // Implementation for verifying OTP
  try {
    const { email, otp } = req.body;
    const existUser = await User.findOne({ email });
    if (!existUser) {
      return res.status(400).json({ message: "User does not exist" });
    }
    if (
      existUser.resetOtp !== otp ||
      !existUser.otpExpiry ||
      existUser.otpExpiry < Date.now()
    ) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }
    existUser.isOtpVerified = true;
    existUser.resetOtp = "";
    existUser.otpExpiry = null;
    await existUser.save();
    return res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    res.status(500).json({ message: "Verify OTP Server Error" });
  }
};

export const resetPassword = async (req, res) => {
  // Implementation for resetting password
  try {
    const { email, newPassword } = req.body;
    const existUser = await User.findOne({ email });
    if (!existUser) {
      return res.status(400).json({ message: "User does not exist" });
    }
    if (!existUser.isOtpVerified) {
      return res.status(400).json({ message: "OTP not verified" });
    }
    if (newPassword.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    existUser.password = hashedPassword;
    existUser.isOtpVerified = false; // Reset OTP verification status
    await existUser.save();
    return res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    res.status(500).json({ message: "Reset Password Server Error" });
  }
};

export const googleAuth = async (req, res) => {
  try {
    const { name, email, role } = req.body;
    let existUser = await User.findOne({ email });
    if (!existUser) {
      const newUser = new User({ name, email, role });
      await newUser.save();
      existUser = newUser;
    }
    const token = generateToken(existUser._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      message: "Google authentication successful",
      user: {
        name: existUser.name,
        email: existUser.email,
        role: existUser.role,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Google Auth Server Error" });
  }
};
