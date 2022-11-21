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
            <div key={review.reviewId}>
                <h4>{review.title}</h4>
                <span>{review.rating}/5</span>
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
        <section>
            <h3>Reviews</h3>
            <section>{elementArray}</section>
        </section>
    );
}
