import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import Botmessage from "../models/botMessage.model.js";
import { getrecieversocketId,io } from "../socket.js";
import mongoose from "mongoose";
// import { Socket } from "socket.io";
import notification from "../models/usersnotification.js";
import seenMessage from "../models/messageseen.js";
import scheduleschema from "../models/schedulemssg.model.js";
import { scheduleJob } from "node-schedule";
import axios from 'axios'


export const fetchallusers=async(req,res)=>{
    try {
        const loggedin=req.user._id;
        const showallusers=await User.find({_id:{$ne:loggedin}}).select("-password")
        res.status(200).json(showallusers)
    } catch (error) {
        console.log('error',error.message)
    }
}

export const getMessages=async(req,res)=>{
    try {
const BOT_ID = new mongoose.Types.ObjectId("000000000000000000000001");

        console.log("bottii...................",req.params)
        const {id:usertochat}=req.params;
        
        const myId=req.user._id;
       
           const sendMssg=await Botmessage.find({
      $or:[
        {senderId:myId,recieverId:BOT_ID,ContextId:usertochat},
        {senderId:BOT_ID,recieverId:myId,ContextId:usertochat},
      ]
    })
       
        const messages=await Message.find({
          $or:[
            {senderId:myId,recieverId:usertochat},
            {senderId:usertochat,recieverId:myId}
          ]
        })

        const allMessages=[...messages,...sendMssg]
        allMessages.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

        return res.status(200).json(allMessages)
    } catch (error) {
        console.log('error is',error.message)
    }
}


export const sendMessage=async(req,res)=>{
    try {
        console.log("botId******************",req.params.id)
        const updatedmssg={}
        if(req.body.text){
            updatedmssg.text=req.body.text
        }
        if(req.body.Image){
            updatedmssg.Image=req.body.Image
        }
        const senderId=req.user._id//logged userId
        const recieverId=req.params.id//selected userId
        
    
        
        console.log("senderId",senderId)
        console.log("recieverId",recieverId)
        
      
        const newMessage=await Message.create({
            ...updatedmssg,
            recieverId:recieverId,
            senderId
        })

        const recieversocketId=getrecieversocketId(recieverId)
        console.log(recieversocketId,senderId)
        if(recieversocketId){
            io.to(recieversocketId).emit("sendingmssg",newMessage)
            io.to(recieversocketId).emit("sendNotification",newMessage)

            //  io.to(recieversocketId).emit("seenMssg",{
            //     senderId,recieverId,isSeen:true
            //  })
        }
    

        res.status(200).json(newMessage)
    
    } catch (error) {
        console.log('error',error)
    }
}

export const notificationfn=async(req,res)=>{
  try {
    console.log("req params;;;;;;;;;",req.params)
    console.log("alldataofnotif......................",req.body)
       const updateddata={}
   if(req.body.text){
    updateddata.text=req.body.text
   }
   const senderId=req.user._id;
   const recieverId=req.params.id

   const createnotifdata=await notification.create({
    ...updateddata,senderId,recieverId
   })
 
   console.log("id'''''''''''''''''''''''",recieverId)

    const recieversocketId=getrecieversocketId(recieverId)
   if(recieversocketId){
    io.to(recieversocketId).emit("sendNotification",createnotifdata)
    console.log("send..................")
   }
   console.log("........................................",createnotifdata)
   res.status(200).json(createnotifdata)

   console.log("send notif...................",createnotifdata)
  } catch (error) {
    console.log(error)
  }
}

export const getusersnotif=async(req,res)=>{
  console.log("get user notif.....",typeof(req.params.id))
  console.log("get user notif.....",req.params.id)

  const recieverId=new mongoose.Types.ObjectId(req.params.id)
  console.log("recieverId,,,,,,,,,,,,,,,",recieverId)

  try {
    const shownotif=await notification.find({
      recieverId:recieverId
    })
    res.status(200).json(shownotif)
  } catch (error) {
    console.log(error)
  }
}

export const deleteNotif=async(req,res)=>{
  try {
    console.log("delete id...............",req.params.id)

    const deletemssg=await notification.deleteMany({
      senderId:req.params.id
    })
  console.log("deleted..............",deletemssg)
 res.status(200).json(deletemssg)
 
  } catch (error) {
    console.log(error)
  }
}

export const seenMssg=async(req,res)=>{
  try {

    console.log("hehe......................................",req.params)
    console.log("req is..................",req.params.id)
    const senderId=req.user._id
    const recieverId=req.params.id
    const checkSeen=await seenMessage.create({
       senderId,
       recieverId,
       isSeen:true,
       timestamp:Date.now()
    })

     const recieversocketId=getrecieversocketId(recieverId)
   if(recieversocketId){
    io.to(recieversocketId).emit("seenMssg",checkSeen)
    console.log("seeen..................")
   }


    res.status(200).json(checkSeen)
  } catch (error) {
    console.log(error)
  }
}

export const checkSeen=async(req,res)=>{
  try {
    console.log("isseen................",req.params.id)
    const getseen=await seenMessage.find({
      senderId:req.user._id,
      recieverId:req.params.id
    })
    
    console.log("getseen.......................",getseen)
    res.status(200).json(getseen)
  } catch (error) {
    console.log(error)
  }
}


export const BotuserMssg = async (req, res) => {
  const { senderId, recieverId,ContextId,text } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(senderId) || !mongoose.Types.ObjectId.isValid(ContextId) || !mongoose.Types.ObjectId.isValid(recieverId)) {
      return res.status(400).json({ error: "Invalid senderId format" });
    }
 
    const loggedmssg = await Botmessage.create({
      senderId: new mongoose.Types.ObjectId(senderId), // safe cast
      recieverId:new mongoose.Types.ObjectId(recieverId),
      ContextId:new mongoose.Types.ObjectId(ContextId),
      text
    });

    console.log("✅ Message saved:", loggedmssg);
    res.status(200).json(loggedmssg);
  } catch (err) {
    console.error("❌ Error in BotuserMssg:", err);
    res.status(500).json({ error: "Failed to store messages" });
  }
};


export const scheduleapi=async(req,res)=>{
  try {

    console.log("hehehhehhhhhhhhhhhhhhhhhheeeeeeeeeeeeeeee")
    console.log('...............body.............',req.body)
    console.log('............typeofscheduletime...........',typeof(req.body.scheduletime))
      const {recieverId,scheduleMssg,scheduletime}=req.body
      const senderId=req.user._id

      const date = new Date(scheduletime);
      // console.log("⏱️ Current time:", new Date().toISOString());
      // console.log("⏳ Scheduled time:", date.toISOString());

      // console.log('...........date...............',typeof(date))
      // console.log('...........date...............',date)

      const jobss=scheduleJob(date, async() => {
  try {
    
      const savedata=await Message.create({
        senderId,
        recieverId,
        text:scheduleMssg
      })

      const createnotif=await notification.create({
         senderId,
        recieverId,
        text:scheduleMssg
      })


      console.log("savedata...............",savedata)
      console.log("savenotif...............",createnotif)

     const recieversocketId=getrecieversocketId(recieverId)
        console.log('...............recieversocketId..............',typeof(recieversocketId))
        if(recieversocketId){
            io.to(recieversocketId).emit("sendingmssg",savedata)
            io.to(recieversocketId).emit("sendNotification",savedata)
        }
    console.log(`✅ Sended mssg at ${new Date().toString()}`);
  } catch (e) {
    console.error("❌ Error in scheduled job:", e);
  }
});

if(jobss){
  console.log('...................................................................done.............')
}
else{
  console('...................noooooooooooooooo')
}
  } catch (error) {
    console.log(error)
  }
}







export const buddy=async(req, res)=>{
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    console.log('obtained......................................')
    const { text, context } = req.body;

    const groqMessage = [
      ...context,
      {
        role: "user",
        content: text,
      },
    ];

    const groqRes = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.1-8b-instant",
        messages: groqMessage,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
      }
    );
    
    res.status(200).json(groqRes.data);
  } catch (error) {
    console.error("GROQ API error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch Groq response" });
  }
}





