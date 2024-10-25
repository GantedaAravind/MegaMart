const uploadProductPermission = require("../../helper/permission");
const productModel = require("../../models/productModel");

async function updateProductController(req, res) {
  try {
    if (!uploadProductPermission(req.userId)) {
      throw new Error("Permission Denied...😒");
    }
    const { _id, ...restBody } = req.body;
    const updateProduct = await productModel.findByIdAndUpdate(_id, restBody);

    res.json({
      success: true,
      error: false,
      message: "Product Updated SuccessFully...🥰",
      data: updateProduct,
    });
  } catch (err) {
    res.status(400).json({
      error: true,
      success: false,
      message: err.message || err,
    });
  }
}

module.exports = updateProductController;
