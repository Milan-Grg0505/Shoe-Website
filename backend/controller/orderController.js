import orderItems from "../model/OrderItems.js";
import Order from "../model/orderModel.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";

export const getOrder = async(req,res) =>{
  try {
    const order = await Order.find().populate("user", "name");
    res.status(200).json(order)
  } catch (error) {
    console.log(error);
    res.status(400).json({message: "failed to get all orders"});
  }
}

export const getOrderById = async (req,res) => {
  const {id} = req.params;

  try {
    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    console.log(error);
    res.status(400).json({message: "failed to get order"});
  }
}

export const addOrder = async (req,res) => {
  const {user,status,paymentStatus,total,items,esewa} = req.body;

  try {
   const order = await Order.create({user,status,paymentStatus,total});
   // Add OrderItems
   const orderItemsData = items.map((item) => ({
    order: order._id, // Associate items with the created order
    product: item.productId,
    quantity: item.quantity,
  }));
  await orderItems.insertMany(orderItemsData);

  if(esewa){
    const secret = "8gBm/:&EnhH.1/q";
    const signedData = `total_amount=${order.total},transaction_uuid=${order._id},product_code=EPAYTEST`;
    const signature = crypto.createHmac("sha256", secret)
    .update(signedData)
    .digest("base64");
  
    const formData = {
      amount : order.total,
      tax_amount : 0,
      total_amount : order.total,
      transaction_uuid : order._id,
      product_code : "EPAYTEST",
      product_service_charge : 0,
      product_delivery_charge : 0,
      success_url : "http://localhost:5173/user/orders",
      failure_url : "https://google.com",
      signed_field_names : "total_amount,transaction_uuid,product_code",
      signature : signature,
    }
    res.status(200).json({message:"order added successfully",formData});
  }else{
    res.status(200).json({message:"order added successfully"});
  }

  } catch (error) {
    console.log(error);
    res.status(500).json({message: "failed to add order"});
  }
}


export const deleteOrder = async (req,res) => {
  const {id} = req.params;

  try {
    await Order.findByIdAndDelete(id);

    // Delete associated OrderItems
    await orderItems.deleteMany({ order: id });

    res.status(200).json({message:"order deleted successfully"});
  } catch (error) {
    console.log(error);
    res.status(400).json({message:"failed to delete order"});
  }
}


// Update Payment Status
export const updatePaymentStatus = async (req, res) => {
  const { id } = req.params; // Order ID
  const { status } = req.body; // New payment status

  const token = req.cookies.token; 
  if (!token) return res.status(401).json({ message: "No token provided" });

  const decoded = jwt.verify(token, "secretKey");

  try {
    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

   
    // Check if the user is either the owner or an admin
    const isOwner = order.user.toString() === decoded.id;
    const isAdmin = decoded.role === "admin";

    if (!isOwner && !isAdmin) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this order" });
    }

    order.paymentStatus = status; // Update payment status
    await order.save();

    res.status(200).json({ message: "Payment status updated successfully", order });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to update payment status" });
  }
};

// Cancel Order
export const cancelOrder = async (req, res) => {
  const { id } = req.params; // Order ID

  try {
    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.status === "cancel") {
      return res.status(400).json({ message: "Order is already cancelled" });
    }

    order.status = "cancel"; // Update order status
    await order.save();

    // Optionally delete associated OrderItems (if applicable)
    await orderItems.deleteMany({ order: id });

    res.status(200).json({ message: "Order cancelled successfully", order });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to cancel order" });
  }
};

//update order
export const updateOrder = async (req,res) =>{

  const { status } = req.body;
  const token = req.cookies.token; 
  if (!token) return res.status(401).json({ message: "No token provided" });

  const decoded = jwt.verify(token, "secretKey");

  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if(decoded.role !== "admin"){
      return res
        .status(403)
        .json({ message: "You are not authorized to update this order" });
    }

    order.status = status;
    await order.save();

    res.status(200).json({ message: "Order status updated", order });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}
