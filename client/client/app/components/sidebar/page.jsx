// "use client"
// import { useChatstore } from "@/app/store/useChatstore";
// import { socketdata } from "@/socket";
// import { useEffect, useMemo, useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { sendsrch } from "@/app/api/page";
// import CloseIcon from '@mui/icons-material/Close';
// import { getloggeduser } from "@/app/api/page";

// const Sidebar = ({setSrch,srch}) => {

//     const { data } = useQuery({
//       queryKey: ['me'],
//       queryFn: getloggeduser,
    
//     });

//   const { users, getusers,setselecteduser,selectedUser,seenMessage,checkIsseen,getinstantData,removeMssg,seen } = useChatstore();
//   const {onlineusers}=socketdata()

//   // alert(selectedUser?._id)

//   console.log("allusers&&&&&&&&&&&&&&&",users)

//   const [showusers,setShowusers]=useState(false)
//   const [showonline,setShowonline]=useState(false)
  
//   const [isopen,setIsopen]=useState(true)

//   const opensrch=()=>{
//     setIsopen(false)
//     setSrch('')
//     setTimeout(() => {
//       setIsopen(true)
//     }, 1000);
//   }

// console.log("newonlineusers",onlineusers)

// //online users
// const newonlineUsers=new Map()
//   for(let i=0;i<onlineusers.length;i++){
//     newonlineUsers.set(onlineusers[i],i);
//   }
// let allonline=users.filter((user)=>newonlineUsers.has(user._id))
// console.log("allonline^^^^^^^^^^^^^^^",allonline) 

//   const {data:srchdata}=useQuery({
//     queryKey:['srch',srch],
//     queryFn:()=>sendsrch(srch),
//     enabled:!!srch
//   })



// //   useEffect(()=>{
// //     if(selectedUser?._id){
// //       // alert("useee",selectedUser?._id)
// //  seenMessage(selectedUser?._id)
// //     checkIsseen(selectedUser?._id)
// //     }
// //   },[selectedUser?._id])


//   useEffect(()=>{

//       if(data?._id && selectedUser?._id){
      
//         getinstantData()
//         // checkIsseen(selectedUser?._id)
//       }
//       return ()=>{
//           removeMssg()
//       }
//   },[data?._id,selectedUser?._id])

  
//   const selectuser=(item)=>{
//     setselecteduser(item)
//     setSrch('')
//   }

//   useEffect(() => {
//     getusers();
//   }, [getusers]);

//   const getallusers=()=>{
//     setShowusers(true)
//     setShowonline(false)
//   }

//   console.log("onlineusers",showonline)
//   console.log("showusers",showusers)

//   const getonlineusers=()=>{
//     setShowonline(true)
//     setShowusers(false)
//   }

//   console.log("updateonline",onlineusers)

//   console.log("selectedUser....................!!!!!!!!!!!!!!!!!!!!!!!!!",typeof(selectedUser))
//   console.log("selectedUser....................!!!!!!!!!!!!!!!!!!!!!!!!!",selectedUser)


//   if (!users) return <p className="text-white text-center mt-4">Loading...</p>;

//   return (
//     <div className="bg-gray-900 border border-gray-700  shadow-lg p-4 w-full  ">
//       <div className="flex items-center justify-between mb-4 px-1">
//         <h1 className="text-white text-2xl font-semibold">Contacts</h1>
//         <span className="text-xl">📩</span>
//       </div>
     
//       <div className="flex gap-4 p-2">
//         <h1 onClick={getallusers} className={`rounded-full font-semibold  text-white cursor-pointer p-2 ${showusers?"bg-[green]":"bg-[blue]"}`}>All</h1>
//         <h1 onClick={getonlineusers} className={`rounded-full text-white font-semibold cursor-pointer p-2 ${showonline?"bg-[green]":"bg-[blue]"}`}>Online</h1>
//       </div>

//       <div className="py-4 space-y-2 relative">
//         <input type="text" value={srch} onChange={(e)=>setSrch(e.target.value)} placeholder="Search..." className="border-yellow border-2 text-white p-4 rounded-full w-full font-semibold"/>
      


// {srchdata?.length>0 && isopen?(
//    <div className="space-y-2 bg-gray-800 w-full  border-gray absolute border-2 rounded-lg p-2">
//     <div className="flex justify-between">
//     <span className="text-white">chats</span>
//     <span onClick={opensrch} className="text-white cursor-pointer"><CloseIcon/></span>
//     </div>
//     {srchdata?.map((item,i)=>(
//        <div key={i} onClick={()=>selectuser(item)} className="w-full bg-gray-800 border-2 border-gray-200 hover:bg-gray-700 cursor-pointer rounded-lg p-2 text-white">
        
//           <p className="text-white">{item.fullname}</p>
//        </div>
//     ))}
//     </div>
//     ):<p></p>}
//     </div>

// {/* setselecteduser */}
//       <div className="space-y-3 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
//         {showusers && users.map((item) => (
//               <div
//             key={item._id} onClick={()=>selectuser(item)}
//             className="flex items-center gap-3 p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all duration-200 border border-transparent hover:border-gray-600 cursor-pointer"
//           >
        
        
//             <img
//               className="h-10 w-10 rounded-full object-cover border-2 border-purple-400 shadow-sm"
//               src={
//                 item.profilepic
//                   ? `http://localhost:5000/images/uploads/${item.profilepic}`
//                   : "data:image/jpeg;base64,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"
//               }
//               alt="Profile"
//             />
//             <h2 className="text-white font-medium truncate">{item.fullname}</h2>
          
          
//           </div>
//         ))}

//              {!showusers && !showonline && users.map((item) => (
//               <div
//             key={item._id} onClick={()=>setselecteduser(item)}
//             className="flex items-center gap-3 p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all duration-200 border border-transparent hover:border-gray-600 cursor-pointer"
//           >
        
        
//             <img
//               className="h-10 w-10 rounded-full object-cover border-2 border-purple-400 shadow-sm"
//               src={
//                 item.profilepic
//                   ? `http://localhost:5000/images/uploads/${item.profilepic}`
//                   : "data:image/jpeg;base64,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"
//               }
//               alt="Profile"
//             />
//             <h2 className="text-white font-medium truncate">{item.fullname}</h2>
          
          
//           </div>
//         ))}

//         {showonline && allonline.map((it,i)=>(
//           <div key={i} onClick={()=>setselecteduser(it)} className="flex gap-2 border-2 items-center bg-gray-800 hover:bg-gray-700 p-2 rounded-lg cursor-pointer">
//             <div className="">
//                <img className="h-10 w-10 rounded-full object-cover border-2 border-purple-400 shadow-sm" src={
//                 it.profilepic?`http://localhost:5000/images/uploads/${it.profilepic}`
//                 :"data:image/jpeg;base64,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"
//                }/>
//             </div>
//             <div>
//               <h1 className="text-white">{it.fullname}</h1>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Sidebar;



"use client"
import { useChatstore } from "@/app/store/useChatstore";
import { socketdata } from "@/socket";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { sendsrch } from "@/app/api/page";
import CloseIcon from '@mui/icons-material/Close';
import { getloggeduser } from "@/app/api/page";
import { motion, AnimatePresence } from "framer-motion";

const Sidebar = ({ setSrch, srch }) => {
  const { data } = useQuery({
    queryKey: ['me'],
    queryFn: getloggeduser,
  });

  const { users, getusers, setselecteduser, selectedUser, seenMessage, checkIsseen, getinstantData, removeMssg, seen } = useChatstore();
  const { onlineusers } = socketdata();

  const [showusers, setShowusers] = useState(false);
  const [showonline, setShowonline] = useState(false);
  const [isopen, setIsopen] = useState(true);
  const [isHovering, setIsHovering] = useState(null);

  const opensrch = () => {
    setIsopen(false);
    setSrch('');
    setTimeout(() => {
      setIsopen(true);
    }, 1000);
  };

  // Online users
  const newonlineUsers = new Map();
  for (let i = 0; i < onlineusers.length; i++) {
    newonlineUsers.set(onlineusers[i], i);
  }
  let allonline = users.filter((user) => newonlineUsers.has(user._id));

  const { data: srchdata } = useQuery({
    queryKey: ['srch', srch],
    queryFn: () => sendsrch(srch),
    enabled: !!srch
  });

  useEffect(() => {
    if (data?._id && selectedUser?._id) {
      getinstantData();
    }
    return () => {
      removeMssg();
    };
  }, [data?._id, selectedUser?._id]);

  const selectuser = (item) => {
    setselecteduser(item);
    setSrch('');
  };

  useEffect(() => {
    getusers();
  }, [getusers]);

  const getallusers = () => {
    setShowusers(true);
    setShowonline(false);
  };

  const getonlineusers = () => {
    setShowonline(true);
    setShowusers(false);
  };

  const defaultProfilePic = "data:image/jpeg;base64,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";

  if (!users) return (
    <div className="flex items-center justify-center h-full">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
    </div>
  );

  return (
    <div className="bg-gray-900 border border-gray-700 shadow-lg p-4 w-full h-full overflow-hidden flex flex-col">
      <div className="flex items-center justify-between mb-4 px-1">
        <h1 className="text-white text-2xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
          Contacts
        </h1>
        <span className="text-2xl animate-bounce">📩</span>
      </div>

      <div className="flex gap-4 p-2 mb-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={getallusers}
          className={`rounded-full font-semibold text-white cursor-pointer px-4 py-2 transition-all duration-300 ${
            showusers ? "bg-gradient-to-r from-green-500 to-teal-500 shadow-lg" : "bg-gradient-to-r from-blue-500 to-indigo-500"
          }`}
        >
          All
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={getonlineusers}
          className={`rounded-full text-white font-semibold cursor-pointer px-4 py-2 transition-all duration-300 ${
            showonline ? "bg-gradient-to-r from-green-500 to-teal-500 shadow-lg" : "bg-gradient-to-r from-blue-500 to-indigo-500"
          }`}
        >
          Online
        </motion.button>
      </div>

      <div className="py-4 md:py-0 space-y-2 relative">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="relative"
        >
          <input
            type="text"
            value={srch}
            onChange={(e) => setSrch(e.target.value)}
            placeholder="Search..."
            className="border-2 border-purple-400 text-white p-3 rounded-full w-full font-semibold bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 pl-10 md:hidden"
          />
          <span className="absolute left-3 top-3 text-gray-400 md:hidden">🔍</span>
        </motion.div>

        <AnimatePresence>
          {srchdata?.length > 0 && isopen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-2 bg-gray-800 w-full border-gray-600 border-2 rounded-lg p-2 absolute z-10 mt-2 shadow-xl"
            >
              <div className="flex justify-between items-center">
                <span className="text-white font-medium">Search Results</span>
                <motion.span
                  whileHover={{ rotate: 90 }}
                  onClick={opensrch}
                  className="text-white cursor-pointer"
                >
                  <CloseIcon />
                </motion.span>
              </div>
              {srchdata?.map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => selectuser(item)}
                  className="w-full bg-gray-800 border-2 border-gray-600 hover:bg-gray-700 cursor-pointer rounded-lg p-2 text-white transition-all duration-200"
                >
                  <div className="flex items-center gap-2">
                    <img
                      className="h-8 w-8 rounded-full object-cover border-2 border-purple-400"
                      src={item.profilepic ? `http://localhost:5000/images/uploads/${item.profilepic}` : defaultProfilePic}
                      alt="Profile"
                    />
                    <p className="text-white truncate">{item.fullname}</p>
                    
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex-1 overflow-y-auto pr-1 md:pl-2 lg:pl-0 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 space-y-3">
        <AnimatePresence>
          {showusers &&
            users.map((item) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                whileHover={{ scale: 1.02 }}
                onMouseEnter={() => setIsHovering(item._id)}
                onMouseLeave={() => setIsHovering(null)}
                onClick={() => selectuser(item)}
                className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 cursor-pointer ${
                  selectedUser?._id === item._id
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg"
                    : "bg-gray-800 hover:bg-gray-700"
                }`}
              >
                <div className="relative">
                  <img
                    className="h-10 w-10 rounded-full object-cover border-2 border-purple-400 shadow-sm"
                    src={
                      item.profilepic
                        ? `http://localhost:5000/images/uploads/${item.profilepic}`
                        : defaultProfilePic
                    }
                    alt="Profile"
                  />
                  {newonlineUsers.has(item._id) && (
                    <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-gray-800"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-white font-medium truncate">{item.fullname}</h2>
                  {isHovering === item._id && (
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-xs text-gray-400 truncate"
                    >
                      Click to chat
                    </motion.p>
                  )}
                </div>
              </motion.div>
            ))}

          {!showusers && !showonline &&
            users.map((item) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => setselecteduser(item)}
                className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 cursor-pointer ${
                  selectedUser?._id === item._id
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg"
                    : "bg-gray-800 hover:bg-gray-700"
                }`}
              >
                <div className="relative">
                  <img
                    className="h-10 w-10 rounded-full object-cover border-2 border-purple-400 shadow-sm"
                    src={
                      item.profilepic
                        ? `http://localhost:5000/images/uploads/${item.profilepic}`
                        : defaultProfilePic
                    }
                    alt="Profile"
                  />
                  {newonlineUsers.has(item._id) && (
                    <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-gray-800"></div>
                  )}
                </div>
                <h2 className="text-white font-medium truncate">{item.fullname}</h2>
              </motion.div>
            ))}

          {showonline &&
            allonline.map((it, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => setselecteduser(it)}
                className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 cursor-pointer ${
                  selectedUser?._id === it._id
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg"
                    : "bg-gray-800 hover:bg-gray-700"
                }`}
              >
                <div className="relative">
                  <img
                    className="h-10 w-10 rounded-full object-cover border-2 border-purple-400 shadow-sm"
                    src={it.profilepic ? `http://localhost:5000/images/uploads/${it.profilepic}` : defaultProfilePic}
                    alt="Profile"
                  />
                  <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-gray-800"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-white font-medium truncate">{it.fullname}</h2>
                  <p className="text-xs text-green-400">Online now</p>
                </div>
              </motion.div>
            ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Sidebar;
