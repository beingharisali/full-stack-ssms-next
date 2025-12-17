"use client";

import React, { useEffect, useRef, useState } from "react";
import { TicketMessage } from "@/types/ticket";
import { useSocket } from "@/context/SocketContext";
import { useAuthContext } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { messageAPI } from "@/services/message.api";

interface ChatPanelProps {
	ticketId: string;
}

export function ChatPanel({ ticketId }: ChatPanelProps) {
	const { user } = useAuthContext();
	const { socket, joinTicketRoom, leaveTicketRoom } = useSocket();
	const { pushToast } = useToast();
	const [messages, setMessages] = useState<TicketMessage[]>([]);
	const [body, setBody] = useState("");
	const [sending, setSending] = useState(false);
	const [loading, setLoading] = useState(true);
	const listRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (!ticketId) return;
		
		joinTicketRoom(ticketId);
		loadMessages();

		return () => leaveTicketRoom(ticketId);
	}, [ticketId, joinTicketRoom, leaveTicketRoom]);

	useEffect(() => {
		if (!socket) return;

		const handleNewMessage = ({ message }: { message: TicketMessage }) => {
			setMessages(prev => [...prev, message]);
		};

		socket.on("message:new", handleNewMessage);
		return () => {
			socket.off("message:new", handleNewMessage);
		};
	}, [socket]);

	useEffect(() => {
		if (listRef.current) {
			listRef.current.scrollTop = listRef.current.scrollHeight;
		}
	}, [messages]);

	const loadMessages = async () => {
		try {
			const { messages } = await messageAPI.getMessages(ticketId);
			setMessages(messages);
		} catch (error) {
			pushToast("Failed to load messages", "error");
		} finally {
			setLoading(false);
		}
	};

	const sendMessage = async () => {
		if (!body.trim() || sending) return;
		
		setSending(true);
		try {
			await messageAPI.sendMessage(ticketId, body);
			setBody("");
		} catch (error) {
			pushToast("Failed to send message", "error");
		} finally {
			setSending(false);
		}
	};

	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		sendMessage();
	};

	const formatTime = (date: string) => {
		return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
	};

	const formatDate = (date: string) => {
		const messageDate = new Date(date);
		const today = new Date();
		const yesterday = new Date(today);
		yesterday.setDate(yesterday.getDate() - 1);

		if (messageDate.toDateString() === today.toDateString()) {
			return 'Today';
		} else if (messageDate.toDateString() === yesterday.toDateString()) {
			return 'Yesterday';
		} else {
			return messageDate.toLocaleDateString();
		}
	};

	if (loading) {
		return (
			<div className="flex flex-col h-full bg-white rounded-xl border border-gray-200 shadow-sm">
				<div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
					<div className="flex items-center space-x-3">
						<div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
							<svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
							</svg>
						</div>
						<div>
							<h3 className="font-semibold text-gray-900">Ticket Chat</h3>
							<p className="text-sm text-gray-500">Real-time conversation</p>
						</div>
					</div>
				</div>
				<div className="flex-1 flex items-center justify-center">
					<div className="flex items-center space-x-2 text-gray-500">
						<div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
						<span className="text-sm">Loading messages...</span>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="flex flex-col h-full bg-white rounded-xl border border-gray-200 shadow-sm">
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 sm:px-6 py-4 border-b border-gray-200 space-y-3 sm:space-y-0">
				<div className="flex items-center space-x-3">
					<div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-sm">
						<svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
						</svg>
					</div>
					<div>
						<h3 className="font-semibold text-gray-900 text-lg">Ticket Chat</h3>
						<p className="text-sm text-gray-500">Real-time conversation with support team</p>
					</div>
				</div>
				<div className="flex items-center justify-between sm:justify-end space-x-4">
					<div className="flex items-center space-x-2">
						<div className={`w-2 h-2 rounded-full ${socket?.connected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
						<span className="text-xs font-medium ${socket?.connected ? 'text-green-600' : 'text-red-600'}">
							{socket?.connected ? 'Connected' : 'Disconnected'}
						</span>
					</div>
					<div className="hidden sm:flex items-center space-x-1 text-xs text-gray-500">
						<svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
						<span>Live updates</span>
					</div>
				</div>
			</div>
			
			<div ref={listRef} className="flex-1 overflow-y-auto px-4 py-4">
				{messages.length === 0 ? (
					<div className="flex flex-col items-center justify-center h-full text-center py-12">
						<div className="w-20 h-20 bg-gradient-to-br from-blue-50 to-blue-100 rounded-full flex items-center justify-center mb-6">
							<svg className="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
							</svg>
						</div>
						<h4 className="text-xl font-semibold text-gray-900 mb-3">Start the conversation</h4>
						<p className="text-gray-500 max-w-md leading-relaxed">No messages yet. Send the first message to begin collaborating on this ticket. All participants will receive real-time notifications.</p>
					</div>
				) : (
					<div className="space-y-6">
						{messages.map((message, index) => {
							const isOwn = message.senderId._id === user?.id;
							const showDate = index === 0 || formatDate(messages[index - 1].createdAt) !== formatDate(message.createdAt);
							const prevMessage = index > 0 ? messages[index - 1] : null;
							const showAvatar = !prevMessage || prevMessage.senderId._id !== message.senderId._id;
							
							return (
								<div key={message._id}>
									{showDate && (
										<div className="flex justify-center my-6">
											<div className="bg-gray-50 px-4 py-2 rounded-full">
												<span className="text-sm font-medium text-gray-600">
													{formatDate(message.createdAt)}
												</span>
											</div>
										</div>
									)}
									<div className={`flex items-end space-x-3 ${isOwn ? 'flex-row-reverse space-x-reverse' : ''} ${showAvatar ? '' : 'ml-11'}`}>
										{showAvatar && (
											<div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold shadow-sm ${
												isOwn 
													? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white' 
													: 'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-700'
											}`}>
												{message.senderId.firstName?.[0]?.toUpperCase()}{message.senderId.lastName?.[0]?.toUpperCase()}
											</div>
										)}
										<div className={`flex flex-col max-w-xs sm:max-w-sm lg:max-w-md ${isOwn ? 'items-end' : 'items-start'}`}>
											{showAvatar && (
												<div className={`flex items-center mb-1 space-x-2 text-xs ${
													isOwn ? 'flex-row-reverse space-x-reverse text-gray-500' : 'text-gray-600'
												}`}>
													<span className="font-semibold">
														{message.senderId.firstName} {message.senderId.lastName}
													</span>
													<span className="text-gray-400">{formatTime(message.createdAt)}</span>
												</div>
											)}
											<div className={`px-4 py-3 rounded-2xl shadow-sm max-w-full break-words ${
												isOwn 
													? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-br-lg' 
													: 'bg-white border border-gray-200 text-gray-900 rounded-bl-lg'
											}`}>
												<p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
											</div>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				)}
			</div>
			
			<div className="border-t border-gray-200 bg-gradient-to-r from-gray-50 to-white p-3 sm:p-4">
				<form onSubmit={onSubmit} className="space-y-3">
					<div className="relative">
						<textarea
							value={body}
							onChange={(e) => {
								setBody(e.target.value);
								// Auto-resize textarea
								e.target.style.height = 'auto';
								e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
							}}
							onKeyDown={(e) => {
								if (e.key === 'Enter' && !e.shiftKey) {
									e.preventDefault();
									sendMessage();
								}
							}}
							rows={1}
							className="w-full px-4 py-3 pr-20 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm placeholder-gray-500 shadow-sm transition-all"
							placeholder="Type your message..."
							disabled={sending}
							style={{ minHeight: '48px', maxHeight: '120px' }}
						/>
						<div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-2">
							{body.length > 0 && (
								<span className="text-xs text-gray-400 hidden sm:block">
									{body.length}
								</span>
							)}
							<button
								type="submit"
								disabled={sending || !body.trim()}
								className={`p-2.5 rounded-lg transition-all duration-200 ${
									body.trim() && !sending
										? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-md hover:shadow-lg transform hover:scale-105'
										: 'bg-gray-200 text-gray-400 cursor-not-allowed'
								}`}>
								{sending ? (
									<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
								) : (
									<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
									</svg>
								)}
							</button>
						</div>
					</div>
					<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0 px-1">
						<div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500">
							<span className="flex items-center space-x-1">
								<svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
								</svg>
								<span>Enter to send</span>
							</span>
							<span className="hidden sm:inline">Shift + Enter for new line</span>
						</div>
						<div className="flex items-center space-x-2">
							<div className={`w-2 h-2 rounded-full ${socket?.connected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
							<span className={`text-xs font-medium ${
								socket?.connected ? 'text-green-600' : 'text-red-600'
							}`}>
								{socket?.connected ? 'Live' : 'Offline'}
							</span>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}