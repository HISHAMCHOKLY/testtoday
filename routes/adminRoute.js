const express = require('express')
const { adminHome, adminEmployees, adminDeleteEmployee, adminEmpHistory, adminEmpHistoryDelete, adminVendors, adminDeleteVendors, adminVendorsHistory, adminPurchaseHistoryDelete, adminSalesHistory, adminExpenseHistory, adminExpenseHistoryDelete, adminSalesHistoryDelete } = require('../controllers/admin')
const router=express.Router()


router
    .route('/')
    .get(adminHome) 

router
    .route('/employees')
    .get(adminEmployees) 

router
    .route('/vendors')
    .get(adminVendors) 
    
router
    .route('/vendors/history')
    .get(adminVendorsHistory)     
    
router
    .route('/employees/history')
    .get(adminEmpHistory) 

router
    .route('/sales/history')
    .get(adminSalesHistory)   

router
    .route('/sales/deleteHisrory/:id')  
    .get(adminSalesHistoryDelete)        
    

router
    .route('/expense/history')
    .get(adminExpenseHistory)   
    
router
    .route('/expense/deleteHisrory/:id')  
    .get(adminExpenseHistoryDelete)     
    
router
    .route('/vendors/deleteHisrory/:id')  
    .get(adminPurchaseHistoryDelete)  
    
router
    .route('/delete/vendors/:v_id')  
    .get(adminDeleteVendors)     
    
router
    .route('/delete/:emp_id')  
    .get(adminDeleteEmployee)     
    
router
    .route('/deleteHisrory/:id')  
    .get(adminEmpHistoryDelete)     

    



module.exports=router

