const express = require('express')
const { expenseHome, addExpense, expenseHistoryPage, getExpenseReportPage, expenseReport } = require('../controllers/expense')

const router=express.Router()


router
    .route('/')
    .get(expenseHome)


router
    .route('/add')
    .post(addExpense) 

router
    .route('/history')
    .get(expenseHistoryPage)   
 
router
    .route('/report')
    .get(getExpenseReportPage) 
    .post(expenseReport)      
    
    
    
    





module.exports=router
