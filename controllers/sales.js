const SalesHistory=require('../models/salesHistory')


exports.getSalesPage=async(req,res)=>{
    res.render('salesPage')
}
exports.addSales=async(req,res)=>{
    let {branch,bamount,camount,date}=req.body
    await SalesHistory.create({id:Date.now(),branch:branch,date:date,bankAmount:bamount,CashAmount:camount,total:parseInt(bamount)+parseInt(camount)})
    res.redirect('/sales/salesHistory')
}

exports.salesHistoryPage=async(req,res)=>{
    let data=await SalesHistory.find()
    let atot=0
    let ctot=0
    let gtot=0
    data.forEach((x)=>{
        atot+=x.bankAmount
        ctot+=x.CashAmount

    })
    gtot=atot+ctot
    res.render('salesHistoryPage',{data,atot,ctot,gtot})
}
exports.getSalesReportPage=(req,res)=>{
    let data=[]
    let start,end,atot,ctot,gtot
    res.render('salesReportPage',{data:data,start,end,atot,ctot,gtot})
}
exports.salesReport=async(req,res)=>{
    let {start,end,branch}=req.body
    let data
    if(branch){
        data=await SalesHistory.find({
            date: {
                $gte: start, 
                $lte: end
            },
            branch:branch
        })
    }else{
        data=await SalesHistory.find({
            date: {
                $gte: start, 
                $lte: end
            }
        })
    }
    data.reverse()
    let atot=0
    let ctot=0
    let gtot=0
    data.forEach((x)=>{
        atot+=x.bankAmount
        ctot+=x.CashAmount

    })
    gtot=atot+ctot
    res.render('salesReportPage',{data,atot,ctot,gtot,start,end,branch})
}