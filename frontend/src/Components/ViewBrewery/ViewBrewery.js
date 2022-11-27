import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import BreweryService from '../../services/brewery.service';
import './ViewBrewery.css';

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
                <h1>{breweryData.name}</h1>
                <Link
                    to={{
                        pathname: `/brewery/${breweryId}/beers`,
                    }}
                >
                    View Brewery Beer List
                </Link>
                <p>Phone: {breweryData.phoneNumber}</p>
                <p>Email: {breweryData.emailAddress}</p>
                <p>Open Sun-Sat: {breweryData.hoursOfOperation}</p>
                <p>{address}</p>
                <p>Brewing {breweryData.history}</p>
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
