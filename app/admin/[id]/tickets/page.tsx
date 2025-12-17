"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LegacyAdminTicketPage({
	params,
}: {
	params: { id: string };
}) {
	const router = useRouter();
	useEffect(() => {
		router.replace(`/tickets/${params.id}`);
	}, [params.id, router]);

	return null;
}
