"use client"
import { useMutation } from "@tanstack/react-query";
import { useChatstore } from "@/app/store/useChatstore";
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useState } from "react";
import { sendscheduleMssg } from "@/app/api/page";
import { DateTime } from "luxon";
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import EmojiPicker from "emoji-picker-react";



const Schedule = ({ showusers, setShowusers }) => {
  const { users } = useChatstore();

  const [showdropdown,setShowdropdown]=useState(null)
  const [showtimer,setShowtimer]=useState(false)
  const [scheduletext,setScheduletext]=useState('')
  const [scheduletime,setScheduletime]=useState('')
  const [showEmojiPicker,setShowEmojiPicker]=useState(false)

  const mutation=useMutation({
    mutationFn:sendscheduleMssg,
    onSuccess:(data)=>{
        console.log(data)
    }
  })


  const toggleshowdrop=(idx)=>{
    if(showdropdown===idx){
        setShowdropdown(null)
        setShowtimer(false)
    }
    else{
    setShowdropdown(idx)
    }
  }

  const showtime=()=>{
    setShowtimer(true)
  }


  const handleschedule=(e,id)=>{
    e.preventDefault()
    console.log('............time.........',typeof(new Date(scheduletime).toISOString()))
    console.log('...............id.............',id)
    const fixedTime = DateTime.fromISO(scheduletime, { zone: 'Asia/Kolkata' })

  console.log('Fixed time in ISO........................:', fixedTime.toUTC().toISO())
   mutation.mutate({
    recieverId:id,
    scheduleMssg:scheduletext,
    scheduletime:new Date(scheduletime).toISOString()
   })

   setScheduletext('')
   setScheduletime('')
   setTimeout(() => {
    setShowusers(false)
   }, 1000);

  }
//  bg-gradient-to-br from-gray-800 to-gray-900
// bg-black/40 backdrop-blur-sm px-4
  return (
    showusers ? (
      <div className="fixed inset-0 z-50 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="relative w-full max-w-2xl h-[500px] bg-black/40 backdrop-blur-sm  rounded-3xl shadow-2xl ring-1 ring-gray-700/50 text-white overflow-hidden animate-fadeIn">
          
          {/* Close Button */}
          <div
            className="absolute right-4 top-4 cursor-pointer text-white hover:text-red-400"
            onClick={() => setShowusers(false)}
          >
            <CloseIcon />
          </div>

          {/* Header */}
          <div className="text-xl font-semibold p-6 border-b border-gray-700">
            Select User to Schedule Message
          </div>

          {/* User List */}
          <div className="overflow-y-auto max-h-[400px] p-4 space-y-3">
            {users?.map((item, i) => (
              <div
                key={i}
                // onClick={()=>toggleshowdrop(i)}
                className="flex flex-col justify-between items-center gap-4 p-3 bg-black/20 border-2 border-gray-700 rounded-lg transition"
                // bg-white/10 hover:bg-white/20
              >
                <div className="flex justify-between w-full">
                <div className="flex items-center gap-2">
                <img
                  src={
                    item?.profilepic
                      ? `http://localhost:5000/images/uploads/${item?.profilepic}`
                      : `data:image/png;base64,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` // placeholder
                  }
                  alt="Profile"
                  className="rounded-full h-12 w-12 object-cover border-2 border-white"
                />
                <p className="text-lg font-medium text-pink-300">
                  {item.fullname}
                </p>
                </div>
                <div className="">{showdropdown===i?<KeyboardArrowUpIcon onClick={()=>toggleshowdrop(i)}/>:<KeyboardArrowDownIcon onClick={()=>toggleshowdrop(i)}/>}
                </div>
                </div>
                <div className="w-full">
        {showdropdown===i?(
           <form onSubmit={(e)=>handleschedule(e,item._id)}>
                        <div className="flex flex-col gap-2">
                    {/* <div className="">{`schedule Message for ${item.fullname}`}</div> */}
                    <div className="flex justify-between items-center">
              <div className="md:flex-row gap-3 w-full flex flex-col space-y-2 md:space-y-0 ">
  <div className="relative flex items-center md:w-2/3 w-full">
  <textarea
    placeholder={`Schedule Message for ${item.fullname}...`}
    value={scheduletext}
    onChange={(e) => setScheduletext(e.target.value)}
    className="h-16 w-full p-3 pr-10 text-xs font-light rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none text-white md:font-semibold"
  />
  <EmojiEmotionsIcon
    onClick={() => setShowEmojiPicker((prev) => !prev)}
    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-yellow-400 hover:text-yellow-500"
  />
  {showEmojiPicker && (
    <div className="absolute top-15 w-full right-0 z-50">
      <EmojiPicker
        onEmojiClick={(emojiData) =>
          setScheduletext((prev) => prev + emojiData.emoji)
        }
      />
    </div>
  )}
</div>


      <div className="md:w-1/3 w-full flex items-center justify-center bg-[pink] font-semibold border border-dashed border-gray-300 rounded-md text-gray-600 text-sm p-4 cursor-pointer" onClick={showtime}>
        {/* Replace this with a datetime picker later */}
        {showtimer?(
           <input type="datetime-local" value={scheduletime} onChange={(e)=>setScheduletime(e.target.value)}/>
        ):(<h1>Set Timer ⏰</h1>)}
      </div>

           
    </div>
    
                    </div>
         <div className="bg-[blue] p-2 rounded-xl flex items-center justify-center">
        <button type="submit" className="text-[white] font-semibold cursor-pointer">SEND</button>
        </div>
                    </div>
                    </form>
                ):(<div></div>)}


                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ) : null
  );
};

export default Schedule;


