export interface ApiResponse<T = any> {
	success: boolean;
	msg: string;
	data?: T;
	error?: string;
}

export interface PaginationMeta {
	page: number;
	limit: number;
	total: number;
	totalPages: number;
}

export interface PaginatedResponse<T> extends ApiResponse<T> {
	meta?: PaginationMeta;
}

export interface ErrorResponse {
	success: false;
	msg: string;
	error?: string;
}

export type ApiResult<T> = ApiResponse<T> | ErrorResponse;