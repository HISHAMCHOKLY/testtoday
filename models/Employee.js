const mongoose=require('mongoose')
let employeeSchema=new mongoose.Schema({
    id:String,
    emp_id:Number,
    emp_name:String,
    emp_dob:String,
    emp_mob:String,
    emp_type:String,
    emp_passport:String,
    emp_passport_vf:String,
    emp_passport_vt:String,
    emp_iqama:String,
    emp_iqama_vf:String,
    emp_iqama_vt:String,
    thop_types:{type:Array,default:[{t_name:'big_collar',name:'Big-Collar',price:0},{t_name:'small_collar',name:'Small-Collar',price:0},{t_name:'big_neck',name:'Big-Neck',price:0},{t_name:'small_neck',name:'Small-Neck',price:0},{t_name:'emarathi',name:'Emarathi',price:0}]},
    emp_salary:Number

})
module.exports=mongoose.model('Employee',employeeSchema)