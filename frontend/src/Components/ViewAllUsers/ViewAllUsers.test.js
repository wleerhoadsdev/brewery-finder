import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { renderWithRouter } from '../../testUtils';
import { toBeInTheDocument } from '@testing-library/jest-dom/dist/matchers';

import ViewAllUsers from './ViewAllUsers';
import App from '../../App';

describe('ViewAllUsers component', () => {
    const route = '/users';

    test('renders ViewAllUsers component to unauthorized user', async () => {
        render(
            <MemoryRouter initialEntries={[route]}>
                <App />
            </MemoryRouter>
        );

        const titleElements = await screen.findAllByRole('heading', {
            level: 3,
        });

        expect(titleElements[0]).toHaveTextContent(/Page to View All Users/i);
        expect(titleElements[1]).toHaveTextContent(
            /You are not authorized to view this page./i
        );
    });

    // TODO: Figure out permission based tests
    // test('renders ViewAllUsers component to user with admin privleges', async () => {
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
