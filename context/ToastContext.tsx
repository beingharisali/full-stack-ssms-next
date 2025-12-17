"use client";

import React, {
	createContext,
	useCallback,
	useContext,
	useMemo,
	useState,
} from "react";

type ToastVariant = "success" | "error" | "info";

export interface ToastMessage {
	id: string;
	message: string;
	type: ToastVariant;
}

interface ToastContextType {
	toasts: ToastMessage[];
	pushToast: (message: string, type?: ToastVariant) => void;
	removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
	const ctx = useContext(ToastContext);
	if (!ctx) throw new Error("useToast must be used within ToastProvider");
	return ctx;
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
	const [toasts, setToasts] = useState<ToastMessage[]>([]);

	const generateId = () =>
		`${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

	const pushToast = useCallback((message: string, type: ToastVariant = "info") => {
		const toast: ToastMessage = { id: generateId(), message, type };
		setToasts((prev) => [...prev, toast]);
		setTimeout(() => {
			setToasts((prev) => prev.filter((t) => t.id !== toast.id));
		}, 4000);
	}, []);

	const removeToast = useCallback((id: string) => {
		setToasts((prev) => prev.filter((t) => t.id !== id));
	}, []);

	const value = useMemo(
		() => ({
			toasts,
			pushToast,
			removeToast,
		}),
		[toasts, pushToast, removeToast]
	);

	return (
		<ToastContext.Provider value={value}>
			{children}
			<div className="fixed top-4 right-4 space-y-2 z-50">
				{toasts.map((toast) => (
					<div
						key={toast.id}
						className={`px-4 py-3 rounded shadow text-white ${
							toast.type === "success"
								? "bg-green-600"
								: toast.type === "error"
								? "bg-red-600"
								: "bg-gray-800"
						}`}>
						{toast.message}
					</div>
				))}
			</div>
		</ToastContext.Provider>
	);
}

