import { AirportShuttle } from "@mui/icons-material";
import axios from "axios"
// import { headers } from "next/headers";

const apikeys= process.env.GROQ_API_KEY

export const signupform=async(formdata)=>{
    console.log("formdata",formdata)
    try {
        const res=await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`,formdata);
        console.log(res.data)
        return res.data
    } catch (error) {
        console.log('error is occur',error.messsage)
    }
}

export const loginform=async(loginformdata)=>{
    console.log("formdata",loginformdata)
    try {
        const res=await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,loginformdata,{ withCredentials: true });
        console.log("loggeddata",res.data)
        return res.data
    } catch (error) {
        console.log('error is occur',error.message)
    }
}
export const getloggeduser=async()=>{
    // console.log("formdata",loginformdata)
    try {
        const res=await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`,{ withCredentials: true });
        console.log(res.data)
        return res.data
    } catch (error) {
        console.log('error is occur',error.message)
        throw error
    }
}

export const addingbio=async(formdata)=>{
    try {
       console.log('profield',formdata)
      const res=await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/addbio`,formdata
        ,{withCredentials: true ,
          headers:{ 
        'Content-Type': 'multipart/form-data',
      }
    }
      );
        console.log(res.data)
        return res.data
    } catch (error) {
           console.log('error is occur',error.message)
        throw error
    }
}


export const logoutuser=async({})=>{
    // console.log("formdata",loginformdata)
    try {
        const res=await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`,{},{ withCredentials: true });
        console.log("loggeddata",res.data)
        return res.data
    } catch (error) {
        console.log('error is occur',error.message)
    }
}


export const sendsrch=async(query)=>{
    console.log("queryOOOOOOOOOOOOOOOOOOO",query)
   try {
        const res=await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/srch`,{srch:query},{withCredentials:true})
        console.log("srchingqueryinput+++++++++++++",res.data)
        return res?.data
        
   } catch (error) {
    console.log('errors',error)
    throw error
   }
}

export const buddy=async({text,context})=>{
    const groqMessage=[
        ...context,{
            role:'user',
            content:text
        }
    ]
    console.log("text.........",text)
    console.log("context::::::::::::",context)
    try {
        const res=await axios.post(`https://api.groq.com/openai/v1/chat/completions`,{
             model: "llama-3.1-8b-instant", // or llama-3.3-70b-versatile
        messages: groqMessage
        },
         {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apikeys}` // replace with your key
        }
      }

    )
       console.log("GROQ Response >>>", res.data);
    return res.data;
    } catch (error) {
        console.log('err',error)
    }
}

export const bothMssg=async(messages)=>{
    console.log("messages:::::::::::::::::::::::",messages)
    try {
        const res=await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/message/BotuserMssg`,messages,{withCredentials:true})

        return res.data
    } catch (error) {
        console.log("error",error)
    }
}

export const sendscheduleMssg=async(schedulemssg)=>{
    try {
        const res=await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/message/schedule`,schedulemssg,{withCredentials:true})
        return res.data
    } catch (error) {
        console.log(error)
    }
}
