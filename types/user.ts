export type UserRole = "admin" | "agent" | "client";

export interface User {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	role: UserRole;
	createdAt?: string;
	updatedAt?: string;
}

export interface UserSummary {
	_id: string;
	firstName: string;
	lastName: string;
	email: string;
	role: UserRole;
}

export interface AuthResponse {
	user: User;
	token: string;
	success: boolean;
	msg: string;
}

export interface LoginRequest {
	email: string;
	password: string;
}

export interface RegisterRequest {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	role?: UserRole;
}


