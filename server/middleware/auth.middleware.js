import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'

export const protectRoute=async(req,res,next)=>{
   try {
    const token=req.cookies.jwt;
    console.log("token is",req.cookies)
    if(!token){
       return res.status(401).json({message:"unauthorized-No token provided"})
    }
    const decode=jwt.verify(token,process.env.JWT_SECRET);
    if(!decode){
       return res.status(401).json({message:"Invalid token"})
    }
    const user = await User.findById(decode.userId).select("-password")
    if(!user){
       return res.status(404).json({message:"user not found"})
    }
    req.user=user;
    next()
   } catch (error) {
    console.log('error',error.message)
   }
}