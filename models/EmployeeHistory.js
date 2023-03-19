const mongoose=require('mongoose')
let empHistorySchema=new mongoose.Schema({
    id:String,
    bill_number:Number,
    emp_id:String,
    emp_type:String,
    emp_tr_type:String,
    thop_type:String,
    cutter_id:String,
    no_items:Number,
    amount:Number,
    date:String,

})
module.exports=mongoose.model('EmpHistory',empHistorySchema)


