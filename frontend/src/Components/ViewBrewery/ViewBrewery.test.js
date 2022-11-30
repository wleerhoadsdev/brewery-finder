import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { renderWithRouter } from '../../testUtils';
import { toBeInTheDocument } from '@testing-library/jest-dom/dist/matchers';

import ViewBrewery from './ViewBrewery';
import App from '../../App';

describe('ViewBrewery component', () => {
    const route = '/brewery/1';

    test('renders ViewBrewery component', () => {
        render(
            <MemoryRouter initialEntries={[route]}>
                <ViewBrewery />
            </MemoryRouter>
        );

        expect(screen.getByText('View Brewery Beer List')).toBeInTheDocument();
    });

    test('expects test brewery to be rendered on page', async () => {
        render(
            <MemoryRouter initialEntries={[route]}>
                <App />
            </MemoryRouter>
        );

        const titleElement = await screen.findByText(/Brewery 1/i);
        const emailElement = screen.getByText(/aaa@yahoo.com/i);
        const beerListElement = screen.getByText(/View Brewery Beer List/i);

        expect(titleElement).toBeInTheDocument();

        expect(beerListElement).toBeInTheDocument();

        expect(emailElement).toBeInTheDocument();
    });
});
