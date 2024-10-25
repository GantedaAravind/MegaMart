async function userLogout(req, res) {
  try {
    res.clearCookie(COOKIE_NAME, {
      path: "/",
      httpOnly: true,
      sameSite: "none",
      signed: true,
      secure: true, // Set to true only in production
    }).json({
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
