const socketIO = require("socket.io");

const setupSocket = (server) => {
  const io = socketIO(server, {
    cors: {
      origin: (origin, callback) => {
        if (origin && /^http:\/\/localhost:\d+$/.test(origin)) {
          callback(null, true); // Allow requests from localhost with any port
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  const userSocketMap = new Map();

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("join", (userId) => {
      userSocketMap.set(userId, socket.id);
      socket.join(userId);
      console.log(`User ${userId} joined with socket id ${socket.id}`);
    });

    // Handle private message
    socket.on("private_message", ({ to, message }) => {
      console.log(`Message from ${socket.id} to ${to}: ${message.content}`);
      io.to(userSocketMap.get(to)).emit("receive_message", message);
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      for (const [userId, socketId] of userSocketMap) {
        if (socketId === socket.id) {
          userSocketMap.delete(userId);
          console.log(`User ${userId} disconnected`);
          break;
        }
      }
      console.log("User disconnected:", socket.id);
    });
  });

  console.log("socket server is running");
};

module.exports = setupSocket;
