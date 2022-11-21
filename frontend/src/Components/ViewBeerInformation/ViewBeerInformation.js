import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import ViewReviews from '../ViewReviews/ViewReviews';
import BeerReviewService from '../../services/beer-review.service';
import BeerService from '../../services/beer.service';

export default function ViewBeerInformation(props) {
    const role = props.user ? props.user.authorities[0].name : '';
    let params = useParams();
    const breweryId = params.breweryId;
    const beerId = params.beerId;
    const beerTypes = props.beerTypes;
    let beerTypesObj = {};

    const [beerData, setBeerData] = useState([]);
    const [avgRating, setAvgRating] = useState(0);

    beerTypes &&
        beerTypes.forEach((beerType) => {
            beerTypesObj = {
                ...beerTypesObj,
                [beerType.typeId]: beerType.style,
            };
        });

    useEffect(() => {
        BeerService.fetchBeerData(breweryId, beerId, setBeerData);
        BeerReviewService.fetchAvgBeerRating(breweryId, beerId, setAvgRating);
    }, [beerId, breweryId]);

    if (beerData.isActive) {
        return (
            <div className='home--left-panel'>
                <h3>{beerData.name}</h3>
                <p>{beerData.description}</p>
                <p>{beerData.abv}</p>
                <p>Beer Type: {beerTypesObj[beerData.typeId]}</p>
                <p>Average Rating:{avgRating}</p>
                <ViewReviews
                    beerId={beerId}
                    breweryId={breweryId}
                    user={props.user}
                />
                <Link
                    to={{
                        pathname: `/brewery/${breweryId}/beers`,
                    }}
                >
                    View Beer List
                </Link>
                <br />
                <br />
                {role === 'ROLE_USER' && (
                    <Link
                        to={{
                            pathname: `/brewery/${breweryId}/beer/${beerId}/addreview`,
                        }}
                    >
                        Add Review
                    </Link>
                )}
                <img
                    src={beerData.imageUrl}
                    alt={`${beerData.beerName}`}
                />
            </div>
        );
    } else {
        return <></>;
    }
}
