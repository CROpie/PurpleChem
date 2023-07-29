import '@testing-library/jest-dom';
import { describe, expect } from 'vitest';
import { render, waitFor, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { server } from '$lib/mocks/server';
import { rest } from 'msw';
import FormComponent from './FormComponent.svelte';

describe('Test', () => {
	test('Writing an Email will change the value of the input field', async () => {
		rest.post('http://localhost:3000/undefined', async (req, res, ctx) => {
			console.log(req);
			return res(
				ctx.delay(100),
				ctx.json({ type: 'success', status: 200, data: '[{"fruit":1},"abcde"]' })
			);
		});

		render(FormComponent);

		const fruit = 'nectarine';
		const fruitInputElement = screen.getByTestId('inputFruit');
		const button = screen.getByTestId('button');

		await userEvent.type(fruitInputElement, fruit);
		await userEvent.click(button);
		screen.debug();

		await waitFor(() => {
			screen.getByText(/Fruit/i);
		});
		screen.debug();
	});
});
