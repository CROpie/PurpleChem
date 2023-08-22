import type { FetchOutcome } from './global';

export type DBLocation = {
	id: number;
	locationName: string;
};

type Snull = string | null;

type User = {
	id: number;
	username: string;
	full_name: string;
};

type Chemical = {
	id: number;
	CAS: string;
	chemicalName: Snull;
	MW: Snull;
	MP: Snull;
	BP: Snull;
	density: Snull;
	smile: Snull;
	inchi: Snull;
};

type Supplier = {
	id: number;
	supplierName: string;
};

export type Location = {
	id: number;
	locationName: string;
};

export type ModifyOrder = {
	id: number;
	amount: number;
	location: Location;
};

export type DBOrder = {
	id: number;
	user_id: number;
	user: User;
	chemical_id: number;
	chemical: Chemical;
	supplier_id: number;
	supplier: Supplier;
	location_id: number | null;
	location: Location;
	status: string;
	amount: number;
	amountUnit: string;
	isConsumed: boolean;
	orderDate: string;
	supplierPN: Snull;
};

export type LocationInput = {
	locationName: Snull;
};

export type InventorySidebarMessageState = {
	fetchOutcome: FetchOutcome;
	waiting: boolean;
};

export type InventorySidebarComponentState = {
	addNew: boolean;
};

export type InventoryAccordionMessageState = {
	fetchOutcome: FetchOutcome;
	failValidation: boolean;
	waiting: boolean;
};
