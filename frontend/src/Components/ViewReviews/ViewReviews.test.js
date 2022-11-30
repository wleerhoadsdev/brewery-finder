import { render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';

import App from '../../App';

describe('ViewReviews component', () => {
    const route = '/brewery/1/beers/1';

    test('renders ViewReviews component', async () => {
        render(
            <MemoryRouter initialEntries={[route]}>
                <App />
            </MemoryRouter>
        );

        const titleElement = await screen.findByRole('heading', {
            level: 2,
        });

        expect(titleElement).toHaveTextContent(/Reviews/i);
    });

    test('expects test review information to be rendered on page', async () => {
        render(
            <MemoryRouter initialEntries={[route]}>
                <App />
            </MemoryRouter>
        );

        const reviewTitleElements = await screen.findAllByRole('heading', {
            level: 3,
        });
        const reviewBodyElement = screen.getByText(
            /I drove 15 miles to have it again/i
        );

        expect(reviewTitleElements[0]).toHaveTextContent(/Good beer/i);
        expect(reviewBodyElement).toBeInTheDocument();
    });
});
