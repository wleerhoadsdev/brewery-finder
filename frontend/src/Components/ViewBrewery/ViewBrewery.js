import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import BreweryService from '../../services/brewery.service';

export default function ViewBrewery(props) {
    const [isMyBrewery, setIsMyBrewery] = useState(false);
    const [breweryData, setBreweryData] = useState({});
    const [address, setAddress] = useState('');

    let params = useParams();
    const breweryId = params.breweryId;
    const userId = props.user ? props.user.id : '';

    useEffect(() => {
        BreweryService.fetchBreweryData(
            breweryId,
            userId,
            setAddress,
            setBreweryData,
            setIsMyBrewery
        );
    }, [breweryId, userId]);

    return (
        <main>
            <div className='main--content-panel'>
                <h3>Brewery Info</h3>
                <Link to='/breweries'>Go Back to Listing</Link>
                <p>{breweryData.name}</p>
                <Link
                    to={{
                        pathname: `/brewery/${breweryId}/beers`,
                    }}
                >
                    View Brewery Beer List
                </Link>
                <p>{breweryData.emailAddress}</p>
                <p>{breweryData.history}</p>
                <p>{breweryData.hoursOfOperation}</p>
                <p>{address}</p>
                <p>{breweryData.phoneNumber}</p>
                {isMyBrewery ? (
                    <Link
                        to={{
                            pathname: `/brewery/${breweryId}/editbrewery`,
                        }}
                        onClick={() => {
                            props.handleEditBreweryData(breweryData);
                        }}
                    >
                        Edit Brewery Information
                    </Link>
                ) : (
                    ''
                )}
                <br />
            </div>
            <div className='main--image-panel'>
                <img
                    src={breweryData.imageUrl}
                    alt='placeholder'
                    className='ViewAllBreweries__image'
                />
            </div>
        </main>
    );
}
