export type Snull = string | null;
export type Numull = number | null;

export type FetchOutcome = {
	success: boolean;
	error: string | null;
} | null;

export type TokenPayload = {
	sub: string;
	exp: number;
};
