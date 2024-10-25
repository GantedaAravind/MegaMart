const addToCartModel = require("../../models/cartProduct");

const countAddToCartProduct = async (req, res) => {
  try {
    const userId = req.userId;

    const count = await addToCartModel.countDocuments({ userId });

    res.json({
      success: true,
      error: false,
      message: "Number of Documents in the Cart",
      data: count,
    });
  } catch (err) {
    res.json({
      error: true,
      success: false,
      message: err.message || err,
    });
  }
};

module.exports = countAddToCartProduct;
