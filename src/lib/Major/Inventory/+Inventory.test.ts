import '@testing-library/jest-dom';
import { describe, expect } from 'vitest';
import { render, waitFor, screen, fireEvent } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { server } from '$lib/mocks/server';
import { rest } from 'msw';
import Inventory from './Inventory.svelte';

type FormResult = {
	success: boolean;
	error: string | null;
} | null;

const form: FormResult = {
	success: false,
	error: null
};

const locationsList = [
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

const ordersList = [
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

describe('Initial Render', () => {
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

	test('Sidebar All starts as selected, unsorted does not.', async () => {
		render(Inventory, { locationsList, ordersList });
		const sidebarAll = screen.getByRole('button', { name: 'All' });
		const sidebarAllDiv = sidebarAll.parentElement;

		const sidebarUnsorted = screen.getByRole('button', { name: 'Unsorted' });
		const sidebarUnsortedDiv = sidebarUnsorted.parentElement;

		expect(sidebarAllDiv?.classList.contains('text-complement')).toBe(true);
		expect(sidebarUnsortedDiv?.classList.contains('text-complement')).toBe(false);
		expect(sidebarUnsortedDiv?.classList.contains('text-primary')).toBe(true);
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

	/* Attempting to submit nothing in the new location input box has no effect ?? */

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

	describe('Accordion Tests', () => {
		test('Clicking an order opens the first stage of the accordion.', async () => {
			render(Inventory, { locationsList, ordersList });

			const order = ordersList[0];
			const orderAccordionTitle = screen.getByText(
				`${order.chemicalID.chemicalName} (${order.id})`
			);
			await userEvent.click(orderAccordionTitle);
			// opens, but what do I want to look for? Everything I guess..
			screen.debug();
		});
	});

	/*
	test('Clicking a chemical opens the first stage of the accordion', async () => {
		render(Inventory, { locationsList, ordersList });
		server.use(
			rest.put('http://localhost:5173/inventory', async (req, res, ctx) => {
				console.log(req.body);
				return res(
					ctx.delay(0.1),
					// ctx.json({ success: true, error: null })
					ctx.json({ success: false, error: 'Error connecting to database...' })
				);
			})
		);
		screen.debug();
		const alcl = screen.getByText(/aluminum chloride/i);
		await userEvent.click(alcl);
		screen.debug();

		const dropSelect = screen.getByTestId(/dropSelect/i);
		await userEvent.click(dropSelect);
		screen.debug();

		const drawer = screen.getByText(/Drawer/i, { selector: 'button' });
		await userEvent.click(drawer);
		screen.debug();

		const inputAmount = screen.getByTestId(/amount/i);
		await userEvent.click(inputAmount);
		await userEvent.keyboard('{Backspace}');
		await userEvent.keyboard('{Backspace}');
		await userEvent.type(inputAmount, '50');
		screen.debug(); // no way to know if anything has changed unless print {order.amount}?
		// values don't show up on input fields for some reason

		// but can still use expectvalue or something on the input field.. just not debug()

		const submit = screen.getByText('✓');
		await userEvent.click(submit);

		screen.debug(); // Saving...

		await waitFor(() => {
			screen.getByText(/Error connecting to database.../i);
			// screen.getByText(/New Location Added/i);
		});
		screen.debug();
	});
    */
	/*
	test('Clicking a chemical opens the first stage of the accordion', async () => {
		render(Inventory, { locationsList, ordersList });

		const alcl = screen.getByText(/aluminum chloride/i);
		await userEvent.click(alcl);

		const triangle = screen.getByText(/▽/i);
		await userEvent.click(triangle);
		screen.debug();
	});
*/
});
