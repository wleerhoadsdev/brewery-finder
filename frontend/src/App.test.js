import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import '@testing-library/jest-dom';
import App from './app';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { renderWithRouter } from './testUtils';

describe('App component', () => {
    test('full app rendering/navigating', async () => {
        const { user } = renderWithRouter(<App />);
        expect(
            screen.getByText(/Discover your new favorite beer/i)
        ).toBeInTheDocument();

        await user.click(screen.getByText(/View All Breweries/i));

        expect(
            await screen.findByText(/Below is our List of Breweries!/i)
        ).toBeInTheDocument();
    });

    // test('landing on a bad page', () => {
    //     const badRoute = '/brewery/1';

    //     // use <MemoryRouter> when you want to manually control the history
    //     render(
    //         <MemoryRouter initialEntries={[badRoute]}>
    //             <App />
    //         </MemoryRouter>
    //     );

    //     // verify navigation to "no match" route
    //     expect(screen.getByText(/no match/i)).toBeInTheDocument();
    // });
});

// test('landing on a bad page', () => {
//     renderWithRouter(<App />, { route: '/something-that-does-not-match' });

//     expect(screen.getByText(/no match/i)).toBeInTheDocument();
// });
