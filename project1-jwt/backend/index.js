const express=require("express")
const mongoose=require("mongoose")
const app=express()
mongoose.connect('mongodb://localhost/jwtdb');
const userModel=require("./models/user")
const cityModel=require("./models/city")
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const cors=require("cors")
const bcrypt=require('bcrypt')
const jwt =require("jsonwebtoken");
const middleware=require("./util/middleware")
app.use(cors())

app.use("/api/v1/city",middleware)

app.get("/api/v1/city",async (req,res)=>{
    result=await cityModel.find({})
    res.status(200).json({status:"success",citys:result})

})


app.post("/api/v1/login",(req,res)=>{
    try {
        userModel.findOne({username:req.body.username}).then(
            (user)=>{
                if(!user){
                    res.status(500).json({status:"failed"})
                }
                bcrypt.compare(req.body.password,user.password).then(
                    (domatch)=>{
                        if(domatch){
                            const token=jwt.sign({data:user._id},"secret")
                            res.status(200).json({status:"success",token})
                        }
                        else{
                            res.status(422).json({status:"failed",message:"wrong password"})
                        }
                    }
                )
            },
            (err)=>{
                res.status(500).json({status:"failed"})
            }
        )
        
    } catch (error) {
        res.status(500).json({
            status:"failed"
        })
    }
})

app.post("/api/v1/signup",(req,res)=>{
    try {
        bcrypt.hash(req.body.password, 10,async function(err, hash) {
            if(err){
                res.status(500).json({status:"Encryption failed"})
            }
            req.body.password=hash
            userModel.create(req.body).then(
                (respose)=>{
                    res.status(200).json({
                        status:"success"
                    })
                },
                (err)=>{
                    res.status(500).json({
                        status:"failed"
                    })
                }
            )
            
        });

        
        

    } catch (error) {
        res.status(500).json({
            status:"failed"
        })
    }

})



app.listen(3005,()=>{console.log("app started in port 3005")})