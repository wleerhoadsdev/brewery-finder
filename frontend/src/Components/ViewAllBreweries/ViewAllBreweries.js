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
                        onClick={() => props.handleCurrentBrewery(brewery.id)}
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
        <div className='breweries'>
            <h3> Below is our List of Breweries!</h3>
            <Link to='/' className='go_back_link'>Go Back</Link>
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
            <img
                src='https://via.placeholder.com/600'
                alt='placeholder'
                className='ViewAllBreweries__image'
            />
        </div>
    );
}
