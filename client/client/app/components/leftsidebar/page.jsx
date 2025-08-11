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
                        src={`http://localhost:5000/images/uploads/${data?.profilepic}`}
                        alt="Profile"
                    />
                    <span className="absolute -right-1 -bottom-1 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-800"></span>
                </div>
            </div>
        </div>
    );
}

export default LeftSidebar;