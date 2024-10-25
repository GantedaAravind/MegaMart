const productModel = require("../../models/productModel");

const searchProduct = async (req, res) => {
  try {
    const query = req.query.q;

    // Create case-insensitive and global regular expression
    const regex = new RegExp(query, "i", "g"); // 'i' flag for case-insensitive search

    const products = await productModel.find({
      $or: [
        {
          productName: regex,
        },
        {
          category: regex,
        },
      ],
    });

    res.json({
      success: true,
      error: false,
      data: products,
      message: "Results of search...🤪",
    });
  } catch (err) {
    res.status(400).json({
      error: true,
      success: false,
      message: err.message || err,
    });
  }
};

module.exports = searchProduct;
