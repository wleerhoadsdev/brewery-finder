import * as React from 'react';
// customer render function that provides BrowserRouter support
import { renderWithRouter } from '../../testUtils';

import Login from './Login';

describe('Login component', () => {
  test('renders Login component', () => {
    renderWithRouter(<Login />);
  });
});
