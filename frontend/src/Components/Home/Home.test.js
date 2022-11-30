import { render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';

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
            level: 1,
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
