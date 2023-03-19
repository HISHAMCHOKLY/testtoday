const mongoose=require('mongoose')
let salesHistorySchema=new mongoose.Schema({
    id:String,
    branch:String,
    date:String,
    bankAmount:Number,
    CashAmount:Number,
    total:Number

})
module.exports=mongoose.model('SalesHistory',salesHistorySchema)