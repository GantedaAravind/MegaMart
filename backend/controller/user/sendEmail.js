const nodemailer = require("nodemailer");
const userModel = require("../../models/userModel");

async function sendEmail(req, res) {
  try {
    const { userEmail } = req.body;

    // Validate userId in the request body
    if (!userEmail) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "User Email is required",
      });
    }

    // Generate a verification code
    const verificationCode = Math.floor(100000 + Math.random() * 900000); // 6-digit code

    // Create a transporter for sending email
    const transporter = nodemailer.createTransport({
      service: "gmail", // You can use your email service (Gmail, Outlook, etc.)
      auth: {
        user: process.env.EMAIL, // Your email address
        pass: process.env.EMAIL_PASSWORD, // Your email password or app password
      },
    });

    // Set up email data
    const mailOptions = {
      from: process.env.EMAIL, // Sender address
      to: userEmail, // User's email address
      subject: "Verify Your Account - MegaMart", // Subject line
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; background-color: #f0fbfc; border-radius: 12px; box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);">
          <div style="text-align: center; padding: 20px; background-color: #00796b; color: white; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0; font-size: 26px;">Welcome to MegaMart!</h1>
            <p style="margin: 5px 0; font-size: 16px;">Your one-stop shop for all your needs</p>
          </div>
          <div style="padding: 20px; background-color: white; border-radius: 0 0 10px 10px;">
            <p style="font-size: 18px; color: #333;">Hello,</p>
            <p style="font-size: 16px; color: #333;">
              Thank you for choosing <strong>MegaMart</strong>! To complete your registration, please verify your account by entering the code below:
            </p>
            <div style="text-align: center; margin: 20px 0;">
              <p style="display: inline-block; font-size: 32px; font-weight: bold; color: #00796b; background-color: #e0f7f9; border-radius: 10px; padding: 15px 30px; border: 2px solid #00796b;">
                ${verificationCode}
              </p>
            </div>
            <p style="font-size: 16px; color: #333;">
              This code is valid for <strong>15 minutes</strong>. If you didn’t request this code, please ignore this email or reach out to our support team.
            </p>
            <p style="font-size: 16px; color: #333; margin-top: 20px;">
              We’re excited to have you with us. Happy shopping!
            </p>
            <div style="margin-top: 30px; text-align: center; color: #777; font-size: 12px;">
              <p>&copy; ${new Date().getFullYear()} MegaMart. All rights reserved.</p>
              <p>Contact us: support@megamart.com | (123) 456-7890</p>
              <p>123 MegaMart Ave, Cityville, ST, 12345</p>
            </div>
          </div>
        </div>
      `,
    };
        
    

    // Send email and handle errors if any
    try {
      await transporter.sendMail(mailOptions);
      res.json({
        success: true,
        error: false,
        verificationCode: verificationCode,
        message: "Verification email sent successfully 😁",
      });
    } catch (emailError) {
      res.status(500).json({
        error: true,
        success: false,
        message: "Failed to send verification email",
      });
    }
  } catch (err) {
    res.status(400).json({
      error: true,
      success: false,
      message: err.message || err,
    });
  }
}

module.exports = sendEmail;
