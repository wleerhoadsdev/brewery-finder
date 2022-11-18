import { screen } from '@testing-library/react';
import * as React from 'react';
// customer render function that provides BrowserRouter support
import {
  renderWithLocationState,
  unauthenticatedBreweryInformationState,
} from '../../testUtils';

import ViewBrewery from './ViewBrewery';

describe('ViewBrewery component', () => {
  test('render ViewBrewery component', async () => {
    renderWithLocationState(
      <ViewBrewery />,
      unauthenticatedBreweryInformationState
    );
    expect(await screen.findByText(/Brewery 1/)).toBeInTheDocument();
  });
});
