const express = require('express')
const { getPayrollPage, getAddBill, getAddBillHistory, addSalesSalary, getAddSalary, salaryHistory, getAddTtrs, AddTtrs, ttrsHistory, getBillReport, BillReport } = require('../controllers/payroll')
const { isLoggedin } = require('../middlewares/user')
const router=express.Router()


router
    .route('/')
    .get(isLoggedin,getPayrollPage) 

router
    .route('/addBill')
    .get(getAddBill) 

router
    .route('/addBillHistory')
    .get(getAddBillHistory)   

router
    .route('/addSalary')
    .get(getAddSalary)   
    .post(addSalesSalary)  
    
router
    .route('/salaryHistory')
    .get(salaryHistory)   

router
    .route('/addttrs')
    .get(getAddTtrs)  
    .post(AddTtrs)     
router
    .route('/ttrsHistory')
    .get(ttrsHistory)    

router
    .route('/billReport')
    .get(getBillReport)  
    .post(BillReport)      

    
    
    
    




module.exports=router

