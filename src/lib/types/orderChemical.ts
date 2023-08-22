import type { FetchOutcome } from './global';

type Snull = string | null;
type Nnull = number | null;

export type ChemicalInfo = {
	CAS: Snull;
	chemicalName: Snull;
	MW: Snull;
	MP: Snull;
	BP: Snull;
	density: Snull;
	smile: Snull;
	inchi: Snull;
};

export type OrderInfo = {
	supplier_id: Nnull;
	amount: Nnull;
	amountUnit: Snull;
	supplierPN: Snull;
};

export type Supplier = {
	id: number;
	supplierName: string;
};

export type OrderChemMessageState = {
	fetchOutcome: FetchOutcome;
	ordering: boolean;
	failValidation: boolean;
	failStructure: boolean;
	failAmount: boolean;
	failSupplierID: boolean;
	failAmountUnit: boolean;
};

export type OrderChemComponentState = {
	showOrderForm: boolean;
	showStructureEditor: boolean;
	showCASDisplayMessage: boolean;
	showStructure: boolean;
	manualStructure: boolean;
	CASnotFound: boolean;
};

export type SearchCASMessageState = {
	fetchOutcome: FetchOutcome;
	invalidCAS: boolean;
	searchingCAS: boolean;
	CASfound: boolean;
	CASnotFound: boolean;
	chemNameNotFound: boolean;
};
