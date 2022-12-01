import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ViewAllBreweries.css';
import BreweryService from '../../services/brewery.service';

export default function ViewAllBreweries(props) {
    const role = props.user ? props.user.authorities[0].name : '';
    const isBrewer = role === 'ROLE_BREWER';

    const [breweriesData, setBreweriesData] = useState([]);

    useEffect(() => {
        BreweryService.fetchAllBreweriesData(setBreweriesData);
    }, []);

    /* iterates through all breweries and if current user is a brewer it adds their brewery to the top of the list */
    const elementArray = [];
    breweriesData.forEach((brewery) => {
        const isMyBrewery = brewery.id === props.myBrewery;

        // if brewery is inactive skip it and don't display unless it is my brewery
        if (!brewery.isActive && !isMyBrewery) return;

        const currentElement = (
            <tr key={brewery.id}>
                <td>
                    <Link
                        to={{
                            pathname: `/brewery/${brewery.id}`,
                        }}
                        className='link_to_brewery'
                    >
                        {brewery.name}
                    </Link>
                </td>
                <td>{brewery.address.city}</td>
                <td>{brewery.address.state}</td>
            </tr>
        );
        if (isBrewer && isMyBrewery) {
            elementArray.unshift(currentElement);
            return;
        }
        elementArray.push(currentElement);
    });

    return (
        <main className='breweries'>
            <div className='main__content-panel'>
                <h1 className='heading'> Below is our List of Breweries!</h1>
                <table className='brewery_table'>
                    <thead>
                        <tr>
                            <th>Brewery Name</th>
                            <th>City</th>
                            <th>State</th>
                        </tr>
                    </thead>
                    <tbody>{elementArray}</tbody>
                </table>
            </div>
            <div className='main__image-panel'>
                <img
                    src='https://images.unsplash.com/photo-1610976623276-daf397fbaaf6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2835&q=80'
                    alt='beer pouring into glass on a cutting board with cheese'
                    className='ViewAllBreweries__image'
                />
            </div>
        </main>
    );
}
