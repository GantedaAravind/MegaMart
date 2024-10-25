async function userLogout(req,res){

    try{
        res.clearCookie("token").json({
            message:"Logged Out SuccessFully...😥",
            success:true,
            error:false,
            data:[] 
        })
    }
    catch(err){
        res.json({
            message:err.message||err,
            error:true,
            success:false
        })
    }

}

module.exports =  userLogout;