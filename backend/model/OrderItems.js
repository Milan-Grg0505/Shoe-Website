import mongoose from "mongoose";

const orderItemsModel = mongoose.Schema(
 {
  order:{
  type: mongoose.Schema.Types.ObjectId,
  ref:"Order",
  required:true,
  },

  product:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"Product",
    required:true
  },

  quantity:{
    type:Number,
    required: true,
  }
 }
);
const orderItems = mongoose.model("OrderItems",orderItemsModel);
export default orderItems;