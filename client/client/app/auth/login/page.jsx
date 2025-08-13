"use client"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { loginform } from "@/app/api/page"
import { useRouter } from "next/navigation"
import { useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { socketdata } from "@/socket"
import { useEffect } from "react"

const login=()=>{

  const queryClient=useQueryClient()

  const {connectsocket,onlineusers}=socketdata()

  console.log("updatedlive",onlineusers)

 // ✅ Reactively logs when updated

    const router=useRouter()

    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    const mutation=useMutation({
        mutationFn:loginform,
        onSuccess:async(data)=>{
          console.log('token',data?.token)
          connectsocket(data?.token,data?._id)
         await queryClient.invalidateQueries({queryKey:['me']})
          toast.success('login succesfully...')
          router.push('/')
        }
    })

    const handlesubmit=(e)=>{
        e.preventDefault()
        const newformdata={
            email:email,
            password:password
        }
        mutation.mutate(newformdata)
    }

    return(
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
              login...
            </>
          ) : (
            'login'
          )}
        </button>

        <p className="text-sm text-gray-400 text-center mt-4">
          Don’t have an account?{' '}
          <button onClick={()=>router.push('/auth/signup')} className="text-purple-400 hover:text-purple-300 underline transition-colors duration-200">
            signup
          </button>
        </p>
      </form>
    </div>
    )
}

export default login