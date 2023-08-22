import type { FetchOutcome, Snull } from './global';

export type QueryData = {
	id: number;
	amount: number | string;
	amountUnit?: string;
	isConsumed: boolean | string;
	orderDate: string;
	status: string;
	supplierPN: string | null;
	fullname: string;
	CAS: string;
	chemicalName: string;
	supplierName: string;
};

export type Query = { queryType?: Snull; queryString?: Snull };

export type QueryMessageState = {
	fetchOutcome: FetchOutcome | null;
	searching: boolean;
	noHit: boolean;
	dbError: boolean;
	noStructure: boolean;
};

export type QueryInfo = {
	ChemicalName: string;
	Inchi: Snull;
};
