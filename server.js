const express=require('express');
const app=express();
const mongoose=require('mongoose');
const cors=require('cors');
const adminRoutes = require('./routes/adminRoutes');


const userroutes=require('./routes/userRoutes')
app.use('/',express.static('./public'))


app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(cors());


app.use(userroutes);
app.use('/admin', adminRoutes);


mongoose.connect("mongodb://127.0.0.1:27017/Task-Manager-App")
.then(()=>{
    console.log("Mongo DB Connection Successs");
    app.listen(3000,()=>{
        console.log("Node listening to port 3000");
    })
}
).catch(()=>{
    console.log("Error occured while connecting to mongod");
})

module.exports=app;

