import React, { useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
    fetchBeersData,
    fetchBreweryOwnerUserId,
    fetchBeerRatings,
    updateBeerToggleIsActive,
    deleteBeer,
} from '../../api';

export default function ViewBeerList(props) {
    const navigate = useNavigate();
    const role = props.user ? props.user.authorities[0].name : '';
    const userId = props.user ? props.user.id : '';
    const [beersData, setBeersData] = React.useState([]);
    const [breweryOwnerUserId, setBreweryOwnerUserId] = React.useState();
    const [beerRatings, setBeerRatings] = React.useState({});
    const [isMyBrewery, setIsMyBrewery] = React.useState({});

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
        fetchBeersData(breweryId, setBeersData);
        fetchBreweryOwnerUserId(breweryId, setBreweryOwnerUserId);
        fetchBeerRatings(breweryId, setBeerRatings);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setIsMyBrewery(userId === breweryOwnerUserId);
    }, [breweryOwnerUserId, userId]);

    function handleActiveChange(e, beerId) {
        const beer = beersData.filter((beer) => beer.beerId === beerId)[0];
        const isActive = beer.isActive;
        beer.isActive = !isActive;

        updateBeerToggleIsActive(breweryId, beerId, beer);
        navigate(`/brewery/${breweryId}/beers`);
    }

    function handleDeleteBeer(e, beerId) {
        deleteBeer(breweryId, beerId);
    }

    const beerListElements = beersData.map((beer) => {
        if (isMyBrewery || beer.isActive) {
            const beerRating = beerRatings[beer.beerId]
                ? beerRatings[beer.beerId]
                : 'N/A';
            return (
                <tr key={beer.id}>
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
                                Toggle beer to{' '}
                                {beer.isActive ? 'Inactive' : 'Active'}
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
            <div className='main--content-panel'>
                <h3>Page to View Full List of Beers</h3>
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
                    src='https://via.placeholder.com/600'
                    alt='placeholder'
                />
            </div>
        </main>
    );
}
