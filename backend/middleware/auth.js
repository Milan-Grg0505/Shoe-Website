import jwt from 'jsonwebtoken';

export const verifyAuth = async (req,res,next) =>{
  const token = req.cookies.token;
  if(!token) return res.status(401).json({message:"token not found"});
  
  jwt.verify(token,"secretKey",(err,payload) => {
    if(err) return res.status(401).json({message:"invalid token"});
    req.userId = payload.id;
    next();
  })
};
