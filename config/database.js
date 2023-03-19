const mongoose=require('mongoose')
mongoose.set('strictQuery', true);

const url=process.env.DB_URL
    function connectDb(){
        mongoose.connect(url)
        .then(()=>{
            console.log('connected');
        })
        .catch((x)=>{
            console.log(x);
        })
    }

module.exports=connectDb