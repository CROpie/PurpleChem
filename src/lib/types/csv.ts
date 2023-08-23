type Snull = string | null;

export type Row = {
	username: string;
	role: string;
	password: string;
	full_name: string;
	CAS: string;
	supplierName: string;
	status: string;
	amount: number;
	amountUnit: string;
	supplierPN: Snull;
};

export type UserAuth = {
	username: string;
	role: string;
	password: string;
};

export type returnUser = {
	id: number;
	username: string;
};

export type UserData = {
	id: number | null;
	username: string;
	full_name: string;
};

export type Chemical = {
	CAS: string;
	chemicalName: string;
	MW: Snull;
	MP: Snull;
	BP: Snull;
	density: Snull;
	smile: Snull;
	inchi: Snull;
};

export type Supplier = {
	supplierName: string;
};

export type Order = {
	user: string | number;
	chemical: string | number;
	supplier: string | number;
	status: string;
	amount: number;
	amountUnit: string;
	supplierPN: Snull;
};
