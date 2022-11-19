import React from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { baseUrl } from '../../Shared/baseUrl';

export default function ViewBrewery(props) {
    let params = useParams();
    const { breweryId, setBreweryId } = React.useState(params.breweryId);
    const { isMyBrewery, setIsMyBrewery } = React.useState();
    const [breweryData, setBreweryData] = React.useState({});
    const [address, setAddress] = React.useState("");

    console.log(breweryId)
    React.useEffect(() => {
        axios.get(baseUrl + `/brewery/${breweryId}`).then((response) => {
            const { street, city, state, zipCode, country } = response.data.address;
            setAddress(`${street} ${city} ${state} ${zipCode} ${country}`);
            setBreweryData(response.data);
        });
    }, []);
    return (
        <main>
            <div className='main--content-panel'>
                <h3>Brewery Info</h3>
                <Link to='/breweries'>Go Back to Listing</Link>
                <p>{breweryData.name}</p>
                <Link to={{ pathname: `/ViewBeerList/${breweryId}`, state: { isMyBrewery: isMyBrewery, breweryId: breweryId } }}>View Brewery Beer List</Link>
                <p>{breweryData.emailAddress}</p>
                <p>{breweryData.history}</p>
                <p>{breweryData.hoursOfOperation}</p>
                <p>{address}</p>
                <p>{breweryData.phoneNumber}</p>
                {isMyBrewery ? <Link to={{ pathname: `/EditBrewery/${breweryId}`, state: { breweryData: breweryData } }}>Edit Brewery Information</Link> : ""}
                <br />
            </div>
            <div className='main--image-panel'>
                <img
                    src={breweryData.imageUrl}
                    alt='placeholder'
                    className='ViewAllBreweries__image' />
            </div>
        </main>
    )
}