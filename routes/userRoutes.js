const express=require('express');
const userroutes=express.Router();
const userController=require('../controller/userController')
const isadminAuth = require("../middleware/adminauth");

userroutes.post('/login',userController.login);
userroutes.get('/logout',userController.logout);
userroutes.post('/register',userController.register);
userroutes.post('/checkUser',isadminAuth,userController.checkUser)
userroutes.get('/users',userController.getallusers)



module.exports=userroutes;