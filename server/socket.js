import { Server } from "socket.io";
import http from 'http'
import express from 'express'
// import { Socket } from "dgram";

const app=express()

const server=http.createServer(app)

const io=new Server(server,{
    cors:{
        origin:["http://localhost:3000"],
        credentials:true
    }
})

let usersocketmap={}

let socketusermap={}

export const getrecieversocketId=(userId)=>{
   return usersocketmap[userId]
}


io.on("connection",(socket)=>{
    console.log("a user connected",socket.id)

    const userId=socket.handshake.query.userid;
    if(userId){
        usersocketmap[userId]=socket.id
        socketusermap[socket.id]=userId
    }
    io.emit('sendonlineusers',Object.keys(usersocketmap))


     socket.emit("hello", "Welcome to the socket server!");

    socket.on("disconnect",()=>{
        const userid=socketusermap[socket.id]
        if(userid){
          delete usersocketmap[userid]
          delete socketusermap[socket.id]
        }
      console.log("a user disconnected...",socket.id)
        
    io.emit('sendonlineusers',Object.keys(usersocketmap))
    })
})

export {io,app,server};