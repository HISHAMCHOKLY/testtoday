const Employee = require("../models/Employee")
const EmployeeHistory = require("../models/EmployeeHistory")

exports.getPayrollPage=(req,res)=>{
    res.render('payroll')
}

exports.getAddBill=async(req,res)=>{
    let employees=await Employee.find({emp_type:'manufacturer'})
    let cutters= await Employee.find({emp_type:'cutters'})
    res.render('addBill',{employees,cutters})
    
}
exports.getAddBillHistory=async(req,res)=>{
    let data=await EmployeeHistory.find({emp_tr_type:'add',cutter_id:{$ne: undefined}})
    data.reverse()
    let title='Bill'
    res.render('addBillHistory',{data,title})

}

exports.getAddSalary=async(req,res)=>{
    let data=await Employee.find({emp_type:'salesman'})
    res.render('addSalary',{data})

}

exports.addSalesSalary=async(req,res)=>{
    let {bill_number,emp_id,add_date,add_amout}=req.body
    await EmployeeHistory.create({id:Date.now(),bill_number:bill_number,emp_id:emp_id,emp_tr_type:'add',emp_type:'salesman',date:add_date,amount:+add_amout})
    res.redirect('/payroll/addSalary')

}

exports.salaryHistory=async(req,res)=>{
    let data=await EmployeeHistory.find({emp_type:'salesman'})
    let title='Salary'
    data.reverse()
    res.render('addBillHistory',{data,title})
}
exports.getAddTtrs=async(req,res)=>{
    let data=await Employee.find({emp_type:'ttrs'})
    res.render('addttrs',{data})
}
exports.AddTtrs=async(req,res)=>{
    let {bill_number,emp_id,add_date,rate,count,total}=req.body
    await EmployeeHistory.create({id:Date.now(),emp_id:emp_id,bill_number:bill_number,emp_tr_type:'add',emp_type:'ttrs',date:add_date,no_items:count,amount:total})
    res.redirect('/payroll')
}

exports.ttrsHistory=async(req,res)=>{
    let data=await EmployeeHistory.find({emp_type:'ttrs'})
    let title='TTRS'
    data.reverse()
    res.render('addBillHistory',{data,title})
}

exports.getBillReport=async (req,res)=>{
    let employees= await Employee.find()
    let data=[]
    let start,end,nitem,tamount=''
    res.render('billReportPage',{employees,data,start,end,nitem,tamount})

}

exports.BillReport=async (req,res)=>{
    let employees= await Employee.find()
    let {emp_id,start,end}=req.body
    let data= await EmployeeHistory.find({emp_id:emp_id,date: {
        $gte: start, 
        $lte: end
    }})
    let nitem=0
    let tamount=0
    data.forEach((x)=>{
        nitem+=x.no_items
        tamount+=x.amount
    })
    res.render('billReportPage',{employees,data,start,end,nitem,tamount})
}

