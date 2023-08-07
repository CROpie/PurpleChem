export type FormResult = {
	success: boolean;
	error: string | null;
} | null;

export type FormResultLogin = {
	success: boolean;
	error: string | null;
	admin: boolean | null;
} | null;
