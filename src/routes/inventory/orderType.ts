export type order = {
	id: number;
	amount: number;
	amountUnit: string | null;
	chemicalID: {
		id: number;
		chemicalName: string | null;
		CAS: string | null;
		MW: string | null;
		BP: string | null;
		MP: string | null;
		density: string | null;
		inchi: string | null;
		smile: string | null;
	};
	locationID: {
		id: number | null;
		locationName: string;
	} | null;
};

export type ordersList = order[];

export type location = {
	id: number;
	locationName: string;
};

export type locationsList = location[];
