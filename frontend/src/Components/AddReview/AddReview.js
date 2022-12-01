import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BeerReviewService from '../../services/beer-review.service';
import NotAuthorized from '../NotAuthorized/NotAuthorized';
import './AddReview.css';

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

    if (!userId) {
        return <NotAuthorized />;
    }
    return (
        <main id='add-review__page'>
            <div className='main__content-panel'>
                <h1 className='heading'>Add a review</h1>
                <form
                    onSubmit={handleSubmit}
                    id='add-review__form'
                >
                    <h2>Let us know what you think about this beer</h2>
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

                    <h2>Please rate this beer from 1-5</h2>
                    <span>(1 = Terrible 🤢, 5 = Best Ever! 🍻)</span>
                    <label className='sr-only'>Beer Rating: </label>
                    <input
                        type='number'
                        name='rating'
                        id='rating'
                        min='0'
                        max='5'
                        step='0.5'
                        value={reviewData.rating}
                        onChange={handleChange}
                    />
                    <button>Submit</button>
                </form>
            </div>

            <div className='main__image-panel'>
                <img
                    id='add-review__image'
                    src='https://c.tenor.com/fwjprlhRdJAAAAAC/tenor.gif'
                    alt={'Homer Simpson thinking of beer'}
                />
            </div>
        </main>
    );
}
