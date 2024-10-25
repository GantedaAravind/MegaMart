const addToCartModel = require("../../models/cartProduct");

const addToCartViewController = async (req, res) => {
  try {
    const userId = req.userId;

    const allProduct = await addToCartModel.find({ userId }).populate("productId")
    res.json({
      message: "all Prodcuts in Your cart...😏",
      success: true,
      error: false,
      data: allProduct,
    });
  } catch (err) {
    res.status(400).json({
      error: true,
      success: false,
      message: err.message || err,
    });
  }
};
module.exports = addToCartViewController;
