import express from 'express'
import { protectRoute } from '../middleware/auth.middleware.js'
import { fetchallusers,getMessages,sendMessage,BotuserMssg,notificationfn,getusersnotif,deleteNotif,seenMssg,checkSeen,scheduleapi,buddy } from '../controllers/message.controller.js';

const router=express.Router()
router.get('/user',protectRoute,fetchallusers);
router.get('/:id',protectRoute,getMessages);
router.post('/send/:id',protectRoute,sendMessage);
router.post('/BotuserMssg',protectRoute,BotuserMssg)
router.post('/buddy',protectRoute,buddy)
router.post('/notif/:id',protectRoute,notificationfn)//for storing notifications
router.get('/getnotif/:id',protectRoute,getusersnotif)// for getting notifications
router.delete('/deleteNotif/:id',protectRoute,deleteNotif)
router.post('/seen/:id',protectRoute,seenMssg)
router.get('/isSeen/:id',protectRoute,checkSeen)
router.post('/schedule',protectRoute,scheduleapi)


export default router