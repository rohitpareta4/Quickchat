import { generatetoken } from "../lib/utils.js"
import bcrypt from "bcryptjs"
import User from "../models/user.model.js"
import mongoose from "mongoose"

export const signup=async(req,res)=>{
    console.log("reqbody",req.body)
   try {
    const {email,fullname,password}=req.body
    if(!email || !fullname || !password){
        return res.status(400).json({message:"all fields must be required..."})
    }
    if(password.length<6){
        return res.status(400).json({message:"password must be at least 6 characters..."})
    }
    const user=await User.findOne({email})
    if(user) return res.status(400).json({message:"user with this email already exists..."})

        const salt=await bcrypt.genSalt(10)
        const hashedpassword=await bcrypt.hash(password,salt)

        const newuser=await User.create({
            email,
            fullname,
            password:hashedpassword
        })
        console.log("newuser",newuser)
        if(newuser){
            generatetoken(newuser._id,res);
        console.log("token.....is",res.cookie)

            await newuser.save()

            res.status(201).json({
                _id:newuser._id,
                email:newuser.email,
                fullname:newuser.fullname,
                profilepic:newuser.profilepic
            })
        }
        else{
            res.status(400).json({message:"invalid user data"})
        }
   } catch (error) {
    console.log('error occur',error.message)
   }
}
export const login=async(req,res)=>{
   
    try {
         console.log("login details is",req.body)
        const {email,password}=req.body
        const user=await User.findOne({email});
        if(!user){
           return res.status(400).json({message:"invalid credentials"});
        }
        const ispassword=await bcrypt.compare(password,user.password)
        if(!ispassword){
           return res.status(400).json({message:"invalid credentials"});
        }
        const token=generatetoken(user._id,res)
        
       return res.status(200).json({
            _id:user._id,
            email:user.email,
            fullname:user.fullname,
            profilepic:user.profilepic,
            token
        })
    } catch (error) {
        console.log('error login',error.message)
        res.status(500).json("internal server error")
    }
}
export const me=(req,res)=>{
    console.log("requser",req.user)
   try {
     return res.status(200).json(req.user)
   } catch (error) {
    console.log('error',error)
   }
}
export const logout=(req,res)=>{
    try {
         res.cookie("jwt","",{maxAge:0})
            res.status(200).json({message:"logout succesfully..."})
    } catch (error) {
          console.log('error logout',error.message)
        res.status(500).json({message:"internal server error"})
    }
}

export const updateprofile=async(req,res)=>{
    try {
        const {profilepic}=req.body
        const userId=req.user._id;
        if(!profilepic){
        res.status(400).json({message:"profile-pic is required..."})
        }
        const uploadresponse=await uploader.upload(profilepic)
        const updateuser=await User.findByIdAndUpdate(userId,{profilepic:uploadresponse.secure_url},{new:true})
        res.status(200).json(updateuser)
    } catch (error) {
        console.log('error in updateprofile',error)
    }
}

export const addbio=async(req,res)=>{
   
    try {
        const userId=req.user._id;
        const updateprofile={};
        if(req.body.bio){
            updateprofile.bio=req.body.bio
        }
        if(req.body.fullname){
            updateprofile.fullname=req.body.fullname
        }
        if(req.file &&  req.file.filename){
            updateprofile.profilepic=req.file.filename
        }
       
             

       const Add_bio=await User.findByIdAndUpdate(
         userId,   
         updateprofile,     // ID as the first argument         // Update object
  { new: true }
    )
    console.log("Add_bio",Add_bio)
        res.status(200).json(Add_bio)
    } catch (error) {
        console.log(error)
    }
}

export const srch=async(req,res)=>{
    console.log("req.bodysrch",req.body.srch)
  const {srch}=req.body
  try {
    const returnUser=await User.find({
        fullname: { $regex: srch, $options: 'i' }
    })
    console.log("returnUser!!!!!!!!!!!",returnUser)
    res.status(200).json(returnUser)
  } catch (error) {
    console.log(error)
  }
}

// export const notifuser=async(req,res)=>{
//   try {
//     const {ids}=req.body
//     const notifuser=await User.findById({
//         _id:new mongoose.Types.ObjectId(ids)
//     })

//     res.status(200).json(notifuser)

//   } catch (error) {
//      res.status(401).json({message:"something gone wrong..."})
//   }
// }