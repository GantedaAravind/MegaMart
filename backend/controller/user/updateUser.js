const userModel = require("../../models/userModel");

async function updateUserRole(req,res){

    try{
        const sessonUser = req.userId;

        const {userId,email,name,role} = req.body;
        const payload = {
            ...(email && {email : email}),
            ...(name && {name : name}),
            ...(role && {role : role}),
        } 

        const user = await userModel.findById(sessonUser);

        const updateUser = await userModel.findByIdAndUpdate(userId,payload);
        // console.log(req.body);


        res.json({
            success : true,
            error: false,
            data : updateUser,
            message : "Updated Successfully...😁"
        })
    }
    catch(err){
        res.status(400).json({
            error : true,
            success: false,
            message : err.message || err
        });
    }
}

module.exports = updateUserRole;