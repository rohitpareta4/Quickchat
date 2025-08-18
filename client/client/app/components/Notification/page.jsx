"use client"
import { useChatstore } from "@/app/store/useChatstore"
import { getloggeduser } from "@/app/api/page"
import { useQuery } from "@tanstack/react-query"
import { useEffect,useMemo, useState } from "react"
// import NotificationsIcon from '@mui/icons-material/Notifications';
import TextsmsIcon from '@mui/icons-material/Textsms';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';

const Notification=({shownotif,setShownotif})=>{

    const {data}=useQuery({
        queryKey:['me'],
        queryFn:getloggeduser
    })

  const {users,getinstantData,getusersnotif,removeMssg,notifications,deleteNotif,setselecteduser}=useChatstore()

  // const [closebell,setClosebell]=useState(false)

  const closethebell=()=>{
    setShownotif(false)
  }

  
    useEffect(() => {
    if (data?._id) {
      getinstantData(); 
      const fetchNotifications = async () => {
          await getusersnotif(data._id);
        };
        fetchNotifications();
    }
    return () => {
      removeMssg();             // Clean up listeners on unmount
    };
  }, [data?._id]);
  
    console.log("notifiiiiiiiii...................",notifications)
  
  
  const shownotifications = useMemo(() => {
    const notificationsmap = {};
  
    // Ensure currentUser exists
    if (!data?._id) return 0;
  
    for (let i = 0; i < notifications.length; i++) {
      const notif = notifications[i];
  
      // ✅ Only process notifications for currentUser

      console.log("...........notif...........",notif.recieverId,"............notif1...........",data?._id)
      if (notif.recieverId !== data?._id) continue;
  
      const senderId = notif.senderId;
      if (!notificationsmap[senderId]) {
        notificationsmap[senderId] = [];
      }
      notificationsmap[senderId].push(notif);
    }
  
    return notificationsmap;
  }, [notifications, data]);
  
  console.log("..................",shownotifications)
  let len=Object.keys(shownotifications).length;
  
  
   
    const usermap=useMemo(()=>{//use for checking which user send mssg
      const map={}
      for(let i=0;i<users.length;i++){
        map[users[i]._id]=users[i];
      }
      return map;
    })
  
  
    const deleteNotification=(id)=>{
       deleteNotif(id)
    }
  
    const notif=async()=>{
       const fresh = await getusersnotif(data?._id);
    if (fresh?.length > 0) {
      setShownotif(true);
    } else {
      setShownotif(true); // Or leave this out if you don't want to show empty state
    }
    if(len>0){
      len=0;
    }
    }

    const openuserbox=(item)=>{
       console.log('...............item............',item)
       setselecteduser(item)
    }

    return(
       <div className="">
            <div className="relative cursor-pointer" onClick={notif}>
            <TextsmsIcon className="text-pink-600" style={{ fontSize: '35px' }} />
            {len > 0 && (
              <span className={`absolute -top-1 -right-1 bg-red-600 text-white"} text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full animate-ping-slow`}>
                {len}
              </span>
            )}
          </div>
          
            {/* bg-black/40 backdrop-blur-sm */}

            {/* bg-gradient-to-br from-gray-800 to-gray-900 */}
            {/* bg-black/60 backdrop-blur-sm */}
            
          {shownotif && (
              <div className="fixed inset-0  z-50 flex justify-center bg-black/40 backdrop-blur-sm items-center  px-4">
            
                <div className="relative w-full max-w-2xl h-[400px]  rounded-3xl shadow-2xl ring-1 ring-gray-700/50 text-white overflow-hidden animate-fadeIn">
                  
                  {/* Close Button */}
                  <div className="absolute top-4 right-4 cursor-pointer text-gray-400 hover:text-white transition">
                    <CloseIcon onClick={closethebell}/>
                  </div>
          
                  {/* Header */}
                  <div className="text-center text-xl font-semibold py-4 border-b border-gray-700">
                    Notifications
                  </div>
          
                  {/* Notifications List */}
          <div className="overflow-y-auto max-h-[300px] p-4 space-y-4">
            {notifications.length === 0 ? (
              <p className="text-center text-gray-400">No new notifications</p>
            ) : (
              // notifications.map((notif, idx) => {
                Object.entries(shownotifications).map(([Sender,mssg])=>{
                  const fmsssg=mssg[0]
                const sender = usermap[Sender];
                return (
                  <div key={Sender} onClick={()=>openuserbox(sender)} className="bg-black/40 p-3 rounded-xl shadow flex justify-between items-start gap-4">
                    <div>
                      <p className="font-semibold text-white">
                        {sender?.fullname}
                      </p>
                    <div className="flex gap-3 items-start justify-between">
            <div className="flex-1">
              <p className="text-sm text-gray-300 line-clamp-2">{fmsssg.text}</p>
              <button className="mt-1 text-xs text-blue-400 hover:text-blue-500 transition-all cursor-pointer">
                See more
              </button>
            </div>
          </div>
          
                    </div>
                    <button onClick={() => deleteNotification(Sender)} className="text-red-400 hover:text-red-600">
                      <DeleteIcon />
                    </button>
                  </div>
                );
              })
            )}
          </div>
          {/* notif.senderId */}
                 
                </div>
              </div>
            )}
       </div>
    )
}
export default Notification
