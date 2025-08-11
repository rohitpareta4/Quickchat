"use client";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getloggeduser } from "@/app/api/page";
import { socketdata } from "@/socket";

export default function InitSocket() {
  const { getSocket, connectsocket } = socketdata();

  const { data, isSuccess } = useQuery({
    queryKey: ["me"],
    queryFn: getloggeduser,
  });

  console.log("newsocketdataoflogin",data)

  useEffect(() => {
    console.log("useeffect runs...")
    if (isSuccess) {
        console.log("successid",data?._id)
      const socket = getSocket();
      console.log("newsocketId",socket)
      if (!socket || !socket.connected) {
        connectsocket(data?.token, data?._id);
      }
    }
  }, [isSuccess, data?._id,data?.token]);

  return null;
}
