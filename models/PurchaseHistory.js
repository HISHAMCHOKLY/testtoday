const mongoose=require('mongoose')
let purchaseHistorySchema=new mongoose.Schema({
    id:String,
    v_id:Number,
    v_com:String,
    billNumber:Number,
    type:String,
    date:String,
    tot_amount:Number,
    p_amount:Number

})
module.exports=mongoose.model('PurchaseHistory',purchaseHistorySchema)