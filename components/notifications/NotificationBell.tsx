"use client";

import React, { useEffect, useState } from "react";
import { useSocket } from "@/context/SocketContext";
import { messageAPI } from "@/services/message.api";

export function NotificationBell() {
	const { socket } = useSocket();
	const [unreadCount, setUnreadCount] = useState(0);
	const [showDropdown, setShowDropdown] = useState(false);

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
			const { unreadCounts } = await messageAPI.getUnreadCount();
			const total = Object.values(unreadCounts).reduce((sum, count) => sum + count, 0);
			setUnreadCount(total);
		} catch (error) {
			// Silently fail for auth errors
		}
	};

	return (
		<div className="relative">
			<button
				onClick={() => setShowDropdown(!showDropdown)}
				className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg transition-colors">
				<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM11 19H6a2 2 0 01-2-2V7a2 2 0 012-2h5m5 0v6m0 0l3-3m-3 3l-3-3" />
				</svg>
				{unreadCount > 0 && (
					<span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
						{unreadCount > 99 ? "99+" : unreadCount}
					</span>
				)}
			</button>

			{showDropdown && (
				<>
					<div className="fixed inset-0 z-40" onClick={() => setShowDropdown(false)}></div>
					<div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
						<div className="flex items-center justify-between p-4 border-b border-gray-200">
							<h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
							<button
								onClick={() => setShowDropdown(false)}
								className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
								<svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
								</svg>
							</button>
						</div>
						<div className="p-4">
							{unreadCount > 0 ? (
								<div className="flex items-start space-x-3">
									<div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
										<svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
										</svg>
									</div>
									<div>
										<p className="text-sm font-medium text-gray-900 mb-1">New Messages</p>
										<p className="text-sm text-gray-600">
											You have {unreadCount} unread message{unreadCount !== 1 ? "s" : ""} across your tickets.
										</p>
									</div>
								</div>
							) : (
								<div className="text-center py-8">
									<div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
										<svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
										</svg>
									</div>
									<p className="text-sm font-medium text-gray-900 mb-1">All caught up!</p>
									<p className="text-sm text-gray-500">No new notifications at this time.</p>
								</div>
							)}
						</div>
					</div>
				</>
			)}
		</div>
	);
}