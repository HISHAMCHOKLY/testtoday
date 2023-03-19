const mongoose=require('mongoose')
let vendorSchema=new mongoose.Schema({
    id:String,
    v_id:{type:Number,unique:true},
    v_company:String,
    v_mob:String,


})
module.exports=mongoose.model('Vendor',vendorSchema)