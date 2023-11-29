const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    employeeid:{
        type:Number,
        unique:true,
        required:[true,"Enter Employee-ID of The User"]
    },
    name:{
        type:String,
        required:[true,"Enter Name of The User"]
    },
    email:{
        type:String,
        unique:true,
        required:[true,"Enter Email of The User"]
    },
    username:{
        type:String,
        unique:true,
        required:[true,"Enter User name"]
    },
    password:{
        type:String,
        required:[true,"Enter Password"]
    },
    role:{
        type:String,
        default:"user",
        required:[true,"Enter Role"]

    }
},
{
         timestamps:false,
        versionKey:false
}
)
const Users=mongoose.model('Users',userSchema);
module.exports=Users;