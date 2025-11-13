import User from "../model/userModel.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

export const register = async (req,res) => {
  const {name,email,address,phone,password} = req.body;
  // console.log(req.body)
  try {
    const user = await User.findOne({email});
    if(user) return res.status(401).json({message: "user already exists"});

    const hashPassword =  await bcryptjs.hash(password,10);

    //creating user
    const newUser = await User.create({name,email,address,phone,password:hashPassword,role:"user"});
    return res.status(201).json({message: "user created successfully"});
  } catch (error) {
    
    console.log(error);
    return res.status(500).json({message:"unable to create user"});
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body;

 
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "User not found" });

    const passwordMatch = await bcryptjs.compare(password, user.password);
    if (!passwordMatch) return res.status(401).json({ message: "Invalid credentials" });
    // console.log(user);
    const token = jwt.sign({ id: user._id, role: user.role }, "secretKey", { expiresIn: "1d" });

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
      })
      .status(200)
      .json({
        message: "Login successful",
        user: { id: user._id, email: user.email, role: user.role },
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Unable to login" });
  }
};

export const verify = (req, res) => {
  try {
    const token = req.cookies.token; 
    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, "secretKey");
    // console.log(decoded);
    res.status(200).json({ role: decoded.role, userId: decoded.id });
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};


export const logout = async (req, res) => {
  try {
    res
      .clearCookie("token")
      .status(200)
      .json({ message: "Logout successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Unable to logout" });
  }
};

