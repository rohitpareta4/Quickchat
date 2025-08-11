// "use client"
// import React from 'react';
// import { useMutation } from '@tanstack/react-query';
// import { useState } from 'react';
// import { signupform } from '@/app/api/page';

// const Signup = () => {

//   const [fullname,setFullName]=useState('');
//   const [email,setEmail]=useState('')
//   const [password,setPassword]=useState('');

//   const mutation=useMutation({
//     mutationFn:signupform,
//     onSuccess:(data)=>{
//       console.log('data is',data)
//     }
//   })

//   const handlesubmit=(e)=>{
//     e.preventDefault();
//      const formdata={
//       fullname:fullname,
//       email:email,
//       password:password
//      }
//      mutation.mutate(formdata)
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
//       <form className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md flex flex-col gap-5" onSubmit={handlesubmit}>
//         <h2 className="text-2xl font-bold text-center text-blue-700">Create Account</h2>

//         <input
//           type="text"
//           name="name"
//           placeholder="Name"
//           value={fullname}
//           onChange={(e)=>setFullName(e.target.value)}
//           className="p-3 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//         />

//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e)=>setEmail(e.target.value)}
//           className="p-3 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//         />

//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e)=>setPassword(e.target.value)}
//           className="p-3 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//         />

//         <button
//           type="submit"
//           className="bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 rounded-md transition-all duration-300"
//         >
//           Sign Up
//         </button>

//         <p className="text-sm text-gray-500 text-center">
//           Already have an account? 
//         </p>
//       </form>
//     </div>
//   );
// };

// export default Signup;


// {/* <a href="/auth/login" className="text-blue-600 hover:underline">Log in</a> */}


"use client"
import React from 'react';
import toast from 'react-hot-toast';
import { QueryClient, useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { signupform } from '@/app/api/page';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';

const Signup = () => {
  const queryClient=useQueryClient()
  const [fullname, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router=useRouter()

  const mutation = useMutation({
    mutationFn: signupform,
    onSuccess: (data) => {
          toast.success('signup succesfully...')
      console.log('data is', data);
      queryClient.invalidateQueries({ queryKey: ['me'] });
      router.push('/auth/login')
    }
  });

  const handlesubmit = (e) => {
    e.preventDefault();
    const formdata = {
      fullname: fullname,
      email: email,
      password: password
    };
    mutation.mutate(formdata);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <form 
        className="bg-gray-800 shadow-xl rounded-xl p-8 w-full max-w-md flex flex-col gap-5 backdrop-blur-sm bg-opacity-80 border border-gray-700 transition-all duration-300 hover:shadow-2xl" 
        onSubmit={handlesubmit}
      >
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-purple-400 via-pink-500 to-blue-400 bg-clip-text text-transparent">
          Join Us Today
        </h2>

        <div className="space-y-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="text-sm font-medium text-gray-300">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="John Doe"
              value={fullname}
              onChange={(e) => setFullName(e.target.value)}
              className="p-3 bg-gray-700 text-gray-100 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 placeholder-gray-400"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm font-medium text-gray-300">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="john@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-3 bg-gray-700 text-gray-100 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 placeholder-gray-400"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-sm font-medium text-gray-300">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-3 bg-gray-700 text-gray-100 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 placeholder-gray-400"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={mutation.isPending}
          className="mt-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold p-3 rounded-md transition-all duration-300 shadow-lg hover:shadow-purple-500/30 flex items-center justify-center gap-2"
        >
          {mutation.isPending ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating Account...
            </>
          ) : (
            'Sign Up'
          )}
        </button>

        <p className="text-sm text-gray-400 text-center mt-4">
          Already have an account?{' '}
          <button onClick={()=>router.push('/auth/login')} className="text-purple-400 hover:text-purple-300 underline transition-colors duration-200">
            Login
          </button>
        </p>
      </form>
    </div>
  );
};

export default Signup;