const userModel = require("../../models/userModel");

async function allUsers(req,res){
    try{
        const users = await userModel.find({});
        res.send({
            success:true,
            error:false,
            data : users, 
            message: "all Users...😏"
        })
    }
    catch(err){
        res.status(400).json({
            error : true,
            success: false,
            message : err.message || err,
        });
    }
}  

module.exports = allUsers; 