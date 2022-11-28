import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { renderWithRouter } from '../../testUtils';
import { toBeInTheDocument } from '@testing-library/jest-dom/dist/matchers';

import ViewAllBreweries from './ViewAllBreweries';
import App from '../../App';

describe('ViewAllBreweries component', () => {
    const route = '/breweries';

    test('renders ViewAllBrewery component', () => {
        render(
            <MemoryRouter initialEntries={[route]}>
                <ViewAllBreweries />
            </MemoryRouter>
        );

        expect(
            screen.getByText('Below is our List of Breweries!')
        ).toBeInTheDocument();

        expect(screen.getByText('Brewery Name')).toBeInTheDocument();

        expect(screen.getByText('City')).toBeInTheDocument();

        expect(screen.getByText('State')).toBeInTheDocument();
    });

    test('expects test brewery to be rendered on page', async () => {
        render(
            <MemoryRouter initialEntries={[route]}>
                <ViewAllBreweries />
            </MemoryRouter>
        );

        expect(await screen.findByText(/Brewery 1/i)).toBeInTheDocument();
        expect(
            screen.getAllByRole('link')[1]
        ).toBeInTheDocument();
    });

});
