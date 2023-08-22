import '@testing-library/jest-dom';
import { describe, expect } from 'vitest';
import { render, waitFor, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { server } from '$lib/mocks/server';
import { rest } from 'msw';
import LoginForm from '../../routes/LoginForm.svelte';

type FormResult = {
	success: boolean;
	error: string | null;
} | null;

const form: FormResult = {
	success: false,
	error: null
};

// const message = screen.getByTestId('message');

const typeInEmailPasswordAndSubmit = async (email: string | null, password: string | null) => {
	const emailInputElement = screen.getByTestId('inputEmail');
	const passwordInputElement = screen.getByTestId('inputPassword');
	const button = screen.getByTestId('button');

	if (email) {
		await userEvent.type(emailInputElement, email);
	}

	if (password) {
		await userEvent.type(passwordInputElement, password);
	}

	await userEvent.click(button);
};

describe('Test', () => {
	const baseUrl = window.location.href;
	// console.log(window.location.href);
	// console.log(location.href);
	test('Writing an Email will change the value of the input field', async () => {
		render(LoginForm);

		const email = 'chris@purplechem.com';
		const emailInputElement = screen.getByTestId('inputEmail');

		await userEvent.type(emailInputElement, email);
		expect(emailInputElement).toHaveValue(email);
	});

	test('Writing a password will change the value of the input field', async () => {
		render(LoginForm);

		const password = 'default';
		const passwordInputElement = screen.getByTestId('inputPassword');

		await userEvent.type(passwordInputElement, password);
		expect(passwordInputElement).toHaveValue(password);
	});

	test('No messages before submit button pressed', async () => {
		render(LoginForm);

		expect(screen.queryByText(/Connecting to server.../i)).not.toBeInTheDocument();
		expect(screen.queryByText(/Redirecting../i)).not.toBeInTheDocument();
		expect(screen.queryByText(/Request failed.../i)).not.toBeInTheDocument();
	});

	test('Success message appears after a successful login', async () => {
		render(LoginForm);

		await typeInEmailPasswordAndSubmit('chris@purplechem.com', 'default');
		// if this text doesn't show, the test will fail
		// some delay on the server (0.1 sec currently) is required
		await waitFor(() => {
			screen.getByText(/Connecting to server.../i);
		});
		await waitFor(() => {
			screen.getByText(/Redirecting../i);
		});
	});

	test('Fail message appears after an unsuccessful login attempt', async () => {
		render(LoginForm);
		server.use(
			// rest.post('http://localhost:5173/', async (req, res, ctx) => {
			rest.post(`${baseUrl}`, async (req, res, ctx) => {
				// console.log(req, res, ctx);
				return res(ctx.delay(0.1), ctx.json({ success: false, error: 'Request failed...' }));
			})
		);
		await typeInEmailPasswordAndSubmit('chris@purplechem.com', 'default');

		await waitFor(() => {
			screen.getByText(/Connecting to server.../i);
		});
		await waitFor(() => {
			screen.getByText(/Request failed.../i);
		});
	});

	test('No attempt to connect to server when no email supplied', async () => {
		render(LoginForm);

		server.use(
			rest.post(`${baseUrl}`, async (req, res, ctx) => {
				return res(ctx.delay(0.1), ctx.json({ success: false, error: 'Request failed...' }));
			})
		);

		await typeInEmailPasswordAndSubmit(null, 'default');

		// queryByText returns null when not found.
		// if getByText were used, an error would be thrown.

		expect(screen.queryByText(/Connecting to server.../i)).not.toBeInTheDocument();
	});

	test('No attempt to connect to server when no password supplied', async () => {
		render(LoginForm);

		server.use(
			rest.post(`${baseUrl}`, async (req, res, ctx) => {
				return res(ctx.delay(0.1), ctx.json({ success: false, error: 'Request failed...' }));
			})
		);

		await typeInEmailPasswordAndSubmit('chris@purplechem.com', null);

		expect(screen.queryByText(/Connecting to server.../i)).not.toBeInTheDocument();
	});

	test('No attempt to connect to server when username instead of email supplied', async () => {
		render(LoginForm);

		server.use(
			rest.post(`${baseUrl}`, async (req, res, ctx) => {
				return res(ctx.delay(0.1), ctx.json({ success: false, error: 'Request failed...' }));
			})
		);

		await typeInEmailPasswordAndSubmit('chris', 'default');

		expect(screen.queryByText(/Connecting to server.../i)).not.toBeInTheDocument();
	});
});
