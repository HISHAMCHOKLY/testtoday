const Employee=require('../models/Employee')
const EmployeeHistory=require('../models/EmployeeHistory')


exports.EmployeesHome=async(req,res)=>{
    res.render('employeeHome')
}


exports.Employees=async(req,res)=>{
    let emp_type=req.params.emp_type
    let data=await Employee.find({emp_type:emp_type})
    res.render('employeesPage',{data,emp_type})
}

exports.getEmployeePage=async(req,res)=>{
    let emp_id=req.params.emp_id
    let emp_type=req.params.emp_type
    let data=await Employee.findOne({emp_id:emp_id})
    let cutters= await Employee.find({emp_type:'cutters'})
    let totSalary=await EmployeeHistory.find({emp_id:emp_id})
    let balance_salary=0
    totSalary.forEach((x) => {
        balance_salary+=x.amount        
    });

    res.render('employeePage',{data,balance_salary,emp_id,cutters})
}


exports.addEmployee=async(req,res)=>{
    let {emp_id,emp_name,emp_dob,emp_mob,emp_type,emp_passport,emp_passport_vf,emp_passport_vt,emp_iqama,emp_iqama_vf,emp_iqama_vt,emp_salary}=req.body
    if(await Employee.findOne({emp_id:emp_id})){
        res.send('Employee Id Already Exist')
    }else{
        await Employee.create({id:Date.now(),emp_id:emp_id,emp_name:emp_name,emp_dob:emp_dob,emp_mob:emp_mob,emp_passport:emp_passport,emp_passport_vf:emp_passport_vf,emp_passport_vt:emp_passport_vt,emp_iqama:emp_iqama,emp_iqama_vf:emp_iqama_vf,emp_iqama_vt:emp_iqama_vt,emp_type:emp_type,emp_salary:emp_salary
        })
        res.redirect('/employee')
    }
    
}

exports.paySalary=async(req,res)=>{
    let emp_id=req.params.emp_id
    let emp_type=req.params.emp_type

    let {pay_amout,pay_date}=req.body
    await EmployeeHistory.create({
        id:Date.now(),
        emp_id:emp_id,
        emp_tr_type:'pay',
        amount:-pay_amout,
        date:pay_date
    })
    res.redirect(`/employee/${emp_type}/${emp_id}`)
}

exports.getAddHistory=async(req,res)=>{
    let emp_id=req.params.emp_id
    let pay=false
    let data=await Employee.findOne({emp_id:emp_id})
    let cutters= await Employee.find({emp_type:'cutters'})
    let history=await EmployeeHistory.find({emp_id:emp_id,emp_tr_type:'add'})
    let emp_type=data.emp_type

    res.render('employeeHistoryPage',{data,history,emp_id,pay,cutters,emp_type})
}

exports.getPayHistory=async(req,res)=>{
    let emp_id=req.params.emp_id
    let pay=true
    let data=await Employee.findOne({emp_id:emp_id})
    let history=await EmployeeHistory.find({emp_id:emp_id,emp_tr_type:'pay'})
    let cutters= await Employee.find({emp_type:'cutters'})
    let emp_type=data.emp_type
    res.render('employeeHistoryPage',{data,history,emp_id,pay,cutters,emp_type})
}

exports.getEmployeeUpdate=async(req,res)=>{
    let emp_id=req.params.emp_id
    let data=await Employee.findOne({emp_id:emp_id})
    let cutters= await Employee.find({emp_type:'cutters'})
    res.render('employeeEditPage',{data,cutters})


}
exports.employeeUpdate=async(req,res)=>{
    let emp_id=req.params.emp_id
    let {emp_name,emp_dob,emp_mob,emp_passport,emp_passport_vf,emp_passport_vt,emp_iqama,emp_iqama_vf,emp_iqama_vt,emp_salary}=req.body
    let data=await Employee.findOne({emp_id:emp_id})
    data.emp_name=emp_name
    data.emp_dob=emp_dob
    data.emp_mob=emp_mob
    data.emp_passport=emp_passport
    data.emp_passport_vf=emp_passport_vf
    data.emp_passport_vt=emp_passport_vt
    data.emp_salary=emp_salary
    data.emp_iqama=emp_iqama
    data.emp_iqama_vf=emp_iqama_vf
    data.emp_iqama_vt=emp_iqama_vt
    data.emp_salary=emp_salary
    data.save()
    res.redirect(`/employee/${data.emp_type}/${data.emp_id}`)

}
exports.get_set_amount=async(req,res)=>{
    let emp_id=req.params.emp_id
    let emp_type=req.params.emp_type
    let data=await Employee.findOne({emp_id:emp_id})
    res.render('setPricePage',{data})

}

exports.set_amount=async(req,res)=>{
    let emp_id=req.params.emp_id
    let emp_type=req.params.emp_type
    let data=await Employee.findOne({emp_id:emp_id})
    let thop_types=data.thop_types
    let {big_collar,small_collar,big_neck,small_neck,emarathi}=req.body
    let prices=[big_collar,small_collar,big_neck,small_neck,emarathi]
    let Uthop_types=thop_types.map((thop_type, index) => {
        const price = prices[index];
        thop_type.price=price
        return thop_type

    })
    Employee.updateOne({ emp_id:emp_id }, { $set: { "thop_types": Uthop_types } }, function (error, success) {
        if (error) {
            console.log(error);
        } else {
            console.log("Array updated successfully");
        }
    });
    res.redirect('/employee')

    

}







