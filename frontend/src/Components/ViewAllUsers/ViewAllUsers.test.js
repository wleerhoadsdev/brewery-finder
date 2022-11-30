import { render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';

import ViewAllUsers from './ViewAllUsers';
import App from '../../App';

describe('ViewAllUsers component', () => {
    const route = '/users';

    const userPropsMock = {
        id: 2,
        username: 'admin',
        authorities: [{ name: 'ROLE_ADMIN' }],
        name: 'admin',
        emailAddress: 'admin@test.com',
    };

    test('renders ViewAllUsers component to unauthorized user', async () => {
        render(
            <MemoryRouter initialEntries={[route]}>
                <App />
            </MemoryRouter>
        );

        const titleElement = await screen.findByRole('heading', {
            level: 1,
        });

        expect(titleElement).toHaveTextContent(
            /You are not authorized to view this page./i
        );
    });

    test('renders ViewAllUsers component to admin user', async () => {
        render(
            <MemoryRouter initialEntries={[route]}>
                <ViewAllUsers user={userPropsMock} />
            </MemoryRouter>
        );

        const titleElement = await screen.findByRole('heading', {
            level: 1,
        });

        expect(titleElement).toHaveTextContent(/View All Users/i);
    });
});
