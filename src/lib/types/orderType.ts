export type orders = {
	id: number;
	chemicalID: {
		id: number;
		chemicalName: string | null;
		CAS: string | null;
		MW: string | null;
		MP: string | null;
		BP: string | null;
		density: string | null;
		inchi: string | null;
		smile: string | null;
	};
	amount: number;
	amountUnit: string;
	isConsumed: boolean;
	locationID: {
		id: number;
		locationName: string;
	};
	statusID: {
		id: number;
		statusValue: string;
	};
};

export type locations = {
	id: number;
	locationName: string;
};
