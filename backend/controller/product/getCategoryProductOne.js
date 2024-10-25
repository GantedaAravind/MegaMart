const productModel = require("../../models/productModel");

const getCategoryProductController = async (req,res)=>{
    try{

        const productCategory = await productModel.distinct("category");
        // console.log(productCategory);

        const productByCategory = [];

        for(const category of productCategory){
            // console.log(category);
            const product = await productModel.findOne({category});

            if(product){
                productByCategory.push(product);

            }
        }
        res.status(200).json({
            message:"categorie Product ...😉",
            data : productByCategory,
            error:false,
            success:true,
        });

    }catch(err){
        res.status(400).json({
            error : true,
            success: false,
            message : err.message || err,
        });
    }


}
module.exports = getCategoryProductController;