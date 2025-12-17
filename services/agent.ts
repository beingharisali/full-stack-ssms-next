import http from "./http";
import { AgentType } from "@/types/agent";

export async function getAgents(): Promise<AgentType[]> {
	const res = await http.get("/getUsers");
	const users = res.data.users || res.data.user || [];
	return Array.isArray(users) ? users.filter((user: any) => user.role === "agent") : [];
}