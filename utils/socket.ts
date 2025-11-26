import { io } from "socket.io-client";
import type { Socket } from "socket.io-client";

let socket: Socket;

export const connectSocket = () => {
  if (!socket) {
    socket = io("http://localhost:3000"); // Backend URL
  }
  return socket;
};

export const getSocket = () => {
  if (!socket) throw new Error("Socket not connected");
  return socket;
};