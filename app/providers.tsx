"use client";

import React from "react";
import { AuthProvider } from "@/context/AuthContext";
import { ToastProvider } from "@/context/ToastContext";
import { SocketProvider } from "@/context/SocketContext";
import { NotificationBar } from "@/components/notifications";

export function AppProviders({ children }: { children: React.ReactNode }) {
	return (
		<AuthProvider>
			<ToastProvider>
				<SocketProvider>
					{children}
					<NotificationBar />
				</SocketProvider>
			</ToastProvider>
		</AuthProvider>
	);
}

