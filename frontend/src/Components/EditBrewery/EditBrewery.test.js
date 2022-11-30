import { render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';

import EditBrewery from './EditBrewery';

describe('EditBrewery component', () => {
    const route = '/';
    const breweryDataPropsMock = {
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
    const userPropsMock = {
        id: 3,
        username: 'brewer1',
        authorities: [{ name: 'ROLE_BREWER' }],
        name: 'Brewer McBrewer',
        emailAddress: 'brewer1@test.com',
    };

    test('renders EditBrewery component to unauthenticated user', async () => {
        render(
            <MemoryRouter initialEntries={[route]}>
                <EditBrewery
                    breweryData={breweryDataPropsMock}
                    //user={userPropsMock}
                />
            </MemoryRouter>
        );

        const titleElement = await screen.findByRole('heading', {
            level: 1,
        });

        expect(titleElement).toHaveTextContent(
            /You are not authorized to view this page/i
        );
    });

    test('renders EditBrewery component to authorized brewer user', async () => {
        render(
            <MemoryRouter initialEntries={[route]}>
                <EditBrewery
                    breweryData={breweryDataPropsMock}
                    user={userPropsMock}
                />
            </MemoryRouter>
        );

        const titleElement = screen.getByRole('heading', {
            level: 1,
        });

        expect(titleElement).toHaveTextContent(/Edit Brewery Information/i);
    });
});
