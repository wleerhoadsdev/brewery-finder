import { render, screen } from '@testing-library/react';
import * as React from 'react';
// customer render function that provides BrowserRouter support
import {
  renderWithLocationState,
  breweryDataState,
} from '../../testUtils';

import AddBeer from './AddBeer';

describe('AddBeer component', () => {
  test('attempting to navigate to AddBeer while not a brewer will return unauthorized message', () => {
    /* 
    Custom render method that allows you to assign location.state to a component.

    State should be stored in the testUtils.js file and exported to use in this test.

    */
    render(<AddBeer />, breweryDataState);

    expect(
      screen.getByText(/You are not authorized to view this page./i)
    ).toBeInTheDocument();
  });
});
