"use client";

import React, {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";
import { useRouter } from "next/navigation";
import {
	register as registerApi,
	login as loginApi,
	getProfile,
	logoutApi,
} from "../services/auth.api";
import type { User, UserRole } from "../types/user";

interface AuthContextType {
	user: User | null;
	loading: boolean;
	registerUser: (
		firstName: string,
		lastName: string,
		email: string,
		password: string,
		role: UserRole
	) => Promise<void>;
	loginUser: (email: string, password: string) => Promise<void>;
	logoutUser: () => Promise<void>;
	refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuthContext() {
	const ctx = useContext(AuthContext);
	if (!ctx) throw new Error("useAuthContext must be used inside AuthProvider");
	return ctx;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);
	const router = useRouter();

	const getRedirectPath = (role?: string) => {
		switch (role) {
			case "admin":
				return "/admin/dashboard";
			case "agent":
				return "/agent/dashboard";
			case "client":
				return "/client/dashboard";
			default:
				return "/";
		}
	};

	const refreshProfile = useCallback(async (): Promise<void> => {
		try {
			const res = await getProfile();
			if (res?.user) {
				setUser(res.user);
			} else {
				setUser(null);
			}
		} catch {
			setUser(null);
		}
	}, []);

	useEffect(() => {
		(async () => {
			setLoading(true);
			const token =
				typeof window !== "undefined" ? localStorage.getItem("token") : null;

			if (token) {
				await refreshProfile();
			}
			setLoading(false);
		})();
	}, [refreshProfile]);

	const registerUser = async (
		firstName: string,
		lastName: string,
		email: string,
		password: string,
		role: UserRole
	) => {
		const res = await registerApi({
			firstName,
			lastName,
			email,
			password,
			role
		});

		if (res.token) {
			localStorage.setItem("token", res.token);
		}

		setUser(res.user);
		router.replace(getRedirectPath(res.user.role));
	};
	const loginUser = async (email: string, password: string) => {
		try {
			const res = await loginApi({ email, password });

			if (res?.token) {
				localStorage.setItem("token", res.token);
			}

			if (res?.user) {
				setUser(res.user);
				router.replace(getRedirectPath(res.user.role));
			} else {
				throw new Error("Invalid response from server");
			}
		} catch (error) {
			console.error("Login failed:", error);
			throw error;
		}
	};
	const logoutUser = async () => {
		await logoutApi();
		localStorage.removeItem("token");
		setUser(null);
		router.replace("/login");
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				loading,
				registerUser,
				loginUser,
				logoutUser,
				refreshProfile,
			}}>
			{children}
		</AuthContext.Provider>
	);
}
