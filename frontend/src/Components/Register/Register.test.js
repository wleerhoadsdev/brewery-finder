import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { renderWithRouter } from '../../testUtils';
import { toBeInTheDocument } from '@testing-library/jest-dom/dist/matchers';

import Register from './Register';
import App from '../../App';

describe('Register component', () => {
    const route = '/register';

    test('renders Register component', async () => {
        render(
            <MemoryRouter initialEntries={[route]}>
                <App />
            </MemoryRouter>
        );

        const titleElement = await screen.findByRole('heading', {
            level: 1,
        });

        const usernameInputElement = screen.getByPlaceholderText(/Username/i);
        const nameInputElement = screen.getByPlaceholderText('Name');
        const emailInputElement = screen.getByPlaceholderText(/Email/i);
        const passwordInputElement = screen.getByPlaceholderText('Password');
        const confirmPassordInputElement =
            screen.getByPlaceholderText(/Confirm Password/i);

        expect(titleElement).toHaveTextContent('Create Account');
        expect(usernameInputElement).toBeInTheDocument();
        expect(nameInputElement).toBeInTheDocument();
        expect(emailInputElement).toBeInTheDocument();
        expect(passwordInputElement).toBeInTheDocument();
        expect(confirmPassordInputElement).toBeInTheDocument();
    });
});
