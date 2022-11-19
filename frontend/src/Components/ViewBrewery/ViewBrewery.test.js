import { render, screen } from '@testing-library/react';
import * as React from 'react';
import { MemoryRouter } from 'react-router';
// customer render function that provides BrowserRouter support
import {
  renderWithLocationState,
  unauthenticatedBreweryInformationState,
} from '../../testUtils';

import ViewBrewery from './ViewBrewery';
import App from '../../App';

describe('ViewBrewery component', () => {
  test('render ViewBrewery component', async () => {
    const route = '/brewery/1';
    render(
      <MemoryRouter initialEntries={[route]}>
        <App />
      </MemoryRouter>
    );
    screen.debug();
    expect(await screen.findByText(/Brewery 1/)).toBeInTheDocument();
  });
});
