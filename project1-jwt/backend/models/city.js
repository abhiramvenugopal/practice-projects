const mongoose=require("mongoose")
const Schema=mongoose.Schema

const citySchema= new Schema({
    id:{type:String,required:true,unique:true},
    name:{type :String, required:true},
    state:{type :String, required:true}
})

const cityModel=mongoose.model("citys",citySchema)

module.exports=cityModel


    