import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BeerReviewService from '../../services/beer-review.service';

export default function AddReview(props) {
    let params = useParams();
    let breweryId = params.breweryId;
    let userId = props.user ? props.user.id : '';
    let beerId = params.beerId;
    let navigate = useNavigate();

    const [reviewData, setReviewData] = useState({
        authorUserId: userId,
        beerId: beerId,
        rating: 0,
        title: '',
        body: '',
        createDateTime: Date.now(),
        updateDateTime: Date.now(),
    });

    function handleChange(event) {
        const { name, value } = event.target;
        setReviewData((prevReviewData) => {
            return { ...prevReviewData, [name]: value };
        });
    }

    function handleSubmit(e) {
        e.preventDefault();

        BeerReviewService.postBeerReview(breweryId, beerId, reviewData).then(
            navigate(`/brewery/${breweryId}/beers/${beerId}`)
        );
    }

    if (!userId) return <h3>You are not authorized to view this page.</h3>;
    return (
        <div>
            <h1>Add a review</h1>
            <form onSubmit={handleSubmit}>
                <label className='sr-only'>Review Title: </label>
                <input
                    type='text'
                    placeholder='Review Title'
                    name='title'
                    value={reviewData.title}
                    onChange={handleChange}
                />

                <label className='sr-only'>Review Body</label>
                <textarea
                    type='text'
                    placeholder='Review Body'
                    name='body'
                    defaultValue={reviewData.body}
                    onChange={handleChange}
                ></textarea>

                <label className='sr-only'>Beer Rating: </label>
                <input
                    type='number'
                    name='rating'
                    min='0'
                    max='5'
                    step='0.5'
                    value={reviewData.rating}
                    onChange={handleChange}
                />
                <button>Submit</button>
            </form>
        </div>
    );
}
