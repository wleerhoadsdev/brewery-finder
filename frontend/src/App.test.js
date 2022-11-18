import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
// customer render function that provides BrowserRouter support
import { renderWithRouter } from './testUtils';

import App from './App';

// defines test suite for this component
describe('App component tests', () => {

  // individual test within test suite
  test('renders App component', () => {

    // renders component
    renderWithRouter(<App />);

    // checks to see if text is visible on Home page using regex
    expect(screen.getByText(/Discover your new favorite beer/i)).toBeInTheDocument();
  });

  test('full app rendering and navigating to Login page', () => {
    renderWithRouter(<App />);
    expect(
      screen.getByText(/Discover your new favorite beer/i)
    ).toBeInTheDocument();

    // simulates user input of clicking on an element
    userEvent.click(screen.getByText(/SIGN IN/i));

    expect(screen.getByText(/Please Sign In/i)).toBeInTheDocument();
  });

  /* 
  If testing components that rely on an API you must make the test an async test and use await screen.findByText() te wait for the elements to appear
  */
  test('full app rendering and navigating to ViewBrewery page', async () => {
    renderWithRouter(<App />);

    userEvent.click(screen.getByText(/View All Breweries/i));

    expect(screen.getByText(/Below are our List of Breweries!/i)).toBeInTheDocument();

    expect(await screen.findByText(/Brewery 1/)).toBeInTheDocument();

    userEvent.click(screen.getByText(/Brewery 1/i));

    expect(await screen.findByText(/Brewery 1/)).toBeInTheDocument();

  });

});
