const productModel = require("../../models/productModel");


const getProductDetailsController = async (req,res)=>{

    try{
        const {productId} = req.body;
        const product = await productModel.findById(productId);
        res.json({
            message : "Product details...😍",
            data : product,
            success : true,
            error : false
        });
    }
    catch(err){
        res.status(400).json({
            error : true,
            success: false,
            message : err.message || err,
        });
    }


}

module.exports = getProductDetailsController;