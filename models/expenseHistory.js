const mongoose=require('mongoose')
let expenseHistorySchema=new mongoose.Schema({
    id:String,
    branch:String,
    date:String,
    dis:String,
    amount:Number

})
module.exports=mongoose.model('expenseHistory',expenseHistorySchema)