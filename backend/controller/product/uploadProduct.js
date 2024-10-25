const uploadProductPermission = require("../../helper/permission");
const productModel = require("../../models/productModel");

const uploadProductController = async (req, res) => {
  try {

    const sessionUserId = req.userId;

    if(!uploadProductPermission(sessionUserId)){
        throw new Error("Permission Denied...😒");
    }

    const UploadProduct = new productModel(req.body);
    const saveProduct = await UploadProduct.save();

    res.status(201).json({
      message: "Product Uploaded Successfully...🤩",
      success: true,
      error: false,
      data: saveProduct,
    });

    //productModel
  } catch (err) {
    res.status(400).json({
      error: true,
      success: false,
      message: err.message || err,
    });
  }
};

module.exports = uploadProductController;
