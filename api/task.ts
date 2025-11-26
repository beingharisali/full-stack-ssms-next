import { NextApiRequest, NextApiResponse } from "next";
import { Server as NetServer } from "http";
import { Server } from "socket.io";

type NextApiResponseServerIo = NextApiResponse & {
  socket: NetServer & {
    server: NetServer & {
      io: Server;
    };
  };
};

export default function handler(req: NextApiRequest, res: NextApiResponseServerIo) {
  if (!res.socket.server.io) {
    console.log("Initializing Socket.io server...");
    
    const httpServer: NetServer = res.socket.server as any;
    const io = new Server(httpServer, {
      path: "/api/socketio",
      // @ts-ignore
      addTrailingSlash: false,
    });
    
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      console.log("Client connected:", socket.id);
      
      socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
      });
    });
  }

  const io = res.socket.server.io;

  if (req.method === "POST") {
    const { action, ticket } = req.body;

    // Emit event to all clients
    io.emit(action, ticket);

    res.status(200).json({ message: "Ticket updated" });
  } else {
    res.status(200).json({ message: "Socket server running" });
  }
}