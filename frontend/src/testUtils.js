import { render as rtlRender } from '@testing-library/react';
import { BrowserRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

export const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);

  return rtlRender(ui, { wrapper: BrowserRouter });
};

export const renderWithLocationState = (ui, stateObj) => {
  const history = createMemoryHistory();
  const state = stateObj;
  history.push('/', state);

  return rtlRender(<Router history={history}>{ui}</Router>);
};

export const breweryDataState = {
  breweryId: 1,
  breweryOwnerUserId: 3,
  name: 'Brewery 1',
  isActive: true,
  isApproved: true,
  history: 'since 1966',
  hoursOfOperation: '12:00 - 23:00',
  address: {
    street: '1-st str',
    city: 'NY',
    state: 'NY',
    zipCode: '95100',
    country: 'USA',
  },
  phoneNumber: '111-222-3333',
  emailAddress: 'aaa@yahoo.com',
  homePageUrl: 'http://aaabrewery.com',
  imageUrl:
    'https://images.unsplash.com/photo-1651475828382-1ffeea47739b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8?crop=bottom&w=1620&h=1080&fit=crop&q=80',
};

export const unauthenticatedBreweryInformationState = {
  breweryId: 1,
  isMyBrewery: false,
};
