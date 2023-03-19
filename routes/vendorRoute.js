const express = require('express')
const { vendorsHome, addVendors, getVendorPage, addBill, payBill, vendorAddHistory, vendorPayHistory, getVendorUpdate, vendorUpdate } = require('../controllers/vendor')
const router=express.Router()


router
    .route('/')
    .get(vendorsHome) 


router
    .route('/add')
    .post(addVendors)     
router
    .route('/:id') 
    .get(getVendorPage)   

router
    .route('/:id/add_Bill')   
    .post(addBill) 

router
    .route('/:id/pay_Bill')   
    .post(payBill)     

router
    .route('/:id/update')   
    .get(getVendorUpdate)   
    .post(vendorUpdate) 

router
    .route('/:id/add_history')   
    .get(vendorAddHistory)    


router
    .route('/:id/pay_history')   
    .get(vendorPayHistory)        

module.exports=router
