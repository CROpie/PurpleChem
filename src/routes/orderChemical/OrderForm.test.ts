import '@testing-library/jest-dom';
import { describe, expect } from 'vitest';
import { render, waitFor, screen, fireEvent, getByTestId } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { server } from '$lib/mocks/server';
import { rest } from 'msw';
import OrderForm from './OrderForm.svelte';

type FormResult = {
	success: boolean;
	error: string | null;
} | null;

const form: FormResult = {
	success: false,
	error: null
};

describe('Initial Render', () => {
	test('Some sort of test', async () => {
		// TODO
	});
});

describe('CAS Search', () => {
	test('CAS search displays searching and for success, found, messages', async () => {
		render(OrderForm);
		const CASInput = screen.getByTestId('CASInput');
		const CASSubmit = screen.getByRole('button', { name: 'SEARCH' });

		await userEvent.click(CASInput);
		await userEvent.type(CASInput, '121-44-8');

		await userEvent.click(CASSubmit);
		screen.getByText(/Searching.../i);
		await screen.findByText(/properties have been imported/i);
		screen.debug();

		const MW = screen.getByPlaceholderText('MW');
		const MP = screen.getByPlaceholderText('MP');
		const BP = screen.getByPlaceholderText('BP');
		const density = screen.getByPlaceholderText('density');

		expect(MW).toHaveValue('101.3');
		expect(MP).toHaveValue('-114.7 °C');
		expect(BP).toHaveValue('89.3 °C');
		expect(density).toHaveValue('0.7255 g/cm³ @ Temp: 25 °C');

		// searching..
		// properties have been imported
		// no information from this CAS number was obtained
	});
});

/*
				chemicalName: 'triethylamine',
				MW: 101.3,
				inchi: 'InChI=1S/C6H15N/c1-4-7(5-2)6-3/h4-6H2,1-3H3',
				smile: 'N(CC)(CC)CC',
				experimentalProperties: [
					{
						name: 'Boiling Point',
						property: '89.3 °C',
						sourceNumber: 1
					},
					{
						name: 'Melting Point',
						property: '-114.7 °C',
						sourceNumber: 1
					},
					{
						name: 'Density',
						property: '0.7255 g/cm³ @ Temp: 25 °C',
						sourceNumber: 1
					}
				]
                */
