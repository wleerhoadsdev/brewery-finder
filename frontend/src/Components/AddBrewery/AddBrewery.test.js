import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { renderWithRouter } from '../../testUtils';
import { toBeInTheDocument } from '@testing-library/jest-dom/dist/matchers';

import AddBrewery from './AddBrewery';
import App from '../../App';

describe('AddBrewery component', () => {
    const route = '/';
    const userPropsMock = {
        id: 2,
        username: 'admin',
        authorities: [{ name: 'ROLE_ADMIN' }],
        name: 'admin',
        emailAddress: 'admin@test.com',
    };

    test('renders AddBrewery component to unauthenticated user', async () => {
        render(
            <MemoryRouter initialEntries={[route]}>
                <AddBrewery />
            </MemoryRouter>
        );

        const titleElement = await screen.findByRole('heading', {
            level: 1,
        });

        expect(titleElement).toHaveTextContent(
            /You are not authorized to view this page/i
        );
    });

    test('renders AddBrewery component to authorized admin user', async () => {
        render(
            <MemoryRouter initialEntries={[route]}>
                <AddBrewery
                    user={userPropsMock}
                />
            </MemoryRouter>
        );

        const titleElement = screen.getByRole('heading', {
            level: 3,
        });

        expect(titleElement).toHaveTextContent(/Add Brewery Form/i);
    });
});
