export type FetchOutcome = {
	success: boolean;
	error: string | null;
} | null;

// api/allusers
export type GetAllUsers = {
	outcome: FetchOutcome;
	data: {
		id: number;
		username: string;
		full_name: string | null;
	}[];
};
