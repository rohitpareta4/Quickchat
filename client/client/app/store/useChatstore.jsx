import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "axios";
import { socketdata } from "@/socket";

export const useChatstore=create((set,get)=>({
    messages:[],
    notifications:[],
    seen:[],
    users:[],
    selectedUser:null,
    isUserLoading:false,
    isMessageLoading:false,
    type:false,


    




    getusers:async()=>{
        set({isUserLoading:true});
        try {
            const res=await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/message/user`,{withCredentials:true})
            set({users:res.data})
        } catch (error) {
            toast.error(error.response.data.message)
        }
    },


    getMessages:async(userId)=>{
        // console.log("userId!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",userId)
       set({isMessageLoading:true});
       try {
        const res=await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/message/${userId}`,{withCredentials:true})
        set({messages:res.data})
       } catch (error) {
            toast.error(error.response.data.message)
       }
    },
    setselecteduser:(selectedUser)=>set({selectedUser}),

    sendMessage:async(mssgdata)=>{
        console.log("mssgdata****************&&&&&&&&&&&&&",mssgdata)
       const {selectedUser,messages}=get()
       console.log("selecteduserId........................",selectedUser)
       console.log("selecteduserId#######################",selectedUser._id)

       try {
          const res=await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/message/send/${mssgdata.selectedId}`,mssgdata,{withCredentials:true})
          set({messages:[...messages,res.data]})
          

          console.log("msssgdata%%%%%%%%%%%%%%%",res.data)
       } catch (error) {
            toast.error(error.response.data.message)
       }
    },

    sendnotif:async(notifdata)=>{
        const {notifications}=get()
        console.log("notifdata.......",notifdata)
        console.log("notifdata.............",notifdata)
       try {
        const res=await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/message/notif/${notifdata.selectedId}`,notifdata,{withCredentials:true})
        set({notifications:[...notifications,res.data]})
       } catch (error) {
            toast.error(error.response.data.message)
       }
    },

    getusersnotif:async(id)=>{
        try {
            const res=await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/message/getnotif/${id}`,{withCredentials:true})
            set({notifications:res.data})
        } catch (error) {
            toast.error(error.response.data.message)
        }
    },

    deleteNotif:async(id)=>{
        const {notifications}=get()
             set((state) => ({
      notifications: state.notifications.filter((notif) => notif.senderId !== id),
    }));
      try {
        console.log("id>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",id)
            const res=await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/message/deleteNotif/${id}`,{withCredentials:true})
            console.log("done")
             
            return res.data
      } catch (error) {
            toast.error(error.response.data.message)
      }
    },

    seenMessage:async(id)=>{
        
        try {
            const res=await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/message/seen/${id}`,{},{withCredentials:true})
            set({seen:[...seen,res.data]})
            return res.data
            console.log("seenBy_________________________________..................",res.data)
        } catch (error) {
            console.log(error)
        }
    },

    checkIsseen:async(id)=>{
      // alert("id...............",id)
      alert(id)
       try {
            const res=await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/message/isSeen/${id}`,{withCredentials:true})
            set({seen:res.data})
            return res.data
       } catch (error) {
        console.log(error)
       }
    },


   


getinstantData: () => {
  const { selectedUser } = get();
//   const currentUser = get().currentUser;
  const socket = socketdata.getState().socket;
  if (!socket) return;

   let userInteracted = false;

window.addEventListener('click', () => {
  userInteracted = true;
});

  // ✅ Always listen for notifications (regardless of selectedUser)
  socket.on("sendNotification", (data) => {
  
    console.log("🔔 New notification via socket:", data);
    set((state) => ({
      notifications: [...state.notifications, data],
    }));

     if (userInteracted) {
    const audio = new Audio('/notiff.mp3');
    audio.play();
  }

  });

  socket.on("seenMssg",(data)=>{
    // alert('yeahhh')
      set((state)=>({
        seen:[...state.seen,data]
      }))
  })

  // ✅ Only listen for messages if selectedUser is available
  if (selectedUser) {
    socket.on("sendingmssg", (data) => {
      console.log("💬 New message via socket:", data);
      set((state) => ({
        messages: [...state.messages, data],
      }));
    });
  }
},

    
     removeMssg:()=>{
       const socket=socketdata.getState().socket
       if (!socket) return;
       socket.off("sendingmssg")
       socket.off("sendNotification")
    }

}))




//    socket.on("seenMssg",(data)=>{
//     console.log("seen!!!!!!!!!!!!!!!!!!!!!!!",data)
//     set((state)=>({
//         seen:[...state.seen,data]
//     }))
//    })


//   getinstantData:()=>{
//        const {selectedUser}=get()
//        const socket=socketdata.getState().socket
//        if(!selectedUser || !socket) return;

//        socket.on("sendingmssg",(data)=>{
//       console.log("new socket message",data)
//        set((state) => ({
//        messages: [...state.messages, data],
     
//   }));
  
// })
//    socket.on("sendNotification",(data)=>{
//     alert('notiiiii')
//     console.log("sendNotification???????????????????",data)
//     set((state)=>({
//         notifications:[...state.notifications,data]
//     }))
//     toast.success("new notif..............")
//    })

//    socket.on("seenMssg",(data)=>{
//     console.log("seen!!!!!!!!!!!!!!!!!!!!!!!",data)
//     set((state)=>({
//         seen:[...state.seen,data]
//     }))
//    })


//     },




