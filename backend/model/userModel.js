import mongoose from "mongoose";

const userSchema= mongoose.Schema(
  {
    name:{
      type:String,
      required:true,
    },

    email:{
      type:String,
      required:true,
      unique:true,
      match:/^[^\s@]+@[^\s@]+\.[^\s@]+$/,//email validation
    },
    password:{
      type:String,
      required:true,
    },
    address:{
      type:String,
      required:true,
    },

    phone:{
      type:Number,
      required:true,
      match: /^[0-9]{10}$/,//ensures it's aa 10-digit umber
    },
    role:{
      type:String,
      required:true,
      enum: ["user", "admin"], 
      default: "user" 
    }
    
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User',userSchema);
export default User;