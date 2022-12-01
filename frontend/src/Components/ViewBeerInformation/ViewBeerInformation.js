import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import ViewReviews from '../ViewReviews/ViewReviews';
import BeerReviewService from '../../services/beer-review.service';
import BeerService from '../../services/beer.service';
import './ViewBeerInformation.css';

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
            <main>
                <div className='main__content-panel beer-information'>
                    <h1 className='heading'>{beerData.name}</h1>
                    <Link
                        to={{
                            pathname: `/brewery/${breweryId}/beers`,
                        }}
                    >
                        Back to Beer List
                    </Link>
                    <p>
                        <span className='details'>Description: </span>{' '}
                        {beerData.description}
                    </p>
                    <p>
                        <span className='details'>ABV: </span> {beerData.abv}
                    </p>
                    <p>
                        <span className='details'>Beer Type: </span>{' '}
                        {beerTypesObj[beerData.typeId]}
                    </p>
                    <p>
                        <span className='details'>Average Rating: </span>
                        {avgRating}
                    </p>
                    <ViewReviews
                        beerId={beerId}
                        breweryId={breweryId}
                        user={props.user}
                    />
                    {role === 'ROLE_USER' && (
                        <Link
                            to={{
                                pathname: `/brewery/${breweryId}/beer/${beerId}/addreview`,
                            }}
                        >
                            Add Review
                        </Link>
                    )}
                </div>
                <div className='main__image-panel'>
                    <img
                        src={beerData.imageUrl}
                        alt={`${beerData.beerName}`}
                    />
                </div>
            </main>
        );
    } else {
        return (
            <main>
                <div className='main__content-panel'>
                    <h1 className='heading'>This beer does not exist</h1>
                </div>
                <div className='main__image-panel'>
                    <img
                        src='https://thumbs.dreamstime.com/b/colored-sad-beer-glass-icon-vector-illustration-design-colored-sad-beer-glass-icon-127079527.jpg'
                        alt={'error'}
                    />
                </div>
            </main>
        );
    }
}
