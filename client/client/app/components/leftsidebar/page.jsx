// import { useQuery } from "@tanstack/react-query";
// import { getloggeduser } from "@/app/api/page";
// import GroupIcon from '@mui/icons-material/Group'; 
// import TripOriginSharpIcon from '@mui/icons-material/TripOriginSharp';
// import SearchSharpIcon from '@mui/icons-material/SearchSharp';
// import { useRouter } from "next/navigation";

// import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

// const leftsidebar=()=>{

//     const router=useRouter()

//  const { data } = useQuery({
//     queryKey: ['me'],
//     queryFn: getloggeduser,
//   });


//   return(
//     <div className="bg-gray-700 w-20 h-9/12 rounded-tr-2xl rounded-br-2xl flex flex-col items-center justify-between py-2">
//         <div className="flex flex-col gap-y-2">
//  <div className="">
//             <span><GroupIcon style={{ fontSize: '40px',color:"gray" }}/></span>
//         </div>
        
//         <div className="">
//             <span><TripOriginSharpIcon style={{ fontSize: '40px',color:"gray" }}/></span>
//         </div>
//          <div className="">
//             <span><SearchSharpIcon style={{ fontSize: '40px',color:"gray" }}/></span>
//         </div>
//         </div>
//         <div className="flex flex-col gap-y-2 items-center">
//          <div className="">
//             <span><PowerSettingsNewIcon style={{ fontSize: '50px',color:"gray" }}/></span>
//         </div>
//         <div>
//             <img onClick={()=>router.push('/auth/profilepage')} className="w-12 h-12 rounded-full object-cover border-4 border-indigo-300 shadow-md transition-transform group-hover:scale-105 cursor-pointer" src={`http://localhost:5000/images/uploads/${data?.profilepic}`}/>
//         </div>
//     </div>
//     </div>
//   )
// }
// export default leftsidebar

"use client"
import { useQuery } from "@tanstack/react-query";
import { getloggeduser } from "@/app/api/page";
import GroupIcon from '@mui/icons-material/Group'; 
import TripOriginSharpIcon from '@mui/icons-material/TripOriginSharp';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import { useRouter } from "next/navigation";
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { useState } from "react";

const LeftSidebar = ({setIsopen,isopen}) => {
    const router = useRouter();

   

    const { data } = useQuery({
        queryKey: ['me'],
        queryFn: getloggeduser,
    });

    const srchbox=()=>{
     setIsopen(true)
    }

    return (
        <div className="fixed left-0 top-0 h-screen bg-gray-800 w-20 flex flex-col items-center justify-between py-6 border-r border-gray-700 shadow-xl">
            {/* Top Navigation Icons */}
            <div className="flex flex-col gap-y-8 items-center">
                <div 
                    className="p-3 rounded-xl bg-gray-700 hover:bg-indigo-600 transition-all duration-300 cursor-pointer group"
                    title="Groups"
                >
                    <GroupIcon className="text-gray-300 group-hover:text-white" style={{ fontSize: '28px' }}/>
                </div>
                
                <div 
                    className="p-3 rounded-xl hover:bg-gray-700 transition-all duration-300 cursor-pointer group"
                    title="Chats"
                >
                    <TripOriginSharpIcon className="text-gray-400 group-hover:text-indigo-400" style={{ fontSize: '28px' }}/>
                </div>
                
                <div 
                    className="p-3 rounded-xl hover:bg-gray-700 transition-all duration-300 cursor-pointer group"
                    title="Search"
                >
                    <SearchSharpIcon onClick={srchbox} className="text-gray-400 group-hover:text-indigo-400" style={{ fontSize: '28px' }}/>
                </div>

            </div>


            
            {/* Bottom Profile Section */}
            <div className="flex flex-col gap-y-8 items-center">
                <div 
                    className="p-3 rounded-xl hover:bg-gray-700 transition-all duration-300 cursor-pointer group"
                    title="Logout"
                >
                    <PowerSettingsNewIcon className="text-gray-400 group-hover:text-red-400" style={{ fontSize: '28px' }}/>
                </div>
                
                <div className="group relative">
                    <img 
                        onClick={() => router.push('/auth/profilepage')} 
                        className="w-12 h-12 rounded-full object-cover border-2 border-indigo-500 hover:border-indigo-300 shadow-lg transition-all duration-300 hover:scale-110 cursor-pointer"
                        src={
                            data?.profilepic?
                            `${process.env.NEXT_PUBLIC_API_URL}/images/uploads/${data?.profilepic}`
                            :`data:image/png;base64,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`
                        }
                        alt="Profile"
                    />
                    <span className="absolute -right-1 -bottom-1 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-800"></span>
                </div>
            </div>
        </div>
    );
}

export default LeftSidebar;