"use client";
import React, { Children } from 'react'
import { QueryClient,QueryClientProvider } from "@tanstack/react-query";
// import { useState } from 'react';


const Providers = ({children}) => {
    // const [queryClient] = useState(() => new QueryClient());
    const queryClient=new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
       {children}
    </QueryClientProvider>
  )
}

export default Providers