import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { renderWithRouter } from '../../testUtils';
import { toBeInTheDocument } from '@testing-library/jest-dom/dist/matchers';

import Home from './Home';
import App from '../../App';

describe('Home component', () => {
    const route = '/';

    test('renders Home component to unauthorized user', async () => {
        render(
            <MemoryRouter initialEntries={[route]}>
                <App />
            </MemoryRouter>
        );

        const titleElement = screen.getByRole('heading', {
            level: 3,
        });

        expect(titleElement).toHaveTextContent(
            /Discover your new favorite beer/i
        );
    });

    // TODO: Figure out permission based tests
    // test('renders Home component to user with admin privleges', async () => {
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
