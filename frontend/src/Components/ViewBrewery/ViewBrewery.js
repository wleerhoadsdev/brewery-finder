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
            <div className='main__content-panel'>
                <h1 className='heading'>{breweryData.name}</h1>
                <Link
                    to={{
                        pathname: `/brewery/${breweryId}/beers`,
                    }}
                >
                    View Brewery Beer List
                </Link>
                <p>
                    <span className='details'>Phone: </span>
                    {breweryData.phoneNumber}
                </p>
                <p>
                    <span className='details'>Email: </span>
                    {breweryData.emailAddress}
                </p>
                <p>
                    <span className='details'>Hours: </span> Open Sun-Sat
                </p>
                <p>
                    <span className='details'>Address: </span> {address}
                </p>
                <p>
                    <span className='details'>History: </span>
                    {breweryData.history}
                </p>
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
            <div className='main__image-panel'>
                <img
                    src={breweryData.imageUrl}
                    alt='brewery'
                    className='ViewAllBreweries__image'
                />
            </div>
        </main>
    );
}
