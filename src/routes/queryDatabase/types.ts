// The data that supabase returns will be modified so need a new type. Changes:
// 		amount (added string for when combined with amountUnit)
// 		amountUnit (added ? because it gets deleted)
// 		orderDate (added undefined because that can be the return value of .slice (?) )

export interface OrderData {
	chemicalName: string | null;
	CAS: string | null;
	username: string | null;
	amount: number | string | null;
	amountUnit?: string | null;
	isConsumed: boolean | null;
	supplierName: string | null;
	supplierPN: string | null;
	statusValue: string | null;
	orderDate: string | null | undefined;
}
