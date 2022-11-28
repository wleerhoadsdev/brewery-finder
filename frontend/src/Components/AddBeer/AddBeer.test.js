import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { renderWithRouter } from '../../testUtils';
import { toBeInTheDocument } from '@testing-library/jest-dom/dist/matchers';

import AddBeer from './AddBeer';
import App from '../../App';

describe('AddBeer component', () => {
    const route = '/';
    const userPropsMock = {
        id: 3,
        username: 'brewer1',
        authorities: [{ name: 'ROLE_BREWER' }],
        name: 'Brewer McBrewer',
        emailAddress: 'brewer1@test.com',
    };
    const beerTypesPropsMock = [
        { typeId: 9, style: 'Belgian-Style Ale' },
        { typeId: 4, style: 'Brown Ale' },
        { typeId: 3, style: 'Dark Lager' },
        { typeId: 6, style: 'India Pale Ale' },
        { typeId: 5, style: 'Pale Ale' },
        { typeId: 1, style: 'Pale Lager' },
        { typeId: 2, style: 'Pilsner' },
        { typeId: 7, style: 'Porter' },
        { typeId: 12, style: 'Specialty Beer' },
        { typeId: 8, style: 'Stout' },
        { typeId: 10, style: 'Wheat Beer' },
        { typeId: 11, style: 'Wild & Sour Ale' },
    ];

    test('renders AddBeer component to unauthenticated user', async () => {
        render(
            <MemoryRouter initialEntries={[route]}>
                <AddBeer beerTypes={beerTypesPropsMock} />
            </MemoryRouter>
        );
        const titleElement = await screen.findByRole('heading', {
            level: 1,
        });

        expect(titleElement).toHaveTextContent(
            /You are not authorized to view this page/i
        );
    });

    test('renders AddBeer component to authorized admin user', async () => {
        render(
            <MemoryRouter initialEntries={[route]}>
                <AddBeer
                    beerTypes={beerTypesPropsMock}
                    user={userPropsMock}
                />
            </MemoryRouter>
        );

        const titleElement = screen.getByRole('heading', {
            level: 1,
        });

        expect(titleElement).toHaveTextContent(/Add a new beer/i);
    });
});
