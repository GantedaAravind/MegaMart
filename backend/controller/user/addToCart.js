const addToCartModel = require("../../models/cartProduct");

const addToCartController = async (req, res) => {
  try {
    const { productId } = req.body;
    const currentUserId = req.userId;

    // console.log(req.body);

    const isProductAvailable = await addToCartModel.find({ productId:productId });
    // console.log(isProductAvailable);
    if (isProductAvailable.length !== 0) {
      return res.json({
        message: "already Exiseted in Your Cart...😕",
        success: false,
        error: true,
      });
    }

    const payload = {
      productId:productId,
      quantity: 1,
      userId: currentUserId,
    };

    const newAddToCart = new addToCartModel(payload);
    const saveProduct = await newAddToCart.save();

    res.json({
      message: "Product Added to Cart Successfully 😀",
      data: saveProduct,
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

module.exports = addToCartController;
