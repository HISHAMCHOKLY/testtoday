let Vendor=require('../models/Vendor')
let PurchaseHistory=require('../models/PurchaseHistory')

exports.vendorsHome=async(req,res)=>{
    let data=await Vendor.find()
    res.render('vendersPage',{data})
}
exports.addVendors=async(req,res)=>{
    let {v_id,v_company,v_mob}=req.body
    let exist=Vendor.findOne({v_id:v_id})
    if(exist.v_id){
        res.send('vendor id already registerd')
    }else{
        await Vendor.create({id:Date.now(),v_id:v_id,v_company:v_company,v_mob:v_mob})
        res.redirect('/vendors')

    }

}

exports.getVendorPage=async(req,res)=>{
    let id=req.params.id
    let data=await Vendor.findOne({v_id:id})
    let v_history= await PurchaseHistory.find({v_id:id})
    let tot=0
    let pay_tot=0
    v_history.forEach((x)=>{
        tot+=x.tot_amount
        pay_tot+=x.p_amount

    })
    let balance=tot-pay_tot

    res.render('vendorPage',{data,balance})
}

exports.addBill=async(req,res)=>{
    let {bill_number,v_id,c_name,add_date,tot_amount,pay_amount}=req.body
    if(pay_amount!=0){
        await PurchaseHistory.create({id:Date.now(),v_id:v_id,billNumber:bill_number,type:'bill_and_pay',v_com:c_name,date:add_date,tot_amount:tot_amount,p_amount:pay_amount})
    }
    else{
        await PurchaseHistory.create({id:Date.now(),v_id:v_id,billNumber:bill_number,type:'bill',v_com:c_name,date:add_date,tot_amount:tot_amount,p_amount:0})
    }
    res.redirect(`/vendors/${v_id}`)

}
exports.payBill=async(req,res)=>{
    let {v_id,c_name,add_date,pay_amount}=req.body
    await PurchaseHistory.create({id:Date.now(),v_id:v_id,billNumber:0,type:'pay',v_com:c_name,date:add_date,tot_amount:0,p_amount:pay_amount})
    res.redirect(`/vendors/${v_id}`)

}

exports.vendorAddHistory=async(req,res)=>{
    let v_id=req.params.id
    let data=await Vendor.findOne({v_id:v_id})
    let pay=false
    let history=await PurchaseHistory.find({v_id:v_id,$or:[{type:'bill_and_pay'},{type:'bill'}]})
    res.render('vendorHistoryPage',{history,data,pay})
}

exports.vendorPayHistory=async(req,res)=>{
    let v_id=req.params.id
    let data=await Vendor.findOne({v_id:v_id})
    let history=await PurchaseHistory.find({v_id:v_id,$or:[{type:'bill_and_pay'},{type:'pay'}]})
    let pay=true
    res.render('vendorHistoryPage',{history,data,pay})
}

exports.getVendorUpdate=async(req,res)=>{
    let v_id=req.params.id
    let data=await Vendor.findOne({v_id:v_id})
    res.render('vendorEditPage',{data})


}

exports.vendorUpdate=async(req,res)=>{
    let v_id=req.params.id
    let {v_company,v_mob}=req.body
    let data=await Vendor.findOne({v_id:v_id})
    data.v_company=v_company
    data.v_mob=v_mob
    data.save()
    res.redirect(`/vendors/${v_id}`)


}