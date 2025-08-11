import { useState,useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
// import SendIcon from '@mui/icons-material/Send';
import { useChatstore } from "@/app/store/useChatstore";
import { socketdata } from "@/socket";
import { buddy } from "@/app/api/page";
import { bothMssg } from "@/app/api/page";
import { useQuery } from "@tanstack/react-query";
import { getloggeduser } from "@/app/api/page";
import NorthIcon from '@mui/icons-material/North';
// import EmojiPicker from "emoji-picker-react";
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';


const MessageInput = ({isbuddyActive,setIsbuddyAcive,Showemojis,setShowEmojis,text,setText}) => {
  
  const [buddyloading,setBuddyLoading]=useState(false);
  const [disconnect,setDisconnect]=useState(false);
 

  // const [text, setText] = useState('');
  const [context,setContext]=useState([])
  // const [selectedId,setSelectedId]=useState(null)
  const { sendMessage,getinstantData,type,selectedUser,messages,sendnotif } = useChatstore();

    const { data:user } = useQuery({
      queryKey: ["me"],
      queryFn: getloggeduser,
    });

  const mutation = useMutation({
    mutationFn: sendMessage,
    onSuccess: () => {
      setText('');
      console.log('Message sent...');
    },
  });

  const notifmutation=useMutation({
    mutationFn:sendnotif,
  })



  const mutationbuddy = useMutation({
  mutationFn: buddy,
  onSuccess: async (data, variables) => {
const BOT_ID = "000000000000000000000001"



    const res1 = await bothMssg({
      senderId: user._id,
      recieverId: BOT_ID,
      ContextId:selectedUser._id,
      text: variables.text,
    });
    console.log("Stored bot message:", res1);

    const res2 = await bothMssg({
      senderId: BOT_ID,
      recieverId: user._id,
      ContextId:selectedUser._id,
      text:data?.choices[0]?.message?.content
    });
    console.log("Stored bot message:", res2);



    useChatstore.setState((state)=>({
      messages:[...state.messages,res1,res2]
    }))
  },
});


const showemoji=()=>{
   setShowEmojis(!Showemojis)
}


  const disconnectwithbuddy=()=>{
    setDisconnect(true)
    setTimeout(() => {
       setIsbuddyAcive(false)
      setDisconnect(false)
    }, 2000);
  }

  const connectedtobuddy=()=>{
        const conTextmessages=messages.map((msg)=>({
    role:'assistant',
    content:msg.text
  }))
  setContext(conTextmessages)
  setBuddyLoading(true);
  setTimeout(() => {
    setBuddyLoading(false)
    setIsbuddyAcive(true)
  }, 2000);
  
  }
  console.log("conTextmessages......;;;;;;;;;;",context)

  console.log("message>>>>>ofboth",messages.text)

  // .filter((msg)=>msg.senderId===selectedUser._id)

  useEffect(() => {
  // getinstantData(text);
    const socket = socketdata.getState().socket;
  const { selectedUser } = useChatstore.getState();

  if (!socket || !selectedUser) return;

  if (text.trim()) {
    socket.emit("typing", { to: selectedUser._id });
  } else {
    socket.emit("stopTyping", { to: selectedUser._id });
  }
}, [text]);


 
 


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    mutation.mutate({ text,selectedId:selectedUser._id });
    notifmutation.mutate({text,selectedId:selectedUser._id})
    setText('')
  };

  const handleSubmitbuddy=(e)=>{
     e.preventDefault();
    if (!text.trim()) return;
    mutationbuddy.mutate({text,context});
    setText('')
  }



// {/* <div className="w-full px-4 py-3 bg-gray-900 border-t border-gray-700"></div> */}

  return (
  <div className="w-full py-3 px-4 bg-gray-900 border-t border-gray-700">
  {isbuddyActive &&(
    <div className="">

     <form onSubmit={handleSubmitbuddy} className="flex items-center gap-3 ">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 rounded-full bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
        />
        <p className="text-white bg-[blue] hover:bg-blue-700 p-3 font-semibold rounded-full cursor-pointer">Connected</p>
<p className="text-white bg-[blue] hover:bg-blue-700 p-3 font-semibold rounded-full cursor-pointer" onClick={disconnectwithbuddy}>{disconnect===true?"disconnecting...":"Disconnect with buddy"}</p>
        <button
          type="submit"
          className="p-2 rounded-full bg-purple-600 hover:bg-purple-700 text-white transition"
        >
          <NorthIcon />
        </button>
      </form>


       <form onSubmit={handleSubmitbuddy} className="flex flex-col items-center gap-3 sm:hidden">
        <div>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 rounded-full bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
        />

        <button
          type="submit"
          className="p-2 rounded-full bg-purple-600 hover:bg-purple-700 text-white transition"
        >
          <NorthIcon />
        </button>
        </div>
        <div>

                <p className="text-white bg-[blue] hover:bg-blue-700 p-3 font-semibold rounded-full cursor-pointer">Connected</p>
<p className="text-white bg-[blue] hover:bg-blue-700 p-3 font-semibold rounded-full cursor-pointer" onClick={disconnectwithbuddy}>{disconnect===true?"disconnecting...":"Disconnect with buddy"}</p>
</div>
      </form>
      
      </div>
  )}
  {!isbuddyActive &&(
    <div>
      <form onSubmit={handleSubmit} className="sm:flex hidden items-center gap-3">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 rounded-full bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
        />
         <button
          type="button"
          className="p-2 rounded-full bg-purple-600 hover:bg-purple-700 text-white transition cursor-pointer"
          onClick={showemoji}
        >
          <EmojiEmotionsIcon />
        </button>
        <p className={`text-white bg-[blue] hover:bg-blue-700 p-3 font-semibold rounded-full cursor-pointer ${buddyloading ? "bg-blue-400 cursor-not-allowed" : "bg-[blue] hover:bg-blue-700 cursor-pointer"}`} onClick={()=>{if(!buddyloading)connectedtobuddy()}}>{buddyloading?"connecting...":"QuickTalk✨"}</p>
       
        <button
          type="submit"
          className="p-2 rounded-full bg-purple-600 hover:bg-purple-700 text-white transition"
        >
          <NorthIcon />
        </button>
        
      </form>


      <form onSubmit={handleSubmit} className="flex flex-col  gap-3  sm:hidden">
        <div className="flex gap-3">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 rounded-full bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
        />
         <button
          type="button"
          className="p-2 rounded-full bg-purple-600 hover:bg-purple-700 text-white transition cursor-pointer"
          onClick={showemoji}
        >
          <EmojiEmotionsIcon />
        </button>

       
        <button
          type="submit"
          className="p-2 rounded-full bg-purple-600 hover:bg-purple-700 text-white transition"
        >
          <NorthIcon />
        </button>
        </div>
        <div className="">

                <p className={`text-white w-full bg-[blue] hover:bg-blue-700 p-3 font-semibold rounded-full cursor-pointer ${buddyloading ? "bg-blue-400 cursor-not-allowed" : "bg-[blue] hover:bg-blue-700 cursor-pointer"}`} onClick={()=>{if(!buddyloading)connectedtobuddy()}}>{buddyloading?"connecting...":"QuickTalk✨"}</p>
        </div>
      </form>
</div>
       )}
    </div>
  );
};

export default MessageInput;

