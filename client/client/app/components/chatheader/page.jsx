

"use client";
import { useChatstore } from "@/app/store/useChatstore";
import CloseIcon from '@mui/icons-material/Close';

const ChatHeader = ({profile,setProfile}) => {
  const { selectedUser,setselecteduser } = useChatstore();

  

  const closethetab=(e)=>{
    e.preventDefault()
    setselecteduser('')
  }

  

  const openprofile=()=>{
   setProfile(true)
  }

  return (
    <div className="w-full p-4 bg-gray-900  shadow-md border-b border-gray-800">
      {selectedUser ? (
        <div className="flex justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={openprofile}>
          <img
            className="h-10 w-10 rounded-full object-cover border-2 border-purple-400 shadow-sm"
            src={
              selectedUser.profilepic
                ? `http://localhost:5000/images/uploads/${selectedUser.profilepic}`
                : "data:image/jpeg;base64,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"
            }
            alt="Profile"
          />
          <div className="text-white text-lg font-semibold">
            {selectedUser.fullname}
          </div>
           </div>
           
          <div className="">
            <p className="cursor-pointer text-3xl"><CloseIcon className="text-white" onClick={closethetab}/></p>
          </div>
         

        </div>
      ) : (
        <div className="text-gray-400 text-sm italic">No user selected</div>
      )}
    </div>
  );
};

export default ChatHeader;








