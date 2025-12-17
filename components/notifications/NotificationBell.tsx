"use client";

import React, { useEffect, useState } from "react";
import { useSocket } from "@/context/SocketContext";
import { messageAPI } from "@/services/message.api";

export function NotificationBell() {
	const { socket } = useSocket();
	const [unreadCount, setUnreadCount] = useState(0);

	useEffect(() => {
		loadUnreadCount();
	}, []);

	useEffect(() => {
		if (!socket) return;

		const handleNewNotification = () => {
			loadUnreadCount();
		};

		socket.on("notification:new", handleNewNotification);
		socket.on("ticket:created", handleNewNotification);
		socket.on("ticket:assigned", handleNewNotification);
		socket.on("ticket:updated", handleNewNotification);

		return () => {
			socket.off("notification:new", handleNewNotification);
			socket.off("ticket:created", handleNewNotification);
			socket.off("ticket:assigned", handleNewNotification);
			socket.off("ticket:updated", handleNewNotification);
		};
	}, [socket]);

	const loadUnreadCount = async () => {
		try {
			const token = localStorage.getItem("token");
			if (!token) return;
			const response = await messageAPI.getUnreadCount();
			const total = Object.values(response.unreadCounts).reduce((sum: number, count: number) => sum + count, 0);
			setUnreadCount(total);
		} catch (error) {
			console.error("Failed to load unread count:", error);
			setUnreadCount(0);
		}
	};

	return (
		<div className="relative">
			<div className="relative p-2 text-gray-500">
				<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM11 19H6a2 2 0 01-2-2V7a2 2 0 012-2h5m5 0v6m0 0l3-3m-3 3l-3-3" />
				</svg>
				{unreadCount > 0 && (
					<span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
						{unreadCount > 99 ? "99+" : unreadCount}
					</span>
				)}
			</div>
		</div>
	);
}