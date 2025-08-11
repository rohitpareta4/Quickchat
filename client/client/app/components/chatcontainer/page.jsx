// "use client";

// import { useChatstore } from "@/app/store/useChatstore";
// import { useEffect, useRef } from "react";
// import ChatHeader from "../chatheader/page";
// import MessageInput from "../MessageInput/page";
// import { useQuery } from "@tanstack/react-query";
// import { getloggeduser } from "@/app/api/page";
// import { useState } from "react";
// import toast from "react-hot-toast";
// import { useMemo } from "react";
// import EmojiPicker from "emoji-picker-react";
// // import { getmssg } from "@/app/api/page";

// const ChatContainer = () => {
//   const { data } = useQuery({
//     queryKey: ["me"],
//     queryFn: getloggeduser,
//   });

//    const [isbuddyActive,setIsbuddyAcive]=useState(false)
//     const [Showemojis,setShowEmojis]=useState(false)
//     const [text, setText] = useState('');

//   const {
//     messages,
//     getMessages,
//     isMessageLoading,
//     selectedUser,
//     getinstantData,
//     removeMssg,
//     type,
//     getBotMssg,
//     notifications,
//     seen,
//     checkIsseen

//   } = useChatstore();

//   console.log("yeahhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh",notifications)


//   console.log("messages..................",messages)
//   console.log("selectedUser**************",selectedUser)

//   const messageEndref=useRef()

//   console.log("messages#################",messages)

//   useEffect(() => {
//   messageEndref.current?.scrollIntoView({ behavior: "smooth" });
// }, [messages]);



//   useEffect(() => {
//      getMessages(selectedUser._id);
//     //  checkIsseen(selectedUser._id)
//     getinstantData();
//     return ()=>removeMssg()
//   }, [selectedUser?._id,getBotMssg,getMessages,getinstantData,removeMssg]);


// const seenMap = useMemo(() => {
//   if (!data?._id) return {};
//   console.log("calculating seenMap", seen, data?._id);
//   const map = {};
//   for (let s of seen) {
//     if (s.recieverId === data?._id) {//when sender selects the reciever profile's
//       map[s.senderId] = s;
//     }
//   }
//   return map;
// }, [seen, data?._id]);

// for(const [key,value] of Object.entries(seenMap)){
//   console.log("key.........",key)
//   console.log("values...........",value)
// }

// let obtainedLastMssg=null

// // const lastMssg=messages.length>0?messages[messages.length-1]:null
// for(let i=messages.length-1;i>=0;i--){
//   const lastMssg=messages[i];
//   if(lastMssg.senderId===data?._id && lastMssg.recieverId===selectedUser._id && !lastMssg.ContextId){
//    obtainedLastMssg=lastMssg;
//   break;
//   }
// }

// if(obtainedLastMssg){
//  console.log(obtainedLastMssg)
// }


//   console.log("^^^^^^^^^^^^*******************@@@@@@@@@@@@@@@@@@@@@@@@@@",seenMap)

//   return (
//     <div className="flex flex-col justify-between w-full h-[calc(100vh-120px)] bg-gray-900 text-white  shadow-lg overflow-hidden">
    
//       <ChatHeader />

    


//       {/* MESSAGES SECTION */}
//       <div className="flex-1 overflow-y-auto px-4 py-2 space-y-4">
//         {messages.map((item,i) => {
//           const isMe = item.senderId === data?._id;
//           return (
//             <div
//               key={i}
//               className={`flex ${isMe ? "justify-end " : "justify-start"}`}
//               ref={messageEndref}
//             >
//               <div
//                 className={`flex items-end space-x-2 max-w-xs sm:max-w-sm md:max-w-md ${
//                   isMe ? "flex-row-reverse gap-2" : ""
//                 }`}
//               >
//                 {/* PROFILE PIC */}
//                 <img
//                   className="w-10 h-10 rounded-full object-cover border border-gray-600"
//                   src={
//                     item.senderId === data?._id?data?.profilepic? `http://localhost:5000/images/uploads/${data?.profilepic}`
//                        : `data:image/jpeg;base64,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`
//                       : selectedUser?.profilepic
//                       ? `http://localhost:5000/images/uploads/${selectedUser?.profilepic}`
//                       : `data:image/jpeg;base64,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`
//                   }
//                   alt="user"
//                 />

//                 {/* MESSAGE BUBBLE */}
                
//                 <div
//                   className={`px-4 py-2 rounded-lg text-sm shadow-md ${
//                     isMe
//                       ? "bg-blue-600 text-white rounded-br-none"
//                       : "bg-gray-700 text-white rounded-bl-none"
//                   }`}
//                 >
//                  {item.text}
//                  </div>
//                 </div>

//                <div className="flex items-center">
//   {item.senderId === data?._id ? (
//     <div className="flex justify-end items-end">
//       {Object.entries(seenMap).map(([sender, seen]) => (
//         <div key={sender}>
//           <div className=" text-gray-300 text-lg">
//             {(obtainedLastMssg._id === item._id) ? "Seen" : ""}
//           </div>
//         </div>
//       ))}
//     </div>
//   ) : <></>}
// </div>


              
//                 </div>
              
            
//           );
//         })}
//         {type && selectedUser && (
//   <div className="text-sm text-gray-400 italic px-4">
//     {selectedUser.fullname} is typing...
//   </div>
// )}


//       </div>

//       <div className="h-10 w-full z-100 fixed">
//         {Showemojis && (
          
//            <EmojiPicker onEmojiClick={(data)=>{
//             setText(prev=>prev+data.emoji)
//            }}></EmojiPicker>
//         )}
//       </div>

//       {/* INPUT SECTION */}
//       <div className="border-t border-gray-700 px-4 py-3">
//         <MessageInput setIsbuddyAcive={setIsbuddyAcive} isbuddyActive={isbuddyActive} Showemojis={Showemojis} setShowEmojis={setShowEmojis} text={text} setText={setText}/>
//       </div>
//     </div>
//   );
// };

// export default ChatContainer;


"use client";
import { useChatstore } from "@/app/store/useChatstore";
import { useEffect, useRef } from "react";
import ChatHeader from "../chatheader/page";
import MessageInput from "../MessageInput/page";
import { useQuery } from "@tanstack/react-query";
import { getloggeduser } from "@/app/api/page";
import { useState } from "react";
import toast from "react-hot-toast";
import { useMemo } from "react";
import EmojiPicker from "emoji-picker-react";
import { motion, AnimatePresence } from "framer-motion";
// import { Drawer,Button, Box, Slide, Grow } from "@mui/material";
import Userprofilebox from "../userprofilebox/page";

const ChatContainer = () => {
  const { data } = useQuery({
    queryKey: ["me"],
    queryFn: getloggeduser,
  });

  const [isbuddyActive, setIsbuddyAcive] = useState(false);
  const [Showemojis, setShowEmojis] = useState(false);
  const [text, setText] = useState("");
  const [isScrolling, setIsScrolling] = useState(false);
  const [profile,setProfile]=useState(false)

  const {
    messages,
    getMessages,
    isMessageLoading,
    selectedUser,
    getinstantData,
    removeMssg,
    type,
    getBotMssg,
    notifications,
    seen,
    checkIsseen,
  } = useChatstore();

  const messageEndref = useRef();
  const messagesContainerRef = useRef();

  // Default profile pictures
  const defaultProfilePic = "data:image/jpeg;base64,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";
  const defaultUserPic = "data:image/jpeg;base64,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";

  useEffect(() => {
    messageEndref.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    getMessages(selectedUser._id);
    getinstantData();
    return () => removeMssg();
  }, [selectedUser?._id, getBotMssg, getMessages, getinstantData, removeMssg]);

  const seenMap = useMemo(() => {
    if (!data?._id) return {};
    const map = {};
    for (let s of seen) {
      if (s.recieverId === data?._id) {
        map[s.senderId] = s;
      }
    }
    return map;
  }, [seen, data?._id]);

  let obtainedLastMssg = null;
  for (let i = messages.length - 1; i >= 0; i--) {
    const lastMssg = messages[i];
    if (
      lastMssg.senderId === data?._id &&
      lastMssg.recieverId === selectedUser._id &&
      !lastMssg.ContextId
    ) {
      obtainedLastMssg = lastMssg;
      break;
    }
  }

  // Handle scroll events
  const handleScroll = () => {
    if (messagesContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
      setIsScrolling(scrollTop + clientHeight < scrollHeight - 50);
    }
  };

  // Scroll to bottom when new message arrives if not manually scrolling
  useEffect(() => {
    if (!isScrolling && messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages, isScrolling]);

  return (
    <div className="flex flex-col justify-between w-full  h-[calc(100vh-120px)] bg-gradient-to-br from-gray-900 to-gray-800 text-white shadow-lg overflow-hidden relative">
      <div className="">
        <Userprofilebox profile={profile} setProfile={setProfile}/>
      </div>
      {/* Chat Header */}
      <ChatHeader profile={profile} setProfile={setProfile}/>

      {/* Messages Section */}
      <div
        ref={messagesContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto px-4 py-2 space-y-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800"
      >
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center p-6 rounded-lg bg-gray-800 bg-opacity-50"
            >
              <h3 className="text-xl font-semibold mb-2">No messages yet</h3>
              <p className="text-gray-400">Start the conversation with {selectedUser?.fullname}</p>
            </motion.div>
          </div>
        )}

        {messages.map((item, i) => {
          const isMe = item.senderId === data?._id;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className={`flex ${isMe ? "justify-end" : "justify-start"}`}
              ref={messageEndref}
            >
              <div
                className={`flex items-end space-x-2 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl ${
                  isMe ? "flex-row-reverse gap-2" : ""
                }`}
              >
                {/* Profile Picture */}
                <motion.div whileHover={{ scale: 1.05 }}>
                  <img
                    className="w-10 h-10 rounded-full object-cover border-2 border-purple-500 shadow-md"
                    src={
                      item.senderId === data?._id
                        ? data?.profilepic
                          ? `http://localhost:5000/images/uploads/${data?.profilepic}`
                          : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAACUCAMAAAAj+tKkAAAAYFBMVEX///8AAADl5eVGRkb8/PwEBARDQ0P39/dcXFzx8fHIyMhmZmbr6+vd3d2wsLBsbGyfn5+MjIwcHByCgoJ8fHxPT08XFxfT09Opqalzc3MwMDCTk5MhISEmJibBwcG6urrqeUXtAAADLElEQVR4nO2ai46qMBBAWxgobwVEUXb1//9yW1+7iLQ1Wqa5d06yGxMS9+wMnemLMYIgCIIgCIIgCIIgCIIgiDcBAAZ/PgKuzoSLXVoEQZECY77pnSmrTdKFYZdsqoD55Shd0lPH/9AdU78Us4Q/kGQeGUK9ffTjfFt741espnqKVYFtpgAmJum9p1n4kGWRz/lxngtsOxnBNefRrOEaOYLyz++a+QBy3uxw/WRD6zTxk486hlptgJW6+ClK1HECsDEJbnCnDUFsEgxxi2H2pIWM2WaogmuTn6w0mH7mV1C9hJiCmi5yI8cUnG/DvySY7c57Qe9TDK1ZsEUt1L1ZsMf0Y5l2LqNocAt1EZoEkVsdq3mkm25FfECe9QdcY6ieBMjTLbbXZ3iPHEA5Yz3o/A4lqt6ZSidYYdupGNbzfrUH62K5cL+8huOhEqkBsvdi4S6nDMPE78zgwbJdIYPUP2koTe/N9hYwCCb7R6vAG78LZR3eF1DbsPagvIyRwQqy9T4Jw2S/znyLnmK8Pvduk5/4T4DLy+fx+wf3X54iUoknDe7GNV6irNq8C2NJ2OVtVYrRY0Skgdj1+WQbbpv3O+GDIBNVfnicbl0+H/IKN90qOkX9NT9f5fyrLhhaGFX7Hb51eorvAa8xwzHWLTrPuZZP4yOS3/kMMTKti9VDhFNF2TAy4wb/L3G28PwGAHquO6MbB1L+9LCoIcytk+YNB7GcoPxL7Qt6V8V2wcEsLDZWp7TLVe3hlrdXIiizvIicfNct9n2f0y8xlsFwhK2j2S3xGqYWZyNzJKljOfX/WxzPzbNhbuuh/PLdO36cO04ygEzwS8N3TCST7DaC+v1UGxzvucILM4TnxG7H8eldP85PLv1sjl9NODyeBYujOTNN5mwgA2g29O2p3Y3j1Hh0aEPoqp2oIq1fItkQuSvWwLQ38WwFI2c3adRNt4/QuRIE4z0oGyLeuCk0wMq383tVdHVl7wNt5IKrZmJxk8wOV6PkI2Va4egKuM1VNztaJ34MDNcT7Nk7iSCINg4/QlyDk0IDRfAhCletzsevIgiCIAiCIAiCIAiCIAji3+UHpMYf4vVuQrkAAAAASUVORK5CYII="
                        : selectedUser?.profilepic
                        ? `http://localhost:5000/images/uploads/${selectedUser?.profilepic}`
                        : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAACUCAMAAAAj+tKkAAAAYFBMVEX///8AAADl5eVGRkb8/PwEBARDQ0P39/dcXFzx8fHIyMhmZmbr6+vd3d2wsLBsbGyfn5+MjIwcHByCgoJ8fHxPT08XFxfT09Opqalzc3MwMDCTk5MhISEmJibBwcG6urrqeUXtAAADLElEQVR4nO2ai46qMBBAWxgobwVEUXb1//9yW1+7iLQ1Wqa5d06yGxMS9+wMnemLMYIgCIIgCIIgCIIgCIIgiDcBAAZ/PgKuzoSLXVoEQZECY77pnSmrTdKFYZdsqoD55Shd0lPH/9AdU78Us4Q/kGQeGUK9ffTjfFt741espnqKVYFtpgAmJum9p1n4kGWRz/lxngtsOxnBNefRrOEaOYLyz++a+QBy3uxw/WRD6zTxk486hlptgJW6+ClK1HECsDEJbnCnDUFsEgxxi2H2pIWM2WaogmuTn6w0mH7mV1C9hJiCmi5yI8cUnG/DvySY7c57Qe9TDK1ZsEUt1L1ZsMf0Y5l2LqNocAt1EZoEkVsdq3mkm25FfECe9QdcY6ieBMjTLbbXZ3iPHEA5Yz3o/A4lqt6ZSidYYdupGNbzfrUH62K5cL+8huOhEqkBsvdi4S6nDMPE78zgwbJdIYPUP2koTe/N9hYwCCb7R6vAG78LZR3eF1DbsPagvIyRwQqy9T4Jw2S/znyLnmK8Pvduk5/4T4DLy+fx+wf3X54iUoknDe7GNV6irNq8C2NJ2OVtVYrRY0Skgdj1+WQbbpv3O+GDIBNVfnicbl0+H/IKN90qOkX9NT9f5fyrLhhaGFX7Hb51eorvAa8xwzHWLTrPuZZP4yOS3/kMMTKti9VDhFNF2TAy4wb/L3G28PwGAHquO6MbB1L+9LCoIcytk+YNB7GcoPxL7Qt6V8V2wcEsLDZWp7TLVe3hlrdXIiizvIicfNct9n2f0y8xlsFwhK2j2S3xGqYWZyNzJKljOfX/WxzPzbNhbuuh/PLdO36cO04ygEzwS8N3TCST7DaC+v1UGxzvucILM4TnxG7H8eldP85PLv1sjl9NODyeBYujOTNN5mwgA2g29O2p3Y3j1Hh0aEPoqp2oIq1fItkQuSvWwLQ38WwFI2c3adRNt4/QuRIE4z0oGyLeuCk0wMq383tVdHVl7wNt5IKrZmJxk8wOV6PkI2Va4egKuM1VNztaJ34MDNcT7Nk7iSCINg4/QlyDk0IDRfAhCletzsevIgiCIAiCIAiCIAiCIAji3+UHpMYf4vVuQrkAAAAASUVORK5CYII="
                    }
                    alt="user"
                  />
                </motion.div>

                {/* Message Bubble */}
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className={`px-4 py-2 rounded-lg text-sm shadow-lg ${
                    isMe
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-br-none"
                      : "bg-gray-700 text-white rounded-bl-none"
                  }`}
                >
                  {item.text}
                </motion.div>
              </div>

              {/* Seen Status */}
              <div className="flex items-center">
                {item.senderId === data?._id ? (
                  <div className="flex justify-end items-end">
                    {Object.entries(seenMap).map(([sender, seen]) => (
                      <div key={sender}>
                        <div className="text-gray-300 text-xs">
                          {obtainedLastMssg?._id === item._id ? (
                            <motion.span
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="flex items-center gap-1"
                            >
                              <span>Seen</span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-3 w-3 text-blue-400"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </motion.span>
                          ) : null}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            </motion.div>
          );
        })}

        {/* Typing Indicator */}
        <AnimatePresence>
          {type && selectedUser && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 px-4 py-1"
            >
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
              </div>
              <span className="text-sm text-gray-400 italic">
                {selectedUser.fullname} is typing...
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Emoji Picker */}
      <AnimatePresence>
        {Showemojis && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="absolute bottom-16 left-0 right-0 z-50"
          >
            <EmojiPicker
              width="100%"
              height={350}
              onEmojiClick={(data) => {
                setText((prev) => prev + data.emoji);
              }}
              previewConfig={{ showPreview: false }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input Section */}
      <div className="border-t border-gray-700  bg-gray-800 bg-opacity-50 backdrop-blur-sm">
        <MessageInput
          setIsbuddyAcive={setIsbuddyAcive}
          isbuddyActive={isbuddyActive}
          Showemojis={Showemojis}
          setShowEmojis={setShowEmojis}
          text={text}
          setText={setText}
        />
      </div>

      {/* Scroll to bottom button */}
      {isScrolling && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            messageEndref.current?.scrollIntoView({ behavior: "smooth" });
            setIsScrolling(false);
          }}
          className="fixed bottom-20 right-4 bg-gray-700 p-2 rounded-full shadow-lg z-10"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.button>
      )}
    </div>
  );
};

export default ChatContainer;
