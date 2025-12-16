"use client";

import React, {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { io, Socket } from "socket.io-client";
import { useAuthContext } from "./AuthContext";
import { useToast } from "./ToastContext";

export interface OnlineUser {
	userId: string;
	role: string;
}

interface SocketContextValue {
	socket: Socket | null;
	onlineUsers: OnlineUser[];
	joinTicketRoom: (ticketId: string) => void;
	leaveTicketRoom: (ticketId: string) => void;
}

const SocketContext = createContext<SocketContextValue | undefined>(undefined);

const getSocketURL = () => {
	if (process.env.NEXT_PUBLIC_SOCKET_URL)
		return process.env.NEXT_PUBLIC_SOCKET_URL.replace(/\/$/, "");
	const apiUrl =
		process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000/api/v1";
	return apiUrl.replace(/\/api\/v1$/, "");
};

export const useSocket = () => {
	const ctx = useContext(SocketContext);
	if (!ctx) throw new Error("useSocket must be used within SocketProvider");
	return ctx;
};

export function SocketProvider({ children }: { children: React.ReactNode }) {
	const { user } = useAuthContext();
	const { pushToast } = useToast();
	const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);
	const socketRef = useRef<Socket | null>(null);
	const [socketState, setSocketState] = useState<Socket | null>(null);

useEffect(() => {
	const token =
		typeof window !== "undefined" ? localStorage.getItem("token") : null;
	if (!token || !user) {
		return;
	}

	const socket = io(getSocketURL(), {
		transports: ["websocket"],
		auth: { token },
	});

	socketRef.current = socket;

	socket.on("connect", () => {
		setSocketState(socket);
		pushToast("Connected to realtime updates", "success");
	});

	socket.on("disconnect", () => {
		setSocketState(null);
		setOnlineUsers([]);
		pushToast("Disconnected from realtime updates", "error");
	});

	socket.on("online:users", (payload: OnlineUser[]) => {
		setOnlineUsers(payload);
	});

	socket.on("ticket:created", ({ ticket }) => {
		pushToast(`New ticket "${ticket.title}" created`, "info");
		window.dispatchEvent(new CustomEvent("ticketUpdate"));
	});

	socket.on("ticket:assigned", ({ ticket }) => {
		pushToast(`Ticket "${ticket.title}" assigned`, "info");
		window.dispatchEvent(new CustomEvent("ticketUpdate"));
	});

	socket.on("ticket:updated", ({ ticket }) => {
		pushToast(`Ticket "${ticket.title}" updated`, "info");
		window.dispatchEvent(new CustomEvent("ticketUpdate"));
	});

	socket.on("ticket:deleted", ({ ticketId }) => {
		pushToast(`Ticket deleted`, "info");
		window.dispatchEvent(new CustomEvent("ticketUpdate"));
	});

	socket.on("notification:new", ({ ticketId }) => {
		pushToast(`New message on ticket ${ticketId}`, "info");
	});

	return () => {
		socket.disconnect();
		setSocketState(null);
	};
}, [user, pushToast]);

useEffect(() => {
if (user) return;
if (socketRef.current) {
	socketRef.current.disconnect();
	socketRef.current = null;
}
}, [user]);

	const joinTicketRoom = useCallback((ticketId: string) => {
		socketRef.current?.emit("ticket:join", ticketId);
	}, []);

	const leaveTicketRoom = useCallback((ticketId: string) => {
		socketRef.current?.emit("ticket:leave", ticketId);
	}, []);

	const value = useMemo(
		() => ({
			socket: socketState,
			onlineUsers,
			joinTicketRoom,
			leaveTicketRoom,
		}),
		[socketState, onlineUsers, joinTicketRoom, leaveTicketRoom]
	);

	return (
		<SocketContext.Provider value={value}>{children}</SocketContext.Provider>
	);
}

