import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"User",
    required: true,
  },

  status:{
    type:String,
    enum: ["cancel","completed","pending"],
    required: true,
  },

  paymentStatus:{
    type:String,
    enum:["completed","cancel","pending"],
    required:true,
  },

  total:{
    type:Number,
    required:true,
  }
},{
  timestamps:true,
});


const Order = mongoose.model('Order',orderSchema);
export default Order;