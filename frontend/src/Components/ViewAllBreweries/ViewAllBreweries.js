import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { baseUrl } from '../../Shared/baseUrl';
import './ViewAllBreweries.css'

export default function ViewAllBreweries(props) {
    const role = props.user ? props.user.authorities[0].name : '';
    const isBrewer = role === 'ROLE_BREWER'

    const [breweriesData, setBreweriesData] = React.useState([]);
    const [myBrewery, setMyBrewery] = React.useState('')

    React.useEffect(() => {
        axios.get(baseUrl + '/brewery').then((response) => {
            setBreweriesData(response.data);
        })

        if (isBrewer) {
            axios.get(baseUrl + '/user/' + props.user.id + '/brewery').then((response) => {
                setMyBrewery(response.data.breweryId);
            })
        }
    }, []);

    /* iterates through all breweries and if current user is a brewer it adds thier brewery to the top of the list */
    const elementArray = []
    breweriesData.forEach(brewery => {
        const isMyBrewery = brewery.id === myBrewery

        // if brewery is inactive skip it and don't display unless it is my brewery
        if (!brewery.isActive && !isMyBrewery) return

        const currentElement =
            <tr key={brewery.id}>
                <td>
                    <Link to={{ pathname: `/ViewBrewery/${brewery.id}`, state: { breweryId: brewery.id } }}>
                            {brewery.name}
                    </Link>
                </td>
                <td>{brewery.address.city}</td>
                <td>{brewery.address.state}</td>
            </tr>
        if (isBrewer && isMyBrewery) {

            elementArray.unshift(currentElement)
            return
        }
        elementArray.push(currentElement)
    })

    return (
        <div className='breweries'>
            <h3> Below are our List of Breweries!</h3>
            <Link to='/'>Go Back</Link>
            <table>
                <thead>
                    <tr>
                        <th>Brewery Name</th>
                        <th>City</th>
                        <th>State</th>
                    </tr>
                </thead>
                <tbody>
                    {elementArray}
                </tbody>
            </table>
            <img
                src='https://via.placeholder.com/600'
                alt='placeholder'
                className='ViewAllBreweries__image' />
        </div>
    )
}