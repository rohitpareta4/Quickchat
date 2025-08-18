import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.route.js';
import { connectDB } from './lib/db.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import messageRoutes from './routes/message.route.js'
import path from 'path';
import { app,server } from './socket.js';
// import { protectRoute } from './middleware/auth.middleware.js';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


// ✅ Serve uploaded files


dotenv.config(); // Load environment variables
// const app = express();



// Middleware
app.use(cors({
  origin: ["http://localhost:3000","https://schedly-xi.vercel.app"],
  methods: ["GET", "POST" ,'PUT', 'DELETE', 'PATCH'],
  credentials: true
}));

app.use(express.json()); // Parse JSON bodies
app.use(cookieParser());
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/message',messageRoutes)

app.get('/', (req, res) => {
  res.send('hello rohit');
});

// Start Server
const port = process.env.PORT || 5000;
console.log('server is starting...');

const startServer = async () => {
  try {
    await connectDB(); // Connect to MongoDB
    server.listen(port, () => {
      console.log('server is running on', port);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
  }
};

startServer();



// // app.js
// import express from "express";
// import http from "http";
// import { Server } from "socket.io";
// import cors from "cors";
// import authRoutes from "./routes/auth.route.js";
// import { connectDB } from "./lib/db.js";
// import dotenv from "dotenv";
// import cookieParser from "cookie-parser";
// import messageRoutes from "./routes/message.route.js";
// import path from "path";
// import { fileURLToPath } from "url";
// import { dirname } from "path";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// dotenv.config(); // Load environment variables

// // ✅ Initialize express + http server
// const app = express();
// const server = http.createServer(app);

// // ✅ Middleware
// app.use(
//   cors({
//     origin: ["http://localhost:3000", "https://schedly-xi.vercel.app"],
//     methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
//     credentials: true,
//   })
// );

// app.use(express.json()); // Parse JSON bodies
// app.use(cookieParser());
// app.use("/images", express.static(path.join(__dirname, "public/images")));

// // ✅ Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/message", messageRoutes);

// app.get("/", (req, res) => {
//   res.send("hello rohit");
// });

// // ✅ Setup Socket.io
// const io = new Server(server, {
//   cors: {
//     origin: ["http://localhost:3000", "https://schedly-xi.vercel.app"],
//     methods: ["GET", "POST"],
//     credentials: true,
//   },
// });

// // ✅ Socket.io events
// io.on("connection", (socket) => {
//   console.log(
//     "🔌 Socket connected:",
//     socket.id,
//     "for user:",
//     socket.handshake.query.userid
//   );

//   socket.emit("hello", "Welcome to the socket server!");

//   socket.on("disconnect", () => {
//     console.log("❌ Socket disconnected:", socket.id);
//   });
// });

// // ✅ Start Server
// const port = process.env.PORT || 5000;
// console.log("server is starting...");

// const startServer = async () => {
//   try {
//     await connectDB(); // Connect to MongoDB
//     server.listen(port, () => {
//       console.log("🚀 server is running on", port);
//     });
//   } catch (err) {
//     console.error("Failed to start server:", err);
//   }
// };

// startServer();

// export { app, server, io };


