export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
	public: {
		Tables: {
			chemicals: {
				Row: {
					BP: string | null;
					CAS: string | null;
					chemicalName: string | null;
					density: string | null;
					id: number;
					inchi: string | null;
					MP: string | null;
					MW: string | null;
					svg: string | null;
				};
				Insert: {
					BP?: string | null;
					CAS?: string | null;
					chemicalName?: string | null;
					density?: string | null;
					id?: number;
					inchi?: string | null;
					MP?: string | null;
					MW?: string | null;
					svg?: string | null;
				};
				Update: {
					BP?: string | null;
					CAS?: string | null;
					chemicalName?: string | null;
					density?: string | null;
					id?: number;
					inchi?: string | null;
					MP?: string | null;
					MW?: string | null;
					svg?: string | null;
				};
				Relationships: [];
			};
			locations: {
				Row: {
					id: number;
					locationName: string;
					userID: string;
				};
				Insert: {
					id?: number;
					locationName: string;
					userID: string;
				};
				Update: {
					id?: number;
					locationName?: string;
					userID?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'locations_userID_fkey';
						columns: ['userID'];
						referencedRelation: 'profiles';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'locations_userID_fkey';
						columns: ['userID'];
						referencedRelation: 'ordersview';
						referencedColumns: ['id'];
					}
				];
			};
			orders: {
				Row: {
					amount: number;
					amountUnit: string;
					chemicalID: number;
					id: number;
					isConsumed: boolean;
					locationID: number | null;
					orderDate: string;
					statusID: number;
					supplierID: number | null;
					supplierPN: string | null;
					userID: string;
				};
				Insert: {
					amount: number;
					amountUnit: string;
					chemicalID: number;
					id?: number;
					isConsumed?: boolean;
					locationID?: number | null;
					orderDate?: string;
					statusID?: number;
					supplierID?: number | null;
					supplierPN?: string | null;
					userID: string;
				};
				Update: {
					amount?: number;
					amountUnit?: string;
					chemicalID?: number;
					id?: number;
					isConsumed?: boolean;
					locationID?: number | null;
					orderDate?: string;
					statusID?: number;
					supplierID?: number | null;
					supplierPN?: string | null;
					userID?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'orders_chemicalID_fkey';
						columns: ['chemicalID'];
						referencedRelation: 'chemicals';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'orders_locationID_fkey';
						columns: ['locationID'];
						referencedRelation: 'locations';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'orders_statusID_fkey';
						columns: ['statusID'];
						referencedRelation: 'status';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'orders_supplierID_fkey';
						columns: ['supplierID'];
						referencedRelation: 'suppliers';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'orders_userID_fkey';
						columns: ['userID'];
						referencedRelation: 'profiles';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'orders_userID_fkey';
						columns: ['userID'];
						referencedRelation: 'ordersview';
						referencedColumns: ['id'];
					}
				];
			};
			profiles: {
				Row: {
					full_name: string | null;
					id: string;
					username: string | null;
				};
				Insert: {
					full_name?: string | null;
					id: string;
					username?: string | null;
				};
				Update: {
					full_name?: string | null;
					id?: string;
					username?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: 'profiles_id_fkey';
						columns: ['id'];
						referencedRelation: 'users';
						referencedColumns: ['id'];
					}
				];
			};
			status: {
				Row: {
					id: number;
					statusValue: string;
				};
				Insert: {
					id?: number;
					statusValue?: string;
				};
				Update: {
					id?: number;
					statusValue?: string;
				};
				Relationships: [];
			};
			suppliers: {
				Row: {
					id: number;
					supplierName: string;
				};
				Insert: {
					id?: number;
					supplierName: string;
				};
				Update: {
					id?: number;
					supplierName?: string;
				};
				Relationships: [];
			};
		};
		Views: {
			ordersview: {
				Row: {
					amount: number | null;
					amountUnit: string | null;
					CAS: string | null;
					chemicalName: string | null;
					id: string | null;
					inchi: string | null;
					isConsumed: boolean | null;
					orderDate: string | null;
					statusValue: string | null;
					supplierName: string | null;
					supplierPN: string | null;
					username: string | null;
				};
				Relationships: [
					{
						foreignKeyName: 'profiles_id_fkey';
						columns: ['id'];
						referencedRelation: 'users';
						referencedColumns: ['id'];
					}
				];
			};
		};
		Functions: {
			delete_claim: {
				Args: {
					uid: string;
					claim: string;
				};
				Returns: string;
			};
			get_claim: {
				Args: {
					uid: string;
					claim: string;
				};
				Returns: Json;
			};
			get_claims: {
				Args: {
					uid: string;
				};
				Returns: Json;
			};
			get_my_claim: {
				Args: {
					claim: string;
				};
				Returns: Json;
			};
			get_my_claims: {
				Args: Record<PropertyKey, never>;
				Returns: Json;
			};
			is_claims_admin: {
				Args: Record<PropertyKey, never>;
				Returns: boolean;
			};
			set_claim: {
				Args: {
					uid: string;
					claim: string;
					value: Json;
				};
				Returns: string;
			};
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
}
