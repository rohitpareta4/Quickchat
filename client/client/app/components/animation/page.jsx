"use client";
import { motion } from "framer-motion";

export default function LoadingScreen() {
  return (
    <div className="flex items-center justify-center h-screen bg-black text-white">
      <motion.div
        className="flex space-x-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
      >
        <motion.span
          className="w-3 h-3 bg-white rounded-full"
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut" }}
        />
        <motion.span
          className="w-3 h-3 bg-white rounded-full"
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut", delay: 0.2 }}
        />
        <motion.span
          className="w-3 h-3 bg-white rounded-full"
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut", delay: 0.4 }}
        />
      </motion.div>
    </div>
  );
}
