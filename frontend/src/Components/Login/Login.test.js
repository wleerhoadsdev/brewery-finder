import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { renderWithRouter } from '../../testUtils';

import Login from './Login';

describe('Login component', () => {
    test('renders Login component', () => {
        renderWithRouter(<Login />);
    });

    test('Login test', () => {
        const route = '/login';

        // use <MemoryRouter> when you want to manually control the history
        render(
            <MemoryRouter initialEntries={[route]}>
                <Login />
            </MemoryRouter>
        );
    });
});
