

// "use client";
// import React, { useState } from "react";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { getloggeduser, addingbio } from "@/app/api/page";

// const ProfilePage = () => {
//   const [image, setImage] = useState('');
//   const [addbio, setAddbio] = useState('');
//   const [fullname, setFullName] = useState('');
//   const queryclient = useQueryClient();

//   const { data, isLoading } = useQuery({
//     queryKey: ["me"],
//     queryFn: getloggeduser,
//   });

//   const mutation = useMutation({
//     mutationFn: addingbio,
//     onSuccess: () => {
//       setAddbio('');
//       setFullName('');
//       queryclient.invalidateQueries({ queryKey: ['me'] });
//     }
//   });

//   const handlesubmit = (e) => {
//     e.preventDefault();
//     const formdata = new FormData();
//     formdata.append('bio', addbio);
//     formdata.append('fullname', fullname);
//     if (image) formdata.append('profilepic', image);
//     mutation.mutate(formdata);
//   };

//   if (isLoading) return <p className="flex justify-center items-center">
//     <svg className="animate-spin h-40 w-40 text-blue" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
//                 </svg>
//   </p>;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center px-4">
//       <div className="w-full max-w-md bg-gray-900 bg-opacity-60 backdrop-blur-md rounded-2xl shadow-2xl p-8 transform transition duration-300 hover:scale-[1.01] border border-gray-700">
//         <form onSubmit={handlesubmit}>
//           <div className="flex flex-col items-center text-center">
//             {data.profilepic ? (
//               <div className="relative group">
//                 <img
//                   className="w-28 h-28 rounded-full object-cover border-4 border-indigo-500 shadow-md transition-transform group-hover:scale-105"
//                   src={`http://localhost:5000/images/uploads/${data.profilepic}`}
//                   alt="Profile"
//                 />
//                 <label htmlFor="my-file" className="text-indigo-300 font-bold cursor-pointer mt-2 block">
//                   Change pic
//                 </label>
//                 <input
//                   type="file"
//                   id="my-file"
//                   onChange={(e) => setImage(e.target.files[0])}
//                   className="hidden"
//                 />
//               </div>
//             ) : (
//               <input
//                 type="file"
//                 onChange={(e) => setImage(e.target.files[0])}
//                 className="w-28 h-28 rounded-full object-cover border-4 border-purple-300 shadow-md"
//               />
//             )}

//             <h2 className="mt-4 text-3xl font-bold text-white">{data?.fullname}</h2>
//             <p className="text-sm text-gray-400">{data?.email}</p>
//           </div>

//           <div className="mt-6 border-t border-gray-700 pt-4">
//             <h3 className="text-lg font-semibold text-indigo-300 mb-2">Account Info</h3>
//             <ul className="text-gray-300 text-sm space-y-2">
//               <li><strong>About:</strong> <span className="break-all">{data?.bio || 'No bio added yet.'}</span></li>
//             </ul>
//             <textarea
//               placeholder="Add your bio..."
//               className="w-full mt-2 p-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-indigo-500"
//               value={addbio}
//               onChange={(e) => setAddbio(e.target.value)}
//             />
//             <div className="flex items-center gap-2 mt-4">
//               <label className="text-indigo-300 font-semibold">Update Name:</label>
//               <input
//                 className="flex-1 p-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 type="text"
//                 value={fullname}
//                 onChange={(e) => setFullName(e.target.value)}
//                 placeholder="Enter new name"
//               />
//             </div>
//           </div>

//           <div className="mt-6 text-center">
//             <button
//               type="submit"
//               className="inline-flex items-center gap-2 justify-center px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-full shadow-lg transition-all duration-200"
//             >
//               {mutation.isPending ? (
//                 <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
//                 </svg>
//               ) : (
//                 <>Edit Profile</>
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;


"use client";
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getloggeduser, addingbio } from "@/app/api/page";
import { motion } from "framer-motion";

const ProfilePage = () => {
  const [image, setImage] = useState('');
  const [addbio, setAddbio] = useState('');
  const [fullname, setFullName] = useState('');
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: getloggeduser,
  });

  const mutation = useMutation({
    mutationFn: addingbio,
    onSuccess: (data) => {
      console.log("///////////////////////////>>>>>>>>>>>>>>>>>>>>",data)
      setAddbio('');
      setFullName('');
      queryClient.invalidateQueries({ queryKey: ['me'] });
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append('bio', addbio);
    formdata.append('fullname', fullname);
    if (image) formdata.append('profilepic', image);
    mutation.mutate(formdata);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <svg className="animate-spin h-16 w-16 text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] flex items-center justify-center px-2 md:py-4">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md bg-[#1e1e2f] rounded-3xl shadow-2xl border border-[#3a3a4d] p-8 text-white"
      >
        <form onSubmit={handleSubmit}>
          {/* Profile Picture */}
          <div className="flex flex-col items-center text-center">
            {/* {data.profilepic ? ( */}
              <div className="relative group">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  className="w-28 h-28 rounded-full object-cover border-4 border-indigo-500 shadow-lg"
                  src={data?.profilepic?
                    `http://localhost:5000/images/uploads/${data?.profilepic}`
                    :`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAACUCAMAAAAj+tKkAAAAYFBMVEX///8AAADl5eVGRkb8/PwEBARDQ0P39/dcXFzx8fHIyMhmZmbr6+vd3d2wsLBsbGyfn5+MjIwcHByCgoJ8fHxPT08XFxfT09Opqalzc3MwMDCTk5MhISEmJibBwcG6urrqeUXtAAADLElEQVR4nO2ai46qMBBAWxgobwVEUXb1//9yW1+7iLQ1Wqa5d06yGxMS9+wMnemLMYIgCIIgCIIgCIIgCIIgiDcBAAZ/PgKuzoSLXVoEQZECY77pnSmrTdKFYZdsqoD55Shd0lPH/9AdU78Us4Q/kGQeGUK9ffTjfFt741espnqKVYFtpgAmJum9p1n4kGWRz/lxngtsOxnBNefRrOEaOYLyz++a+QBy3uxw/WRD6zTxk486hlptgJW6+ClK1HECsDEJbnCnDUFsEgxxi2H2pIWM2WaogmuTn6w0mH7mV1C9hJiCmi5yI8cUnG/DvySY7c57Qe9TDK1ZsEUt1L1ZsMf0Y5l2LqNocAt1EZoEkVsdq3mkm25FfECe9QdcY6ieBMjTLbbXZ3iPHEA5Yz3o/A4lqt6ZSidYYdupGNbzfrUH62K5cL+8huOhEqkBsvdi4S6nDMPE78zgwbJdIYPUP2koTe/N9hYwCCb7R6vAG78LZR3eF1DbsPagvIyRwQqy9T4Jw2S/znyLnmK8Pvduk5/4T4DLy+fx+wf3X54iUoknDe7GNV6irNq8C2NJ2OVtVYrRY0Skgdj1+WQbbpv3O+GDIBNVfnicbl0+H/IKN90qOkX9NT9f5fyrLhhaGFX7Hb51eorvAa8xwzHWLTrPuZZP4yOS3/kMMTKti9VDhFNF2TAy4wb/L3G28PwGAHquO6MbB1L+9LCoIcytk+YNB7GcoPxL7Qt6V8V2wcEsLDZWp7TLVe3hlrdXIiizvIicfNct9n2f0y8xlsFwhK2j2S3xGqYWZyNzJKljOfX/WxzPzbNhbuuh/PLdO36cO04ygEzwS8N3TCST7DaC+v1UGxzvucILM4TnxG7H8eldP85PLv1sjl9NODyeBYujOTNN5mwgA2g29O2p3Y3j1Hh0aEPoqp2oIq1fItkQuSvWwLQ38WwFI2c3adRNt4/QuRIE4z0oGyLeuCk0wMq383tVdHVl7wNt5IKrZmJxk8wOV6PkI2Va4egKuM1VNztaJ34MDNcT7Nk7iSCINg4/QlyDk0IDRfAhCletzsevIgiCIAiCIAiCIAiCIAji3+UHpMYf4vVuQrkAAAAASUVORK5CYII=`
                  }
                  alt="Profile"
                />
                <label htmlFor="my-file" className="text-indigo-400 font-semibold cursor-pointer mt-2 block">
                  Change picture
                </label>
                <input
                  type="file"
                  id="my-file"
                  onChange={(e) => setImage(e.target.files[0])}
                  className="hidden"
                />
              </div>
          

            {/* User Name & Email */}
            <h2 className="mt-4 text-3xl font-bold text-white">{data?.fullname}</h2>
            <p className="text-sm text-gray-400">{data?.email}</p>
          </div>

          {/* Bio + Fullname Fields */}
          <div className="mt-6 border-t border-gray-700 pt-4">
            <h3 className="text-lg font-semibold text-indigo-300 mb-2">Account Info</h3>
            <ul className="text-gray-300 text-sm space-y-2">
              <li><strong>About:</strong> <span className="break-words">{data?.bio || 'No bio added yet.'}</span></li>
            </ul>

            <textarea
              placeholder="Add or update your bio..."
              className="w-full mt-3 p-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-indigo-500 transition"
              value={addbio}
              onChange={(e) => setAddbio(e.target.value)}
            />

            <div className="md:flex items-first gap-2 mt-4 flex-col">
              <label className="text-indigo-300 font-semibold">Update Name:</label>
              <input
                className="flex-1 p-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                type="text"
                value={fullname}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter new name"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-6 text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="inline-flex items-center gap-2 justify-center px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-full shadow-lg transition-all duration-200"
            >
              {mutation.isPending ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : (
                <>Update Profile</>
              )}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ProfilePage;



