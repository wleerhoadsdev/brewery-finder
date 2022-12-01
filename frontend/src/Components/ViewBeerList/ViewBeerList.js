import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import BeerReviewService from '../../services/beer-review.service';
import BeerService from '../../services/beer.service';
import BreweryService from '../../services/brewery.service';

export default function ViewBeerList(props) {
    const navigate = useNavigate();
    const role = props.user ? props.user.authorities[0].name : '';
    const userId = props.user ? props.user.id : '';
    const [beersData, setBeersData] = useState([]);
    const [breweryOwnerUserId, setBreweryOwnerUserId] = useState();
    const [beerRatings, setBeerRatings] = useState({});
    const [isMyBrewery, setIsMyBrewery] = useState({});
    const [breweryPhoto, setBreweryPhoto] = useState('');

    let params = useParams();
    let breweryId = params.breweryId;
    const beerTypes = props.beerTypes;
    let beerTypesObj = {};

    beerTypes &&
        beerTypes.forEach((beerType) => {
            beerTypesObj = {
                ...beerTypesObj,
                [beerType.typeId]: beerType.style,
            };
        });

    useEffect(() => {
        BeerService.fetchBeersData(breweryId, setBeersData);
        BreweryService.fetchBreweryOwnerUserId(
            breweryId,
            setBreweryOwnerUserId,
            setBreweryPhoto
        );
        BeerReviewService.fetchBeerRatings(breweryId, setBeerRatings);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setIsMyBrewery(userId === breweryOwnerUserId);
    }, [breweryOwnerUserId, userId]);

    function handleActiveChange(e, beerId) {
        const beer = beersData.filter((beer) => beer.beerId === beerId)[0];
        const isActive = beer.isActive;
        beer.isActive = !isActive;

        BeerService.updateBeerToggleIsActive(breweryId, beerId, beer).then(() =>
            navigate(`/brewery/${breweryId}/beers`)
        );
    }

    function handleDeleteBeer(e, beerId) {
        BeerService.deleteBeer(breweryId, beerId).then(() => {
            setBeersData(beersData.filter((beer) => beer.beerId !== beerId));
        });
    }

    const beerListElements = beersData.map((beer) => {
        if (isMyBrewery || beer.isActive) {
            const beerRating = beerRatings[beer.beerId]
                ? beerRatings[beer.beerId]
                : 'N/A';
            return (
                <tr key={beer.beerId}>
                    <td>
                        <Link
                            to={{
                                pathname: `/brewery/${breweryId}/beers/${beer.beerId}`,
                            }}
                        >
                            {beer.name}
                        </Link>
                    </td>
                    <td>{beerTypesObj[beer.typeId]}</td>
                    <td>{beer.description}</td>
                    <td>{beer.abv}</td>
                    <td>{beerRating}</td>
                    {isMyBrewery && role === 'ROLE_BREWER' && (
                        <td>
                            <button
                                onClick={(e) => {
                                    handleActiveChange(e, beer.beerId);
                                }}
                            >
                                Toggle{' '}
                                {beer.isActive ? '  Inactive' : '  Active'}
                            </button>
                        </td>
                    )}
                    {isMyBrewery && role === 'ROLE_BREWER' && (
                        <td>
                            <button
                                onClick={(e) => {
                                    handleDeleteBeer(e, beer.beerId);
                                }}
                            >
                                Delete Beer
                            </button>
                        </td>
                    )}
                </tr>
            );
        } else {
            return <tr key={beer.id}></tr>;
        }
    });

    return (
        <main>
            <div className='main__content-panel'>
                <h1 className='heading'>List of Beers</h1>
                <Link to='/breweries'>View All Breweries</Link>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Description</th>
                            <th>ABV</th>
                            <th>AVG Rating</th>
                            {isMyBrewery && role === 'ROLE_BREWER' && (
                                <th>Active Toggle</th>
                            )}
                            {isMyBrewery && role === 'ROLE_BREWER' && (
                                <th>Delete Beer</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>{beerListElements}</tbody>
                </table>
                {isMyBrewery ? (
                    <Link
                        to={{
                            pathname: `/brewery/${breweryId}/addbeer`,
                        }}
                    >
                        Add Beer
                    </Link>
                ) : (
                    ''
                )}
            </div>
            <div className='main__image-panel'>
                <img
                    src={breweryPhoto}
                    alt='brewery'
                />
            </div>
        </main>
    );
}
