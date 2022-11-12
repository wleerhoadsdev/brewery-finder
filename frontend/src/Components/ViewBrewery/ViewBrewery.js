import React from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import { baseUrl } from '../../Shared/baseUrl';

export default function ViewBrewery(props) { 

    const location = useLocation();
    const [breweryData, setBreweryData] = React.useState({});
    const [address, setAddress] = React.useState("");
    const {id} = location.state;

    React.useEffect(() => {
        axios.get(baseUrl + `/brewery/${id}`).then((response) => {
            const {street, city, state, zipCode, country} = response.data.address;
            setAddress(`${street} ${city} ${state} ${zipCode} ${country}`);
            setBreweryData(response.data);
         });
    }, []);

    return (
        <div className='home--left-panel'>
            <h3>Brewery Info</h3>
            <Link to='/ViewAllBreweries'>Go Back to Listing</Link>
            <p>{breweryData.name}</p>
            <p>{breweryData.emailAddress}</p>
            <p>{breweryData.history}</p>
            <p>{breweryData.hoursOfOperation}</p>
            <p>{address}</p>
            <p>{breweryData.phoneNumber}</p>
        </div>
    )
}