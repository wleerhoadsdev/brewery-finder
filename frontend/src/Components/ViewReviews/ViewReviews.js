import React, { useState, useEffect } from 'react';
import './ViewReviews.css';
import BeerReviewService from '../../services/beer-review.service';

export default function ViewReviews(props) {
    const breweryId = props.breweryId;
    const beerId = props.beerId;
    const [reviewsData, setReviewsData] = useState([]);
    const elementArray = [];

    useEffect(() => {
        BeerReviewService.fetchReviewData(breweryId, beerId, setReviewsData);
    }, [breweryId, beerId]);

    reviewsData.forEach((review) => {
        const currentElement = (
            <div
                key={review.reviewId}
                className='view-reviews__review'
            >
                <h3>
                    {review.title}{' '}
                    <span id='view-reviews__rating'>{review.rating}/5</span>
                </h3>
                <p>{review.body}</p>
                <p>{review.createDateTime}</p>
            </div>
        );

        if (props.user && review.authorUserId === props.user.id) {
            elementArray.unshift(currentElement);
            return;
        }
        elementArray.push(currentElement);
    });

    return (
        <section className='view-reviews__reviews'>
            <h2 id='view-reviews__title'>Reviews</h2>
            {elementArray}
        </section>
    );
}
