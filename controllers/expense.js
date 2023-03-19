let expenseHistory=require('../models/expenseHistory')

exports.expenseHome=async(req,res)=>{
    res.render('expensePage')
}

exports.addExpense=async(req,res)=>{
    let {branch,amount,dis,date}=req.body
    await expenseHistory.create({id:Date.now(),branch:branch,date:date,amount:-amount,dis:dis})
    res.redirect('/expense/history')
}


exports.expenseHistoryPage=async(req,res)=>{
    let data=await expenseHistory.find()
    let gtot=0
    data.forEach((x)=>{
        gtot+=-(x.amount)

    })
    res.render('expenseHistoryPage',{data,gtot})
}

exports.getExpenseReportPage=(req,res)=>{
    let data=[]
    let start,end,gtot
    res.render('expenseReportPage',{data:data,start,end,gtot})
}

exports.expenseReport=async(req,res)=>{
    let {start,end,branch}=req.body
    let data
    if(branch){
        data=await expenseHistory.find({
            date: {
                $gte: start, 
                $lte: end
            },
            branch:branch
        })
    }else{
        data=await expenseHistory.find({
            date: {
                $gte: start, 
                $lte: end
            }
        })
    }
    data.reverse()
    let gtot=0
    data.forEach((x)=>{
        gtot+=-(x.amount)

    })
    res.render('expenseReportPage',{data,gtot,start,end,branch})
}