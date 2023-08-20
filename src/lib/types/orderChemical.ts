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
