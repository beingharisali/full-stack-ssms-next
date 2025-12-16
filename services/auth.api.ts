import http from "./http";
import { User, RegisterRequest, LoginRequest, AuthResponse, UserSummary } from "../types/user";

export async function register(payload: RegisterRequest): Promise<AuthResponse> {
	const res = await http.post("/register", payload);
	return res.data;
}

export async function login(payload: LoginRequest): Promise<AuthResponse> {
	const res = await http.post("/login", payload);
	return res.data;
}

export async function getProfile(): Promise<{ success: boolean; user: User } | null> {
	try {
		const res = await http.get("/me");
		return res.data;
	} catch {
		return null;
	}
}

export async function getAllUsers(): Promise<{ success: boolean; users: UserSummary[] }> {
	const res = await http.get("/getUsers");
	return res.data;
}

export async function deleteUser(id: string): Promise<void> {
	await http.delete(`/users/${id}`);
}

export async function logoutApi(): Promise<void> {
	localStorage.removeItem("token");
}
