import { render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';

import AddReview from './AddReview';

describe('AddReview component', () => {
    const route = '/';

    const userPropsMock = {
        id: 1,
        username: 'user',
        authorities: [{ name: 'ROLE_USER' }],
        name: 'user',
        emailAddress: 'user@test.com',
    };

    test('renders AddReview component to unauthenticated user', async () => {
        render(
            <MemoryRouter initialEntries={[route]}>
                <AddReview />
            </MemoryRouter>
        );

        const titleElement = await screen.findByRole('heading', {
            level: 1,
        });

        expect(titleElement).toHaveTextContent(
            /You are not authorized to view this page/i
        );
    });

    test('renders AddReview component to authorized user', async () => {
        render(
            <MemoryRouter initialEntries={[route]}>
                <AddReview user={userPropsMock} />
            </MemoryRouter>
        );

        const titleElement = screen.getByRole('heading', {
            level: 1,
        });

        expect(titleElement).toHaveTextContent(/Add a review/i);
    });
});
