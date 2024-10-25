const userModel = require("../../models/userModel");

async function verifyCode(req, res) {
    try {
        const { userId, verificationCode } = req.body;

        // Validate input
        if (!userId || !verificationCode) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "User ID and verification code are required",
            });
        }

        // Find the user in the database
        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                error: true,
                message: "User not found",
            });
        }

        // Check if the verification code matches
        if (user.verificationCode !== verificationCode) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "Invalid verification code",
            });
        }

        // Check if the verification code has expired
        const currentTime = new Date();
        if (currentTime > user.verificationCodeExpires) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "Verification code has expired",
            });
        }

        // If verification is successful, respond accordingly
        res.json({
            success: true,
            error: false,
            message: "Verification successful",
        });

        // Optionally, clear the verification code and expiration after successful verification
        user.verificationCode = undefined;
        user.verificationCodeExpires = undefined;
        await user.save();
        
    } catch (err) {
        res.status(500).json({
            error: true,
            success: false,
            message: err.message || "An error occurred",
        });
    }
}

module.exports = verifyCode;
