import { json } from '@sveltejs/kit';
import type { FetchOutcome } from '$lib/types/global.js';
import type { UserAuth, UserData, returnUser, Chemical, Supplier, Order } from '$lib/types/csv.js';

import PurpleChemAuthApi from '$lib/apiClient/PurpleChemAuthAPI.js';

export const POST = async ({ cookies, locals, request }) => {
	// const AuthAPI = new PurpleChemAuthApi();

	const token = cookies.get('session');

	let outcome: FetchOutcome = { success: false, error: null };

	const {
		userAuthList,
		userDataList,
		chemicalList,
		supplierList,
		orderList
	}: {
		userAuthList: UserAuth[];
		userDataList: UserData[];
		chemicalList: Chemical[];
		supplierList: Supplier[];
		orderList: Order[];
	} = await request.json();

	const APIClient = locals.apiclient;

	// create a new entry in the Auth users table
	// return the id, use this id to create a matching entry in the Data profiles table

	const response = await fetch('http://170.64.192.236:80/csvusers/', {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(userAuthList)
	});

	if (!response.ok) {
		outcome.error = 'Something went wrong with the Auth database...';
		return json({ outcome });
	}

	const idList: returnUser[] = await response.json();

	// Put the newly created user auth ID values into the user and order objects
	idList.forEach((id) => {
		userDataList.forEach((user) => {
			if (user.username == id.username) {
				user.id = id.id;
			}
		});
		orderList.forEach((order) => {
			if (order.user == id.username) {
				order.user = id.id;
			}
		});
	});

	const requestData = {
		userDataList,
		chemicalList,
		supplierList,
		orderList
	};

	const response2 = await APIClient.post('/csv/', null, {
		body: requestData
	});

	if (response2.outcome?.error) {
		outcome = response2.outcome;
		return json({ outcome });
	}

	outcome.success = true;
	return json({ outcome });
};
