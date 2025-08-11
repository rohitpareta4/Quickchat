// import express from 'express'
import { Router } from "express"
import { signup,login,logout,updateprofile,me,addbio,srch } from "../controllers/auth.controller.js"
import { protectRoute } from "../middleware/auth.middleware.js"
import upload from "../config/multerConfig.js"

const router=Router()

router.post('/signup',signup)
router.post('/login',login)
router.post('/logout',logout)
router.get('/me',protectRoute,me)
router.post('/update-profile',protectRoute,updateprofile)
router.post('/addbio',protectRoute,upload.single('profilepic'),addbio)
router.post('/srch',protectRoute,srch)
// router.get('/notifyuser',protectRoute,notifuser)

export default router