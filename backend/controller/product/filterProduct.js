const productModel = require("../../models/productModel");

const filterProductController = async (req, res) => {
  try {


    const categoryList = req?.body?.categoryList || [];

  
    const allProducts = await productModel.find({
      category: {
        "$in": categoryList,
      },
    });



    res.json({
      success: true,
      error: false,
      message: `Filtered products...🤗`,
      data: allProducts,
    });
  } catch (err) {
    res.status(400).json({
      error: true,
      success: false,
      message: err.message || err,
    });
  }
};
module.exports = filterProductController;
