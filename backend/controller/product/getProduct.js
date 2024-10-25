const productModel = require("../../models/productModel");

const getProductController = async (req,res)=>{

    try{
        const allProducts = await productModel.find({}).sort({createdAt : -1});
        // console.log(allProducts);
        res.json({
            success:true,
            error:false,
            message: "Successfully retrevied the All Products from DataBase...😉",
            data : allProducts
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

module.exports = getProductController;