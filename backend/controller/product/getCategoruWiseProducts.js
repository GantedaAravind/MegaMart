const productModel = require("../../models/productModel");

const getCategoryWiseProductsController = async (req,res)=>{

    try{
        const {category} = req?.body || req?.query;
        const product = await productModel.find({category });
        res.json({
            success:true,
            error:false,
            message : `${category} products...🤗`,
            data : product
        })
    }catch(err){
        res.status(400).json({
            error : true,
            success: false,
            message : err.message || err,
        });
    }

}
module.exports = getCategoryWiseProductsController;