const { json } = require("express")
const Employee = require("../models/Employee")
const EmployeeHistory=require('../models/EmployeeHistory')




exports.getApiEmployee=async(req,res)=>{
    let {emp_id,thop_type}=req.body
    let employee=await Employee.findOne({emp_id:emp_id})
    let thop
    employee.thop_types.forEach((x)=>{
        if(x.t_name==thop_type){
            thop=x
        }})
    res.json({thop})
}

exports.selectEmployee=async(req,res)=>{
    let emp_id=req.body.emp_id
    let employee=await Employee.findOne({emp_id:emp_id})
    res.json({employee})
}

exports.addBill=async(req,res)=>{
    let data=req.body
    items=JSON.parse(data.items);
    items.forEach(async(x)=>{
        await EmployeeHistory.create({id:Date.now(),
            bill_number:data.bill_number,
            emp_id:data.emp_id,
            emp_tr_type:'add',
            emp_type:'manufacturer',
            cutter_id:x.cutter,
            amount:+x.total,
            date:x.date,
            thop_type:x.thopType,
            no_items:x.qty
    })
    await EmployeeHistory.create({
        id:Date.now(),
        emp_id:x.cutter,
        bill_number:data.bill_number,
        emp_tr_type:'add',
        emp_type:'cutters',
        amount:+x.total,
        date:x.date,
        thop_type:x.thopType,
        no_items:x.qty
    })

    })
    res.json({success:'success'})

}
exports.getSalesEmployee=async(req,res)=>{
    let data=await Employee.find({emp_type:'salesman'})
    res.json({data})
 
}
