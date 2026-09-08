import { ApiError, ApiResponse, PaginationMeta } from '@via/shared-types';
export declare function ok<T>(data: T, message?: string): ApiResponse<T>;
export declare function fail(message: string, errors?: ApiError[]): ApiResponse<never>;
export declare function paginate(total: number, page: number, pageSize: number): PaginationMeta;
