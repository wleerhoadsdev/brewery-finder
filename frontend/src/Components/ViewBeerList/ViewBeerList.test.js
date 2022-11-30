import { render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';

import App from '../../App';

describe('ViewBeerList component', () => {
    const route = '/brewery/1/beers';

    test('renders ViewBeerList component', async () => {
        render(
            <MemoryRouter initialEntries={[route]}>
                <App />
            </MemoryRouter>
        );

        const titleElement = screen.getByText(/List of Beers/i);

        const allBreweriesLinkElement = screen.getByText(/View All Breweries/i);

        expect(titleElement).toBeInTheDocument();
        expect(allBreweriesLinkElement).toBeInTheDocument();
    });

    test('expects test beer to be rendered on page', async () => {
        render(
            <MemoryRouter initialEntries={[route]}>
                <App />
            </MemoryRouter>
        );

        const beerNameElement = await screen.findByRole('link', {
            name: 'Blonde',
        });

        expect(beerNameElement).toBeInTheDocument();
    });
});
