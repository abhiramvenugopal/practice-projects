
const jwt =require("jsonwebtoken");

const userModel=require("../models/user")

function middleware(req,res,next){
    console.log("middleware")
    let token=req.headers.authorization?.split("bearer ")[1]
    console.log("token ",token)
    if(!token){
        res.status(401).json({
            status:"failed",
            message:"Not Authenticated",
        })
        return;
    }
    jwt.verify(token,"secret",async function(err, decoded) {
        if(err){
            res.status(401).json({
                status:"failed",
                message:"Not Authenticated",
            })
            return;
        }
        if(decoded){
            const user=await userModel.findOne({_id:decoded.data})
            if(user){
                req.user=user._id
                next()
            }
            else{
                res.status(401).json({
                    status:"failed",
                    message: "Invalid Token"
                })
            }
        }
        
      });   

}
module.exports=middleware