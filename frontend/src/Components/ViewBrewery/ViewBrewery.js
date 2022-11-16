import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { baseUrl } from '../../Shared/baseUrl';

export default function ViewBrewery(props) {

    const [breweryData, setBreweryData] = React.useState({});
    const [address, setAddress] = React.useState("");

    React.useEffect(() => {
        axios.get(baseUrl + `/brewery/${props.brewery}`).then((response) => {
            const { street, city, state, zipCode, country } = response.data.address;
            setAddress(`${street} ${city} ${state} ${zipCode} ${country}`);
            setBreweryData(response.data);
        });
    }, []);
    
    return (
        <div className='home--left-panel'>
            <h3>Brewery Info</h3>
            <Link to='/ViewAllBreweries'>Go Back to Listing</Link>
            <p>{breweryData.name}</p>
            <Link to={`/ViewBeerList/${props.brewery}`}>View Brewery Beer List</Link>
            <p>{breweryData.emailAddress}</p>
            <p>{breweryData.history}</p>
            <p>{breweryData.hoursOfOperation}</p>
            <p>{address}</p>
            <p>{breweryData.phoneNumber}</p>
            {props.brewery === props.myBrewery ? <Link to={{ pathname: `/EditBrewery/${props.brewery}`, state: { breweryData: breweryData } }}>Edit Brewery Information</Link> : ""}
            <br />
             <img
                src={breweryData.imageUrl}
                alt='placeholder'
                className='ViewAllBreweries__image' />
        </div>
    )
}