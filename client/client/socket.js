


import { io } from "socket.io-client";
import {create} from 'zustand'

let _socket;
export const socketdata=create((set)=>({
onlineusers:[],
socket:null,
// newMssg:[],

connectsocket:(token,userid)=>{
    console.log("token type is",typeof(token))
    _socket=io("http://localhost:5000",{
        auth:{token},
        query:{userid},
        withCredentials:true
    })
    console.log("socketinfo",_socket)
   _socket.on("connect", () => {
  console.log("✅ Socket connected! ID:", _socket.id);
});

_socket.on("sendonlineusers",(data)=>{
    console.log("dataofonline",data)
    set({onlineusers:data})
})


_socket.on("hello", (msg) => {
  console.log("📨 Server says:", msg);
});

set({socket:_socket})

},

disconnectSocket:() => {
  if (_socket) _socket.disconnect();
  set({socket:null})
},  

getSocket:() => _socket
}))




