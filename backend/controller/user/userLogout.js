async function userLogout(req, res) {
  try {
    res.res
      .clearCookie("token", {
        httpOnly: true,
        secure: true, // Set to true if your site uses HTTPS
        sameSite: "none", // Required for cross-site cookies
      })
      .json({
        message: "Logged Out SuccessFully...😥",
        success: true,
        error: false,
        data: [],
      });
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = userLogout;
