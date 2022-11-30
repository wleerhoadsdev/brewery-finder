import { render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';

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

        expect(titleElement).toHaveTextContent('Welcome to Beer Lovers');
        expect(usernameInputElement).toBeInTheDocument();
        expect(nameInputElement).toBeInTheDocument();
        expect(emailInputElement).toBeInTheDocument();
        expect(passwordInputElement).toBeInTheDocument();
        expect(confirmPassordInputElement).toBeInTheDocument();
    });
});
