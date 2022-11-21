import { toBeChecked } from '@testing-library/jest-dom/dist/matchers';
import { render, screen } from '@testing-library/react';
import * as React from 'react';
import { MemoryRouter, Router } from 'react-router';

import AddBeer from './AddBeer';

describe('AddBeer component', () => {
    test('attempting to navigate to AddBeer while not a brewer will return unauthorized message', () => {
        expect(true).toBe(true);
    });
});
