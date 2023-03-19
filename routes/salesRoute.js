const express = require('express')
const {getSalesPage, addSales, salesHistoryPage, getSalesReportPage, salesReport}=require('../controllers/sales')
const router=express.Router()


router
    .route('/')
    .get(getSalesPage) 

router
    .route('/addSale')
    .post(addSales)

router
    .route('/salesHistory')
    .get(salesHistoryPage)   
    
router
    .route('/salesReport')
    .get(getSalesReportPage) 
    .post(salesReport)   



module.exports=router
