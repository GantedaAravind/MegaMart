const addToCartModel = require("../../models/cartProduct");

const updateAddToCartProductController = async (req, res) => {
  try {
    const currentUserId = req.userId;
    const addToCartProductId = req.body._id;
    const qty = req.body.quantity;
    // console.log(req.body);

    const updateProduct = await addToCartModel.updateOne({_id : addToCartProductId}, {
      ...(qty && { quantity: qty }),
    });

    // const newAddToCart = new addToCartModel(payload);
    // const saveProduct = await newAddToCart.save();

    res.json({
      message: "Upadted Successfully... 😀",
      data: updateProduct,
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(400).json({
      error: true,
      success: false,
      message: err.message || err,
    });
  }
};

module.exports = updateAddToCartProductController;
