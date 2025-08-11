"use client"
import { useChatstore } from "../store/useChatstore"
import Sidebar from "../components/sidebar/page"
import Nochatselected from "../components/Nochatselected/page"
import Chatcontainer from "../components/chatcontainer/page"
import Leftsidebar from "../components/leftsidebar/page"
import { useState } from "react"
import CloseIcon from '@mui/icons-material/Close';
import { useQuery } from "@tanstack/react-query"
import { sendsrch } from "../api/page"

const Homepage=()=>{
   const [isopen,setIsopen]=useState(false)
   const [srch,setSrch]=useState('')

    const {data:srchdata}=useQuery({
    queryKey:['srch',srch],
    queryFn:()=>sendsrch(srch),
    enabled:!!srch
  })

    const {selectedUser,setselecteduser}=useChatstore()

    const selectinguser=(item)=>{
     setselecteduser(item)
     setTimeout(() => {
      setIsopen(false)
      setSrch('')
     }, 1000);
     
    }

    return(
     <>
    <div className="">
{isopen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center
                  bg-black/40 backdrop-blur-sm px-4">

    {/* Modal panel */}
    
          <div className={`relative w-full max-w-2xl ${srch.length>0?'h-[360px]':'h-[160px]'}
                    bg-gradient-to-br bg-black-700
                    rounded-3xl shadow-2xl ring-1 ring-gray-700/50
                    text-white overflow-hidden`}>
  
    
    

      {/* Close button */}
      <button
        onClick={() => setIsopen(false)}
        className="absolute top-4 right-4 p-2 rounded-full
                   bg-gray-700/60 hover:bg-gray-600/80
                   text-gray-300 hover:text-white
                   transition duration-200 ease-in-out
                   focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <CloseIcon className="h-5 w-5" />
      </button>

      {/* Body */}
      <div className="p-6 pt-14">
        <input
          type="text"
          placeholder="🔍 Search user…"
          value={srch}
          onChange={(e) => setSrch(e.target.value)}
          className="w-full h-12 px-4 rounded-xl
                     bg-gray-700 placeholder-gray-400
                     text-white text-sm
                     focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Results */}
      <div className="px-6 pb-6 h-[calc(100%-120px)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
        {srchdata && srchdata.length > 0 ? (
          srchdata.map((item, i) => (
            <div
              key={i}
              onClick={() => selectinguser(item)}
              className="w-full mb-3 bg-gray-800 border border-gray-600
                         hover:bg-gray-700 transition-all duration-200
                         cursor-pointer rounded-xl p-3"
            >
              <p className="font-medium text-base">{item.fullname}</p>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-400 mt-4">
            {/* No results found. */}
          </div>
        )}
      </div>
    </div>
  </div>
)}



       <div className="grid grid-cols-20 sm:px-2 sm:mt-2 ">
     
          <div className="col-span-1 text-white hidden md:block">
           <Leftsidebar setIsopen={setIsopen} isopen={isopen}/>
          </div>
          {selectedUser?(
             <div className="md:block col-span-6 hidden">
            <Sidebar srch={srch} setSrch={setSrch}/>
         </div>
          ):<div className="md:col-span-6  col-span-20 ">
            <Sidebar srch={srch} setSrch={setSrch}/>
         </div> 
          }
        
        {selectedUser?(
<div className="md:col-span-13 col-span-20">
          {!selectedUser?<>
           <Nochatselected/>
          </>:
          <Chatcontainer/>
          }
         </div>
        ):<div className="hidden md:block col-span-13">
            {!selectedUser?<>
           <Nochatselected/>
          </>:
          <Chatcontainer/>
          }
          </div>}
          
       </div>
      </div>
     </>
    )
}

export default Homepage

