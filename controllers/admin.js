const Employee=require('../models/Employee')
const EmployeeHistory=require('../models/EmployeeHistory')
const expenseHistory = require('../models/expenseHistory')
const PurchaseHistory = require('../models/PurchaseHistory')
const salesHistory = require('../models/salesHistory')
const Vendor = require('../models/Vendor')


exports.adminHome=(req,res)=>{
    res.render('admin/adminHome')
}

exports.adminEmployees=async(req,res)=>{
    let data=await Employee.find()
    res.render('admin/adminEmployees',{data})

}
exports.adminVendors=async(req,res)=>{
    let data=await Vendor.find()
    res.render('admin/adminVendors',{data})

}
exports.adminDeleteEmployee=async(req,res)=>{
    let emp_id=req.params.emp_id
    await Employee.deleteOne({emp_id:emp_id})
    await EmployeeHistory.deleteMany({emp_id:emp_id})   
    res.redirect('/admin/employees')
    
}
exports.adminDeleteVendors=async(req,res)=>{
    let v_id=req.params.v_id
    await Vendor.deleteOne({v_id:v_id})
    await PurchaseHistory.deleteMany({v_id:v_id})   
    res.redirect('/admin/vendors')
    
}
exports.adminEmpHistory=async(req,res)=>{
    let data=await EmployeeHistory.find()   
    data.reverse()
    res.render('admin/adminEmpHistory',{data})
}


exports.adminVendorsHistory=async(req,res)=>{
    let data=await PurchaseHistory.find()   
    data.reverse()
    res.render('admin/adminVendorHistory',{data})
}

exports.adminSalesHistory=async(req,res)=>{
    let data=await salesHistory.find()   
    data.reverse()
    res.render('admin/adminSalesHistory',{data})
}

exports.adminExpenseHistory=async(req,res)=>{
    let data=await expenseHistory.find()   
    data.reverse()
    res.render('admin/adminExpenseHistory',{data})
}

exports.adminEmpHistoryDelete=async(req,res)=>{
    let id=req.params.id
    await EmployeeHistory.deleteOne({id:id})   
    res.redirect('/admin/employees/history')
}

exports.adminPurchaseHistoryDelete=async(req,res)=>{
    let id=req.params.id
    await PurchaseHistory.deleteOne({id:id})   
    res.redirect('/admin/vendors/history')
}

exports.adminExpenseHistoryDelete=async(req,res)=>{
    let id=req.params.id
    await expenseHistory.deleteOne({id:id})   
    res.redirect('/admin/expense/history')
}

exports.adminSalesHistoryDelete=async(req,res)=>{
    let id=req.params.id
    await salesHistory.deleteOne({id:id})   
    res.redirect('/admin/sales/history')
}