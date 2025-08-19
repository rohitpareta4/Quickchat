// "use client";
// import { useRouter } from 'next/navigation';
// import { useQuery } from '@tanstack/react-query';
// import { getloggeduser, logoutuser } from '@/app/api/page';
// import { useMutation } from '@tanstack/react-query';
// import { useQueryClient } from '@tanstack/react-query';
// import Link from 'next/link';
// import { socketdata } from '@/socket';
// import NotificationsIcon from '@mui/icons-material/Notifications';
// import { useChatstore } from '@/app/store/useChatstore';
// import { useEffect } from 'react';
// import { useState } from 'react';
// import CloseIcon from '@mui/icons-material/Close';
// import { useMemo } from 'react';
// import DeleteIcon from '@mui/icons-material/Delete';
// import MenuIcon from '@mui/icons-material/Menu';
// import Navmobileicon from '../Navmobileicon/page';
// import Notification from '../Notification/page';

// // import { findNotifUser } from '@/app/api/page';

// const Navbar = () => {
//   const router = useRouter();
//   const queryClient = useQueryClient();

//   const [shownotif,setShownotif]=useState(false)
//   const [openhamIcon,setOpenhamIcon]=useState(false)

//   const {disconnectSocket}=socketdata()

//    const {notifications,users,getusersnotif,setselecteduser,deleteNotif,selectedUser,seen,getinstantData,removeMssg }=useChatstore()

//   const { data, isLoading,isSuccess } = useQuery({
//     queryKey: ['me'],
//     queryFn: getloggeduser,
  
//   });

//   console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",seen)


//   useEffect(() => {
//   if (data?._id) {
//     getinstantData(); 
//     const fetchNotifications = async () => {
//         await getusersnotif(data._id);
//       };
//       fetchNotifications();
//   }
//   return () => {
//     removeMssg();             // Clean up listeners on unmount
//   };
// }, [data?._id]);

//   console.log("notifiiiiiiiii...................",notifications)


// const shownotifications = useMemo(() => {
//   const notificationsmap = {};

//   // Ensure currentUser exists
//   if (!data?._id) return 0;

//   for (let i = 0; i < notifications.length; i++) {
//     const notif = notifications[i];

//     // ✅ Only process notifications for currentUser
//     if (notif.recieverId !== data?._id) continue;

//     const senderId = notif.senderId;
//     if (!notificationsmap[senderId]) {
//       notificationsmap[senderId] = [];
//     }
//     notificationsmap[senderId].push(notif);
//   }

//   return notificationsmap;
// }, [notifications, data]);

// console.log("..................",shownotifications)
// const len=Object.keys(shownotifications).length;


 
//   const usermap=useMemo(()=>{//use for checking which user send mssg
//     const map={}
//     for(let i=0;i<users.length;i++){
//       map[users[i]._id]=users[i];
//     }
//     return map;
//   })


//   const deleteNotification=(id)=>{
//      deleteNotif(id)
//   }

//   const notif=async()=>{
//      const fresh = await getusersnotif(data?._id);
//   if (fresh?.length > 0) {
//     setShownotif(true);
//   } else {
//     setShownotif(true); // Or leave this out if you don't want to show empty state
//   }
//   }


//   const mutation = useMutation({
//     mutationFn: logoutuser,
//     onSuccess: async() => {
//       disconnectSocket();
//      await queryClient.setQueryData(['me'],null)
//       queryClient.invalidateQueries({ queryKey: ['me'] });
//        toast.success('logout succesfully...')
//     },
//   });

//   const logoutusers = () => {
//     mutation.mutate({});
//   };

//   if (isLoading) return <p className='flex justify-center items-center'>
//       <svg className="animate-spin h-40 w-40 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
//                 </svg>
//   </p>;

//   return (

//     // bg-gray-800 ml-20 w-[calc(100%-80px)] flex items-center justify-between px-6 py-4 shadow-lg border-b border-gray-500 sticky top-4 z-50 rounded-2xl mx-auto  backdrop-blur-sm bg-opacity-90

//     // bg-gray-800 ml-20  w-[calc(100%-80px)] flex items-center justify-between px-6 py-4 shadow-lg border-2 border-white sticky top-0 z-100 rounded-bl-2xl rounded-br-2xl
 
//     <nav className='bg-gray-800 sm:ml-20 w-full  sm:w-[calc(100%-80px)] flex items-center justify-between px-6 py-4 shadow-lg border-2 border-gray-700 shadow-lg sticky top-4 z-100 rounded-bl-2xl rounded-br-2xl'>
//       <div className='flex items-center'>
//         <h2 className='text-white text-base sm:text-2xl font-bold tracking-wide transform hover:scale-105 transition-transform duration-300 cursor-pointer' onClick={()=>router.push('/')}>
//           BAATCHEET
//           <span className='text-indigo-400 text-sm ml-1'>✉️</span>
//         </h2>
//       </div>

//     <div className='flex items-center justify-center sm:hidden gap-2'>
//      <div>
//       <Notification shownotif={shownotif} setShownotif={setShownotif}/>
//      </div>
//  <p className='h-10 w-10 text-white'><MenuIcon onClick={()=>setOpenhamIcon(true)}/></p>
//        <Navmobileicon setOpenhamIcon={setOpenhamIcon} openhamIcon={openhamIcon}/>
//     </div>



//       <div className='sm:flex items-center space-x-4 hidden'>
//   {/* Notification Bell */}
//   {/* <span className='relative'>
//     <NotificationsIcon onClick={notif}  className='text-[yellow] cursor-pointer' style={{ fontSize: '35px' }} />
//   </span> */}
//   <div className="relative cursor-pointer" onClick={notif}>
//   <NotificationsIcon className="text-[yellow]" style={{ fontSize: '35px' }} />
//   {len > 0 && (
//     <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full animate-ping-slow">
//       {len}
//     </span>
//   )}
// </div>

  
  
// {shownotif && (
//     <div className="fixed inset-0  z-50 flex justify-center items-center bg-black/60 backdrop-blur-sm px-4">
//       <div className="relative w-full max-w-2xl h-[400px] bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl shadow-2xl ring-1 ring-gray-700/50 text-white overflow-hidden animate-fadeIn">
        
//         {/* Close Button */}
//         <div className="absolute top-4 right-4 cursor-pointer text-gray-400 hover:text-white transition">
//           <CloseIcon onClick={() => setShownotif(false)} />
//         </div>

//         {/* Header */}
//         <div className="text-center text-xl font-semibold py-4 border-b border-gray-700">
//           Notifications
//         </div>

//         {/* Notifications List */}
// <div className="overflow-y-auto max-h-[300px] p-4 space-y-4">
//   {notifications.length === 0 ? (
//     <p className="text-center text-gray-400">No new notifications</p>
//   ) : (
//     // notifications.map((notif, idx) => {
//       Object.entries(shownotifications).map(([Sender,mssg])=>{
//         const fmsssg=mssg[0]
//       const sender = usermap[Sender];
//       return (
//         <div key={Sender} className="bg-gray-700 p-3 rounded-xl shadow flex justify-between items-start gap-4">
//           <div>
//             <p className="font-semibold text-white">
//               {sender?.fullname}
//             </p>
//           <div className="flex gap-3 items-start justify-between">
//   <div className="flex-1">
//     <p className="text-sm text-gray-300 line-clamp-2">{fmsssg.text}</p>
//     <button className="mt-1 text-xs text-blue-400 hover:text-blue-500 transition-all cursor-pointer">
//       See more
//     </button>
//   </div>
// </div>

//           </div>
//           <button onClick={() => deleteNotification(Sender)} className="text-red-400 hover:text-red-600">
//             <DeleteIcon />
//           </button>
//         </div>
//       );
//     })
//   )}
// </div>
// {/* notif.senderId */}
       
//       </div>
//     </div>
//   )}

  

//   {/* Auth Buttons */}
//   {data ? (
//     <>
//       {isLoading ? (
//         <p>
//           <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//           </svg>
//         </p>
//       ) : (
        
//         <p onClick={() => router.push('/auth/profilepage')} className='text-white cursor-pointer font-bold bg-[blue] p-2 rounded-2xl'>
//           {data.fullname}
//         </p>
       
        
//       )}

//       {mutation.isPending ? (
//         <p>logging off...</p>
//       ) : (
//         <button
//           className='bg-red-600 hover:bg-red-500 text-white font-medium py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-md'
//           onClick={logoutusers}
//         >
//           Logout
//         </button>
//       )}
//     </>
//   ) : (
//     <>
//       <button
//         className='bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-md'
//         onClick={() => router.push('/auth/signup')}
//       >
//         Sign Up
//       </button>
//       <Link href="/auth/login">
//         <button className='border-2 border-indigo-400 hover:bg-indigo-400 hover:text-gray-900 text-white font-medium py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105'>
//           Login
//         </button>
//       </Link>
//     </>
//   )}
// </div>

//     </nav>
//   );
// };

// export default Navbar;



"use client";
import AccessAlarmRoundedIcon from '@mui/icons-material/AccessAlarmRounded';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getloggeduser, logoutuser } from '@/app/api/page';
import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { socketdata } from '@/socket';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useChatstore } from '@/app/store/useChatstore';
import { useEffect } from 'react';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useMemo } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
// import MenuIcon from '@mui/icons-material/Menu';
import Navmobileicon from '../Navmobileicon/page';
import Notification from '../Notification/page';
import Schedule from '../schedule/page';
// import LoadingScreen from '../animation/page';
// import Image from 'next/image';

// import { findNotifUser } from '@/app/api/page';

const Navbar = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [shownotif,setShownotif]=useState(false)
  const [openhamIcon,setOpenhamIcon]=useState(false)
  const [Scheduleopen,setScheduleOpen]=useState(false)
  const [showusers,setShowusers]=useState(false)

  const {disconnectSocket}=socketdata()

   const {notifications,users,getusersnotif,setselecteduser,deleteNotif,selectedUser,seen,getinstantData,removeMssg }=useChatstore()

  const { data,isLoading } = useQuery({
    queryKey: ['me'],
    queryFn: getloggeduser,
  });


  const mutation = useMutation({
    mutationFn: logoutuser,
    onSuccess: async() => {
      disconnectSocket();
     await queryClient.setQueryData(['me'],null)
      queryClient.invalidateQueries({ queryKey: ['me'] });
       toast.success('logout succesfully...')
    },
  });

  const logoutusers = () => {
    mutation.mutate({});
  };

  const showAllusers=()=>{
     setShowusers(true)
  }

  // if(isLoading){
  //   return <LoadingScreen/>
  // }

  // if(!data) return <p className='text-[white] bg-[yellow] h-60'>heyyy</p>


  // if (isLoading) return <p className='flex justify-center items-center'>
  //     <svg className="animate-spin h-40 w-40 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
  //                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
  //                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
  //               </svg>
  // </p>;

  //  <img className='h-16 text-2xl' src="/chatlogo.png"/>


  //  <h2 className='text-white text-base sm:text-2xl font-bold tracking-wide transform hover:scale-105 transition-transform duration-300 cursor-pointer' onClick={()=>router.push('/')}>
  //         BAATCHEET
  //       </h2>



  // <img className='h-20 sm:h-16 mt-2 sm:mt-0 w-auto object-contain transform scale-150 pl-2 sm:pl-0' src="/chatlogo.png"/>

  return (

    // bg-gray-800 ml-20 w-[calc(100%-80px)] flex items-center justify-between px-6 py-4 shadow-lg border-b border-gray-500 sticky top-4 z-50 rounded-2xl mx-auto  backdrop-blur-sm bg-opacity-90

    // bg-gray-800 ml-20  w-[calc(100%-80px)] flex items-center justify-between px-6 py-4 shadow-lg border-2 border-white sticky top-0 z-100 rounded-bl-2xl rounded-br-2xl
 
    <nav className='bg-gray-800 md:ml-20 mx-2 my-2 sm:mx-0 sm:my-0 h-20  md:w-[calc(100%-80px)] flex items-center justify-between p-2 sm:px-6 sm:py-4 shadow-lg border-2 border-gray-700 shadow-lg sticky top-2 sm:top-4 z-100 rounded-bl-2xl rounded-br-2xl'>
      <div className='flex items-center'>
        <h2 className='text-white text-base sm:text-2xl font-bold tracking-wide transform hover:scale-105 transition-transform duration-300 cursor-pointer' onClick={()=>router.push('/')}>
          <img className='h-20 sm:h-16 mt-2 sm:mt-0 w-auto object-contain transform scale-150 pl-2 sm:pl-0' src="/chatlogo.png"/>
        </h2>
        {/* <span className='text-indigo-400 text-sm ml-1 hidden sm:block'>✉️</span> */}
      </div>

   <div className="flex items-center sm:hidden gap-4 py-2 bg-slate-800 rounded-xl shadow-md  w-fit ">
  {/* Notification Icon */}
  <div className="text-white">
    <Notification shownotif={shownotif} setShownotif={setShownotif} />
  </div>

  <div>
    <button className='md:hidden text-gray-400 cursor-pointer' onClick={showAllusers}><AccessAlarmRoundedIcon className='text-pink-500' style={{ fontSize: '36px' }} /></button>
    <Schedule showusers={showusers} setShowusers={setShowusers}/>

  </div>

  {/* Hamburger Icon */}
  {!data?<div className=''>
     <Link href="/auth/login">
        <button className='border-2 border-indigo-400 hover:bg-indigo-400 hover:text-gray-900 text-white font-medium py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105'>
          Login
        </button>
      </Link>
  </div>:
  <div>
  <button
    className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-700 hover:bg-slate-600 transition"
    onClick={() => setOpenhamIcon(true)}
  >
  <img src={data?.profilepic?
    `${process.env.NEXT_PUBLIC_API_URL}/images/uploads/${data?.profilepic}`
    :`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAACUCAMAAAAj+tKkAAAAYFBMVEX///8AAADl5eVGRkb8/PwEBARDQ0P39/dcXFzx8fHIyMhmZmbr6+vd3d2wsLBsbGyfn5+MjIwcHByCgoJ8fHxPT08XFxfT09Opqalzc3MwMDCTk5MhISEmJibBwcG6urrqeUXtAAADLElEQVR4nO2ai46qMBBAWxgobwVEUXb1//9yW1+7iLQ1Wqa5d06yGxMS9+wMnemLMYIgCIIgCIIgCIIgCIIgiDcBAAZ/PgKuzoSLXVoEQZECY77pnSmrTdKFYZdsqoD55Shd0lPH/9AdU78Us4Q/kGQeGUK9ffTjfFt741espnqKVYFtpgAmJum9p1n4kGWRz/lxngtsOxnBNefRrOEaOYLyz++a+QBy3uxw/WRD6zTxk486hlptgJW6+ClK1HECsDEJbnCnDUFsEgxxi2H2pIWM2WaogmuTn6w0mH7mV1C9hJiCmi5yI8cUnG/DvySY7c57Qe9TDK1ZsEUt1L1ZsMf0Y5l2LqNocAt1EZoEkVsdq3mkm25FfECe9QdcY6ieBMjTLbbXZ3iPHEA5Yz3o/A4lqt6ZSidYYdupGNbzfrUH62K5cL+8huOhEqkBsvdi4S6nDMPE78zgwbJdIYPUP2koTe/N9hYwCCb7R6vAG78LZR3eF1DbsPagvIyRwQqy9T4Jw2S/znyLnmK8Pvduk5/4T4DLy+fx+wf3X54iUoknDe7GNV6irNq8C2NJ2OVtVYrRY0Skgdj1+WQbbpv3O+GDIBNVfnicbl0+H/IKN90qOkX9NT9f5fyrLhhaGFX7Hb51eorvAa8xwzHWLTrPuZZP4yOS3/kMMTKti9VDhFNF2TAy4wb/L3G28PwGAHquO6MbB1L+9LCoIcytk+YNB7GcoPxL7Qt6V8V2wcEsLDZWp7TLVe3hlrdXIiizvIicfNct9n2f0y8xlsFwhK2j2S3xGqYWZyNzJKljOfX/WxzPzbNhbuuh/PLdO36cO04ygEzwS8N3TCST7DaC+v1UGxzvucILM4TnxG7H8eldP85PLv1sjl9NODyeBYujOTNN5mwgA2g29O2p3Y3j1Hh0aEPoqp2oIq1fItkQuSvWwLQ38WwFI2c3adRNt4/QuRIE4z0oGyLeuCk0wMq383tVdHVl7wNt5IKrZmJxk8wOV6PkI2Va4egKuM1VNztaJ34MDNcT7Nk7iSCINg4/QlyDk0IDRfAhCletzsevIgiCIAiCIAiCIAiCIAji3+UHpMYf4vVuQrkAAAAASUVORK5CYII=`
  }/>
    {/* <MenuIcon className="text-white" /> */}
  </button>
  </div>
}

  {/* Mobile Navigation */}
  
  <Navmobileicon setOpenhamIcon={setOpenhamIcon} openhamIcon={openhamIcon} />
  

</div>




      <div className='sm:flex items-center space-x-4 hidden'>
  {/* Notification Bell */}
  <Notification shownotif={shownotif} setShownotif={setShownotif}/>

  <div>
    <button className='bg-pink-600 text-[white] font-semibold hidden md:block rounded-full py-2 px-4 cursor-pointer' onClick={showAllusers}>⏰ Schedule Message</button>
    {/* <button className='md:hidden text-gray-400 cursor-pointer' onClick={showAllusers}><AccessAlarmRoundedIcon className='text-pink-500' style={{ fontSize: '36px' }} /></button> */}
    <div>
    <Schedule showusers={showusers} setShowusers={setShowusers}/>
    </div>
  </div>
  

  {/* Auth Buttons */}
  {data ? (
    <>
      {isLoading ? (
        <p>
          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </p>
      ) : (
        
        <p onClick={() => router.push('/auth/profilepage')} className='text-white cursor-pointer font-bold bg-blue-800 p-2 rounded-2xl'>
          {data?.fullname}
        </p>
       
        
      )}

      {mutation?.isPending ? (
        <p>logging off...</p>
      ) : (
        <button
          className='bg-red-600 hover:bg-red-500 text-white font-medium py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-md'
          onClick={logoutusers}
        >
          Logout
        </button>
      )}
    </>
  ) : (
    <>
      <button
        className='bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-md'
        onClick={() => router.push('/auth/signup')}
      >
        Sign Up
      </button>
      <Link href="/auth/login">
        <button className='border-2 border-indigo-400 hover:bg-indigo-400 hover:text-gray-900 text-white font-medium py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105'>
          Login
        </button>
      </Link>
    </>
  )}
</div>



    </nav>






  );
};

export default Navbar;


