require('dotenv').config()
const express = require('express')
const app=express()
const cookieParser=require('cookie-parser')

const connectDb=require('./config/database')
connectDb()

app.set('view engine','ejs')
app.use(express.static('static'))
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cookieParser())


let homeRoute=require('./routes/homeRoute')
let employeeRoute=require('./routes/employeeRoute')
let salesRoute=require('./routes/salesRoute')
let VendorRoute=require('./routes/vendorRoute')
let expenseRoute=require('./routes/expenseRoute')
let apiRoute=require('./routes/apiRoute')
let adminRoute=require('./routes/adminRoute')
let payrollRoute=require('./routes/payrollRoute')

app.use('/',homeRoute)
app.use('/employee',employeeRoute)
app.use('/sales',salesRoute)
app.use('/vendors',VendorRoute)
app.use('/expense',expenseRoute)
app.use('/api',apiRoute)
app.use('/admin',adminRoute)
app.use('/payroll',payrollRoute)






app.listen(process.env.PORT,()=>{
    console.log('connected on 5000');
})