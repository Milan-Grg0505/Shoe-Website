import User from "../model/userModel.js";
import jwt from "jsonwebtoken";
import Order from "../model/orderModel.js";

//get all users
export const getUser = async (req,res) =>{
  try {
    const user = await User.find({});
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(404).json({message:"failed to get all users"});
  }
};

//get user by id
export const getUserById = async(req,res) =>{
  const token = req.cookies.token; 
  if (!token) return res.status(401).json({ message: "No token provided" });
 
  const decoded = jwt.verify(token, "secretKey");
  try {
    const user = await User.findById(decoded.id);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(404).json({message:"failed to get user"});
  }
};

//add user
export const addUser = async(req,res) =>{
  const {name,email,address,phone,password} = req.body;

  
  try {
    await User.create({name,email,address,phone,password});
    res.status(201).json({message:"user added successfully"});
  } catch (error) {
    console.log(error);
    res.status(404).json({message:"failed to add user"});
  }
};

//update user
export const updateUser  = async(req,res) =>{
  const {id} = req.params;
  const {name,email,address,phone,password} = req.body;

  try {
    await User.findByIdAndUpdate(id,{name,email,address,phone,password});
    res.status(200).json({message:"user updated successfully"});
  } catch (error) {
    console.log(error);
    res.status(404).json({message:"failed to update user"});
  }
};

//delete user
export const deleteUser = async (req,res) =>{
  const {id} = req.params;

  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({message:"user deleted successfully"});
  } catch (error) {
    console.log(error);
    res.status(404).json({message:"failed to delete user"});
  }
}


export const getOrderByUser = async (req,res) => {
  const token = req.cookies.token; 
  if (!token) return res.status(401).json({ message: "No token provided" });
 
  const decoded = jwt.verify(token, "secretKey");
  try {
    const orders = await Order.find({ user: decoded.id });
    res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    res.status(404).json({message:"failed to get user"});
  }
}

// Fetch the order details by order ID
export const getOrderDetails = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findById(id).populate({
      path: 'items',
      populate: { path: 'product' },
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get order details" });
  }
};
