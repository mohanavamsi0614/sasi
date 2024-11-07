const mongoose=require("mongoose")
const schema=  monog.Schema({
    time:[String],
    id:String,
    email:String
})
const model= mongoose.model("finger",schema)
module.exports=model