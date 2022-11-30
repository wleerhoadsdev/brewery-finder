import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { renderWithRouter } from '../../testUtils';
import { toBeInTheDocument } from '@testing-library/jest-dom/dist/matchers';

import Navbar from './Navbar';
import App from '../../App';

describe('Navbar component', () => {
    const homeRoute = '/';
    const breweryListRoute = '/breweries';

    test('renders Navbar component to unauthenticated user on home page', async () => {
        render(
            <MemoryRouter initialEntries={[homeRoute]}>
                <App />
            </MemoryRouter>
        );

        const homeNavLinkElement = screen.queryByText(/HOME/i);
        const signInNavLinkElement = screen.getByText(/SIGN IN/i);
        const createAccountNavLinkElement = screen.getByText(/CREATE ACCOUNT/i);

        expect(homeNavLinkElement).not.toBeInTheDocument();
        expect(signInNavLinkElement).toBeInTheDocument();
        expect(createAccountNavLinkElement).toBeInTheDocument();
    });

    test('renders Navbar component to unauthenticated user on view all breweries page', async () => {
        render(
            <MemoryRouter initialEntries={[breweryListRoute]}>
                <App />
            </MemoryRouter>
        );

        const homeNavLinkElement = screen.getByText(/HOME/i);
        const signInNavLinkElement = screen.getByText(/SIGN IN/i);
        const createAccountNavLinkElement = screen.getByText(/CREATE ACCOUNT/i);

        expect(homeNavLinkElement).toBeInTheDocument();
        expect(signInNavLinkElement).toBeInTheDocument();
        expect(createAccountNavLinkElement).toBeInTheDocument();
    });

    // TODO: Figure out permission based tests
    // test('renders Navbar component to user with admin privleges', async () => {
    //     render(
    //         <MemoryRouter initialEntries={[route]}>
    //             <App />
    //         </MemoryRouter>
    //     );

    //     const reviewTitleElements = await screen.findAllByRole('heading', {
    //         level: 4,
    //     });
    //     const reviewBodyElement = screen.getAllByText(
    //         /I drove 15 miles to have it again/i
    //     );

    //     expect(reviewTitleElements[0]).toHaveTextContent(/Good beer/i);
    //     expect(reviewBodyElement).toBeInTheDocument();
    // });
});
