const express = require('express')
const { getApiEmployee, selectEmployee, addBill, getSalesEmployee } = require('../controllers/api')
const router=express.Router()



router
    .route('/employee')
    .post(getApiEmployee) 

router
    .route('/select_emp')
    .post(selectEmployee)

router
    .route('/addBill')
    .post(addBill)    

router
    .route('/getSalesEmp')
    .get(getSalesEmployee)        


    
    
    
    
module.exports=router
