// import userModel from "../models/userModel";

const userModel = require("../../models/userModel");

async function userDetailsController(req,res){

    try{
        const user = await userModel.findOne({_id : req.userId});
        res.status(200).json({
            success:true,
            error:false,
            message:"User Details....🤗",
            data : user
        });
    }catch(err){
        res.status(400).json({
            error : true,
            success: false,
            message : err.message || err
        });
    }

}

module.exports = userDetailsController; 