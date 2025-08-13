"use client"
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import Providers from "@/Providers";
import { Toaster } from "react-hot-toast"
import InitSocket from "./components/InitSocket";
// import { getloggeduser } from "./api/page";
// import { useQuery } from "@tanstack/react-query";
// import { useEffect } from "react";
// import { useState } from "react";
// import LoadingScreen from "./components/animation/page";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({ children }) {



  

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased sm:p-4 `}
      >
       
        <Toaster/>
        <Providers>
          <InitSocket/>
        <Navbar/>
        {children}
        </Providers>
   
      </body>
    </html>
  );
}




