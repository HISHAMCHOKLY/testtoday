const express = require('express')
const { EmployeesHome, addEmployee, getEmployeePage, addSalary, paySalary, getAddHistory, getPayHistory, Employees, getEmployeeUpdate, employeeUpdate, get_set_amount, delete_emp, set_amount, getAddSalary, getAddBill, getAddBillHistory, addSalesSalary } = require('../controllers/employee')
const { isLoggedin } = require('../middlewares/user')
const router=express.Router()



router
    .route('/')
    .get(isLoggedin,EmployeesHome) 
   

router
    .route('/:emp_type')
    .get(isLoggedin,Employees)     

router
    .route('/add')
    .post(addEmployee)

router
    .route('/:emp_type/:emp_id')
    .get(getEmployeePage)  

router
    .route('/:emp_type/:emp_id/pay_salary')
    .post(paySalary) 

router
    .route('/:emp_type/:emp_id/update')
    .get(getEmployeeUpdate)  
    .post(employeeUpdate)

router
    .route('/:emp_type/:emp_id/add_history')
    .get(getAddHistory)  
    
router
    .route('/:emp_type/:emp_id/pay_history')
    .get(getPayHistory)  
    
  

router
    .route('/:emp_type/:emp_id/set_amount')
    .get(get_set_amount)
    .post(set_amount) 
    







module.exports=router
