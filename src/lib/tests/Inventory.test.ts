import '@testing-library/jest-dom';
import { describe, expect } from 'vitest';
import {
	render,
	waitFor,
	screen,
	fireEvent,
	cleanup,
	waitForElementToBeRemoved
} from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { server } from '$lib/mocks/server';
import { rest } from 'msw';
import Inventory from '../../routes/inventory/components/Inventory.svelte';

import type { orders, locations } from '$lib/types/orderType';

// const locationsList = [
// 	{
// 		id: 1,
// 		locationName: 'Freezer'
// 	},
// 	{
// 		id: 2,
// 		locationName: 'Drawer'
// 	},
// 	{
// 		id: 3,
// 		locationName: 'Fridge'
// 	}
// ];

// const ordersList = [
// 	{
// 		id: 72,
// 		amount: 10,
// 		amountUnit: 'mL',
// 		isConsumed: false,
// 		chemicalID: {
// 			id: 39,
// 			chemicalName: 'Ethanol',
// 			CAS: '64-17-5',
// 			MW: '46.07',
// 			MP: '-114.1 °C',
// 			BP: '78.5 °C',
// 			density: '0.789 g/cm<sup>3</sup> @ Temp: 20 °C',
// 			inchi: 'InChI=1S/C2H6O/c1-2-3/h3H,2H2,1H3',
// 			smile: 'C(C)O'
// 		},
// 		locationID: {
// 			id: 2,
// 			locationName: 'Drawer'
// 		},
// 		statusID: {
// 			id: 3,
// 			statusValue: 'received'
// 		}
// 	},
// 	{
// 		id: 64,
// 		amount: 64,
// 		amountUnit: 'g',
// 		isConsumed: false,
// 		chemicalID: {
// 			id: 28,
// 			chemicalName: 'Aluminum chloride',
// 			CAS: '7446-70-0',
// 			MW: '133.3',
// 			MP: '192.6 °C',
// 			BP: '182.7 °C @ Press: 752 Torr',
// 			density: '2.48 g/cm3',
// 			inchi: 'InChI=1S/Al.3ClH/h;3*1H/q+3;;;/p-3',
// 			smile: '[Al](Cl)(Cl)Cl'
// 		},
// 		locationID: {
// 			id: 1,
// 			locationName: 'Freezer'
// 		},
// 		statusID: {
// 			id: 3,
// 			statusValue: 'received'
// 		}
// 	}
// ];

async function openAccordionItem(order: orders) {
	const orderAccordionTitle = screen.getByText(`${order.chemicalID.chemicalName} (${order.id})`);
	await userEvent.click(orderAccordionTitle);
}

async function changeAmountTo(newAmount: string) {
	const amountInput = screen.getByTestId('amount');

	await userEvent.click(amountInput);
	while (amountInput.value > 0) {
		await userEvent.keyboard('{Backspace}');
	}
	await userEvent.type(amountInput, newAmount);
}

const origin = window.location.origin;
console.log('origin: ', origin);

describe('Initial Render', () => {
	let locationsList: locations[];
	let ordersList: orders[];
	beforeEach(() => {
		locationsList = [
			{
				id: 1,
				locationName: 'Freezer'
			},
			{
				id: 2,
				locationName: 'Drawer'
			},
			{
				id: 3,
				locationName: 'Fridge'
			}
		];

		ordersList = [
			{
				id: 72,
				amount: 10,
				amountUnit: 'mL',
				isConsumed: false,
				chemicalID: {
					id: 39,
					chemicalName: 'Ethanol',
					CAS: '64-17-5',
					MW: '46.07',
					MP: '-114.1 °C',
					BP: '78.5 °C',
					density: '0.789 g/cm<sup>3</sup> @ Temp: 20 °C',
					inchi: 'InChI=1S/C2H6O/c1-2-3/h3H,2H2,1H3',
					smile: 'C(C)O'
				},
				locationID: {
					id: 2,
					locationName: 'Drawer'
				},
				statusID: {
					id: 3,
					statusValue: 'received'
				}
			},
			{
				id: 64,
				amount: 64,
				amountUnit: 'g',
				isConsumed: false,
				chemicalID: {
					id: 28,
					chemicalName: 'Aluminum chloride',
					CAS: '7446-70-0',
					MW: '133.3',
					MP: '192.6 °C',
					BP: '182.7 °C @ Press: 752 Torr',
					density: '2.48 g/cm3',
					inchi: 'InChI=1S/Al.3ClH/h;3*1H/q+3;;;/p-3',
					smile: '[Al](Cl)(Cl)Cl'
				},
				locationID: {
					id: 1,
					locationName: 'Freezer'
				},
				statusID: {
					id: 3,
					statusValue: 'received'
				}
			}
		];
	});

	test('If props are empty lists it should give a nothing here message', async () => {
		const locationsList: any[] = [];
		const ordersList: any[] = [];
		render(Inventory, { locationsList, ordersList });

		expect(screen.queryByText(/There's nothing here!/i)).toBeInTheDocument();
	});

	test('Component is rendered with All, Unsorted and New Sidebar buttons. Accordion title is "All"', async () => {
		render(Inventory, { locationsList, ordersList });
		screen.getByRole('button', { name: 'All' });
		screen.getByRole('button', { name: 'Unsorted' });
		screen.getByRole('button', { name: 'New' });

		screen.getByRole('heading', { name: 'All' });
	});

	test('Sidebar All starts as selected, unsorted does not. ** neither do locations in the list, need to add this **', async () => {
		render(Inventory, { locationsList, ordersList });
		const sidebarAll = screen.getByRole('button', { name: 'All' });
		const sidebarAllDiv = sidebarAll.parentElement;

		const sidebarUnsorted = screen.getByRole('button', { name: 'Unsorted' });
		const sidebarUnsortedDiv = sidebarUnsorted.parentElement;

		expect(sidebarAllDiv?.classList.contains('text-complement')).toBe(true);
		expect(sidebarUnsortedDiv?.classList.contains('text-complement')).toBe(false);
		expect(sidebarUnsortedDiv?.classList.contains('text-primary')).toBe(true);

		// loop for all locations in the list, check not text-complement
	});

	test('Check that every location in locationsList is rendered.', async () => {
		render(Inventory, { locationsList, ordersList });

		locationsList.forEach((location) => {
			screen.getByRole('button', { name: location.locationName });
		});
	});

	test('Check that every order in ordersList is rendered.', async () => {
		render(Inventory, { locationsList, ordersList });

		ordersList.forEach((order) => {
			screen.getAllByRole('button', {
				name: `${order.chemicalID.chemicalName} (${order.id})`
			});
		});
	});
});

describe('Sidebar Tests', () => {
	let locationsList: locations[];
	let ordersList: orders[];
	beforeEach(() => {
		locationsList = [
			{
				id: 1,
				locationName: 'Freezer'
			},
			{
				id: 2,
				locationName: 'Drawer'
			},
			{
				id: 3,
				locationName: 'Fridge'
			}
		];

		ordersList = [
			{
				id: 72,
				amount: 10,
				amountUnit: 'mL',
				isConsumed: false,
				chemicalID: {
					id: 39,
					chemicalName: 'Ethanol',
					CAS: '64-17-5',
					MW: '46.07',
					MP: '-114.1 °C',
					BP: '78.5 °C',
					density: '0.789 g/cm<sup>3</sup> @ Temp: 20 °C',
					inchi: 'InChI=1S/C2H6O/c1-2-3/h3H,2H2,1H3',
					smile: 'C(C)O'
				},
				locationID: {
					id: 2,
					locationName: 'Drawer'
				},
				statusID: {
					id: 3,
					statusValue: 'received'
				}
			},
			{
				id: 64,
				amount: 64,
				amountUnit: 'g',
				isConsumed: false,
				chemicalID: {
					id: 28,
					chemicalName: 'Aluminum chloride',
					CAS: '7446-70-0',
					MW: '133.3',
					MP: '192.6 °C',
					BP: '182.7 °C @ Press: 752 Torr',
					density: '2.48 g/cm3',
					inchi: 'InChI=1S/Al.3ClH/h;3*1H/q+3;;;/p-3',
					smile: '[Al](Cl)(Cl)Cl'
				},
				locationID: {
					id: 1,
					locationName: 'Freezer'
				},
				statusID: {
					id: 3,
					statusValue: 'received'
				}
			}
		];
	});
	test('Clicking a location causes the ~selected class (text-complement) and accordion title to change. Clicking All reverts the changes.', async () => {
		render(Inventory, { locationsList, ordersList });

		const location = locationsList[0].locationName;

		const sidebarAll = screen.getByRole('button', { name: 'All' });
		const sidebarAllDiv = sidebarAll.parentElement;
		const sidebarLocation = screen.getByRole('button', { name: location });
		const sidebarLocationDiv = sidebarLocation.parentElement;

		expect(sidebarAllDiv?.classList.contains('text-primary')).toBe(false);
		expect(sidebarAllDiv?.classList.contains('text-complement')).toBe(true);

		expect(sidebarLocationDiv?.classList.contains('text-complement')).toBe(false);
		expect(sidebarLocationDiv?.classList.contains('text-primary')).toBe(true);

		screen.getByRole('heading', { name: 'All' });
		expect(screen.queryByRole('heading', { name: location })).not.toBeInTheDocument();

		await userEvent.click(sidebarLocation);

		expect(sidebarAllDiv?.classList.contains('text-primary')).toBe(true);
		expect(sidebarAllDiv?.classList.contains('text-complement')).toBe(false);

		expect(sidebarLocationDiv?.classList.contains('text-complement')).toBe(true);
		expect(sidebarLocationDiv?.classList.contains('text-primary')).toBe(false);

		screen.getByRole('heading', { name: location });
		expect(screen.queryByRole('heading', { name: 'All' })).not.toBeInTheDocument();

		await userEvent.click(sidebarAll);

		expect(sidebarAllDiv?.classList.contains('text-primary')).toBe(false);
		expect(sidebarAllDiv?.classList.contains('text-complement')).toBe(true);

		expect(sidebarLocationDiv?.classList.contains('text-complement')).toBe(false);
		expect(sidebarLocationDiv?.classList.contains('text-primary')).toBe(true);

		screen.getByRole('heading', { name: 'All' });
		expect(screen.queryByRole('heading', { name: location })).not.toBeInTheDocument();
	});

	test('Clicking a location causes the orders to be filtered. Accordion title changes to "Freezer". Title and chemicals revert on clicking All.', async () => {
		render(Inventory, { locationsList, ordersList });

		screen.getByText(/Aluminum chloride/i);
		screen.getByText(/Ethanol/i);

		const sidebarFreezer = screen.getByRole('button', { name: 'Freezer' });
		await userEvent.click(sidebarFreezer);

		screen.getByText(/Aluminum chloride/i);
		expect(screen.queryByText(/Ethanol/i)).not.toBeInTheDocument();

		const sidebarAll = screen.getByRole('button', { name: 'All' });
		await userEvent.click(sidebarAll);

		screen.getByText(/Aluminum chloride/i);
		screen.getByText(/Ethanol/i);
	});

	test('Clicking a location that has no chemicals displays an empty inventory message.', async () => {
		render(Inventory, { locationsList, ordersList });

		const sidebarFridge = screen.getByRole('button', { name: 'Fridge' });
		await userEvent.click(sidebarFridge);
		screen.getByText(/There's nothing here!/i);
	});

	test('Clicking New presents an input field for new locations.', async () => {
		render(Inventory, { locationsList, ordersList });

		const sidebarNew = screen.getByRole('button', { name: 'New' });
		await userEvent.click(sidebarNew);
		screen.getByRole('textbox', { name: '' });
	});

	/* Attempting to submit nothing in the new location input box has no effect ? how to prove ? */

	test('Attempting to submit nothing in the new location input box has no effect.', async () => {
		render(Inventory, { locationsList, ordersList });

		const sidebarNew = screen.getByRole('button', { name: 'New' });
		await userEvent.click(sidebarNew);
		const inputNewLocation = screen.getByRole('textbox', { name: '' });
		await userEvent.click(inputNewLocation);
		await userEvent.keyboard('{Enter}');

		expect(screen.queryByText(/Connecting to server.../i)).not.toBeInTheDocument();
	});

	test('Submitting a new location, getting success from the server, provides a success message.', async () => {
		render(Inventory, { locationsList, ordersList });

		const sidebarNew = screen.getByRole('button', { name: 'New' });
		await userEvent.click(sidebarNew);
		const inputNewLocation = screen.getByRole('textbox', { name: '' });
		await userEvent.type(inputNewLocation, 'successfulLocation');
		await userEvent.keyboard('{Enter}');

		screen.getByText(/Connecting to server.../i);

		expect(await screen.findByText(/New Location Added/i)).toBeInTheDocument();
	});

	/*After removing invalidateAll() and updating locationList by javascript: */
	test('Submitting a new location, getting success from the server, displays the new location.', async () => {
		render(Inventory, { locationsList, ordersList });

		const sidebarNew = screen.getByRole('button', { name: 'New' });
		await userEvent.click(sidebarNew);
		const inputNewLocation = screen.getByRole('textbox', { name: '' });
		await userEvent.type(inputNewLocation, 'successfulLocation');
		await userEvent.keyboard('{Enter}');

		screen.getByText(/Connecting to server.../i);

		expect(await screen.findByText(/New Location Added/i)).toBeInTheDocument();
		expect(await screen.findByText(/successfulLocation/i)).toBeInTheDocument();
	});

	test('Submitting a new location, getting an error from the server, provides an error message.', async () => {
		render(Inventory, { locationsList, ordersList });

		const sidebarNew = screen.getByRole('button', { name: 'New' });
		await userEvent.click(sidebarNew);
		const inputNewLocation = screen.getByRole('textbox', { name: '' });
		await userEvent.type(inputNewLocation, 'failLocation');
		await userEvent.keyboard('{Enter}');

		screen.getByText(/Connecting to server.../i);

		expect(await screen.findByText(/Error connecting to database.../i)).toBeInTheDocument();
	});
});

describe('Accordion Tests', () => {
	let locationsList: locations[];
	let ordersList: orders[];
	beforeEach(() => {
		locationsList = [
			{
				id: 1,
				locationName: 'Freezer'
			},
			{
				id: 2,
				locationName: 'Drawer'
			},
			{
				id: 3,
				locationName: 'Fridge'
			}
		];

		ordersList = [
			{
				id: 72,
				amount: 10,
				amountUnit: 'mL',
				isConsumed: false,
				chemicalID: {
					id: 39,
					chemicalName: 'Ethanol',
					CAS: '64-17-5',
					MW: '46.07',
					MP: '-114.1 °C',
					BP: '78.5 °C',
					density: '0.789 g/cm<sup>3</sup> @ Temp: 20 °C',
					inchi: 'InChI=1S/C2H6O/c1-2-3/h3H,2H2,1H3',
					smile: 'C(C)O'
				},
				locationID: {
					id: 2,
					locationName: 'Drawer'
				},
				statusID: {
					id: 3,
					statusValue: 'received'
				}
			},
			{
				id: 64,
				amount: 64,
				amountUnit: 'g',
				isConsumed: false,
				chemicalID: {
					id: 28,
					chemicalName: 'Aluminum chloride',
					CAS: '7446-70-0',
					MW: '133.3',
					MP: '192.6 °C',
					BP: '182.7 °C @ Press: 752 Torr',
					density: '2.48 g/cm3',
					inchi: 'InChI=1S/Al.3ClH/h;3*1H/q+3;;;/p-3',
					smile: '[Al](Cl)(Cl)Cl'
				},
				locationID: {
					id: 1,
					locationName: 'Freezer'
				},
				statusID: {
					id: 3,
					statusValue: 'received'
				}
			}
		];
	});
	test('Clicking an order opens the first stage of the accordion.', async () => {
		render(Inventory, { locationsList, ordersList });

		const order = ordersList[0];

		await openAccordionItem(order);
		screen.getByText(/MODIFY/i);

		screen.getByText(/Remaining:/i);
		const amountInput = screen.getByTestId('amount');
		expect(amountInput).toHaveValue(order.amount);

		screen.getByText(order.amountUnit);

		screen.getByText(/Change Location:/i);
		if (!order.locationID) {
			screen.getByText(/Choose a storage location./i);
		} else {
			expect(screen.getByTestId('dropSelect').innerHTML).toBe(order.locationID.locationName);
			const locationIDInput = screen.getByPlaceholderText('locationID');
			expect(locationIDInput).toHaveValue(String(order.locationID.id));
		}
	});

	test('Clicking the title of an open order will close the accordion', async () => {
		render(Inventory, { locationsList, ordersList });
		const order = ordersList[0];

		await openAccordionItem(order);
		screen.getByText(/MODIFY/i);

		await openAccordionItem(order);
		expect(screen.queryByText(/MODIFY/i)).not.toBeInTheDocument();
	});

	test('Clicking an order while a different one is open will close the open one and open the closed one', async () => {
		render(Inventory, { locationsList, ordersList });
		const order = ordersList[0];

		await openAccordionItem(order);
		screen.getByText(/MODIFY/i);

		// but MODIFY will still be present! Need a different way to prove...
	});

	test('Clicking the location dropdown menu will provide the list of options.', async () => {
		render(Inventory, { locationsList, ordersList });

		const order = ordersList[0];
		await openAccordionItem(order);

		const locationDropdown = screen.getByTestId('dropSelect');
		await userEvent.click(locationDropdown);

		locationsList.forEach((location) => {
			screen.getByRole('option', { name: location.locationName });
		});
	});

	test('Able to modify the value of the order amount input field.', async () => {
		// console.log('before 47', ordersList[0]);
		render(Inventory, { locationsList, ordersList });
		const order = ordersList[0];
		await openAccordionItem(order);

		const amountInput = screen.getByTestId('amount');
		expect(amountInput).toHaveValue(order.amount);

		await changeAmountTo('47');

		expect(amountInput).toHaveValue(47);
		// console.log('after 47', ordersList[0]);
	});

	test('Selecting a different item from the locations dropdown menu will change the parent text and locationID.', async () => {
		// console.log('next 47', ordersList[0]);
		render(Inventory, { locationsList, ordersList });
		const order = ordersList[0];
		await openAccordionItem(order);

		const locationDropdown = screen.getByTestId('dropSelect');
		expect(locationDropdown.innerHTML).toBe('Freezer');
		const locationIDInput = screen.getByPlaceholderText('locationID');
		expect(locationIDInput).toHaveValue('1');

		await userEvent.click(locationDropdown);

		const drawerOption = screen.getByRole('option', { name: 'Drawer' });
		await userEvent.click(drawerOption);

		expect(locationDropdown.innerHTML).toBe('Drawer');
		expect(locationIDInput).toHaveValue('2');
	});

	test('Able to modify an order by changing the amount.', async (event) => {
		// console.log(event);
		render(Inventory, { locationsList, ordersList });

		server.use(
			rest.put(`${origin}/inventory`, async (req, res, ctx) => {
				// rest.put('/inventory', async (req, res, ctx) => {
				// console.log('req: ', req.url);
				return res(
					ctx.delay(100),
					ctx.json({
						locationObject: { id: 1, locationName: 'Freezer' },
						form: { success: true, error: null }
					})
				);
			})
		);
		// console.log('server: ', server);

		const order = ordersList[0];
		await openAccordionItem(order);

		await changeAmountTo('47');

		const submit = screen.getByText('✓');
		await userEvent.click(submit);

		screen.getByText(/Saving.../i);

		expect(await screen.findByText(/Saved./i)).toBeInTheDocument();
	});

	test('Entering a string instead of an amount results in a validation error.', async () => {
		render(Inventory, { locationsList, ordersList });

		const order = ordersList[0];
		await openAccordionItem(order);

		await changeAmountTo('not_a_number');

		const submit = screen.getByText('✓');
		await userEvent.click(submit);

		// expect(screen.queryByText(/Saving.../i)).not.toBeInTheDocument();
		screen.getByText(/Please enter an integer in the 'remaining' field./i);
	});

	test('An error message appears if the request fails when updating the order', async () => {
		server.use(
			rest.put(`${origin}/inventory`, async (req, res, ctx) => {
				// console.log('req: ', req.body);
				return res(
					ctx.delay(100),
					ctx.json({ form: { success: false, error: 'Error connecting to database...' } })
				);
			})
		);

		render(Inventory, { locationsList, ordersList });

		const order = ordersList[0];
		await openAccordionItem(order);

		await changeAmountTo('47');

		const submit = screen.getByText('✓');
		await userEvent.click(submit);

		screen.getByText(/Saving.../i);

		expect(await screen.findByText(/Error connecting to database.../i)).toBeInTheDocument();
	});

	/* *** this actually changes ordersList !? */
	test('Able to modify an order by changing the location.', async () => {
		server.use(
			rest.put(`${origin}/inventory`, async (req, res, ctx) => {
				// console.log('req: ', req);
				return res(
					ctx.delay(100),
					ctx.json({
						locationObject: { id: 2, locationName: 'Drawer' },
						form: { success: true, error: null }
					})
				);
			})
		);
		render(Inventory, { locationsList, ordersList });

		const order = ordersList[0];
		await openAccordionItem(order);

		const locationDropdown = screen.getByTestId('dropSelect');

		await userEvent.click(locationDropdown);

		const drawerOption = screen.getByRole('option', { name: 'Drawer' });
		await userEvent.click(drawerOption);

		const submit = screen.getByText('✓');
		await userEvent.click(submit);

		screen.getByText(/Saving.../i);

		expect(await screen.findByText(/Saved./i)).toBeInTheDocument();
	});

	test('When in a partiular inventory location, chaning the location to something else will make it dissappear', async () => {
		server.use(
			rest.put(`${origin}/inventory`, async (req, res, ctx) => {
				return res(
					ctx.delay(100),
					ctx.json({
						locationObject: { id: 2, locationName: 'Drawer' },
						form: { success: true, error: null }
					})
				);
			})
		);
		render(Inventory, { locationsList, ordersList });

		const sidebarFreezer = screen.getByRole('button', { name: 'Freezer' });
		await userEvent.click(sidebarFreezer);

		screen.getByText(/Aluminum chloride/i);

		const order = ordersList[0];
		await openAccordionItem(order);

		const locationDropdown = screen.getByTestId('dropSelect');

		await userEvent.click(locationDropdown);

		const drawerOption = screen.getByRole('option', { name: 'Drawer' });
		await userEvent.click(drawerOption);

		const submit = screen.getByText('✓');
		await userEvent.click(submit);

		await waitForElementToBeRemoved(submit);

		expect(screen.queryByText(/Aluminum chloride/i)).not.toBeInTheDocument();
		expect(screen.queryByText(/MODIFY/i)).not.toBeInTheDocument();
		screen.getByText(/There's nothing here!/i);
	});

	test('Clicking the triangle opens the second stage of the accordion', async () => {
		render(Inventory, { locationsList, ordersList });

		const order = ordersList[0];
		await openAccordionItem(order);

		const triangle = screen.getByText(/▽/i);
		await userEvent.click(triangle);

		screen.getByText(/PROPERTIES/i);
		screen.getByText(`MW: ${order.chemicalID.MW}`);
		screen.getByText(`BP: ${order.chemicalID.BP}`);
		screen.getByText(`MP: ${order.chemicalID.MP}`);
		screen.getByText(`Density: ${order.chemicalID.density}`);
		screen.getByText(`CAS: ${order.chemicalID.CAS}`);
	});

	test('Clicking the triangle a second time closes the second stage of the accordion', async () => {
		render(Inventory, { locationsList, ordersList });

		const order = ordersList[0];
		await openAccordionItem(order);

		const triangle = screen.getByText(/▽/i);
		await userEvent.click(triangle);

		screen.getByText(/PROPERTIES/i);

		await userEvent.click(triangle);
		expect(screen.queryByText(/PROPERTIES/i)).not.toBeInTheDocument();
	});

	test('Clicking an order opens the first stage of the accordion and will close both first and second stage of an order open to the second stage.', async () => {
		render(Inventory, { locationsList, ordersList });

		const order = ordersList[0];
		await openAccordionItem(order);

		const triangle = screen.getByText(/▽/i);
		await userEvent.click(triangle);

		screen.getByText(/PROPERTIES/i);

		const order2 = ordersList[1];
		await openAccordionItem(order2);

		expect(screen.queryByText(/PROPERTIES/i)).not.toBeInTheDocument();
	});
});
