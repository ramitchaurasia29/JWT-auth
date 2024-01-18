const mongoose=require("mongoose");

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:[true,"Please add the username"],
    },
    email:{
        type:String,
        required:[true,"Please add the user email"],
        unique:[true,"Email is already taken"],
    },
    password:{
        type:String,
        required:[true,"Please add Password"]
    }
},{
    timestamps:true,
});

module.exports = mongoose.model("User",userSchema);