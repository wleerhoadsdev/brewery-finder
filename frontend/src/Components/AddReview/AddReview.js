import axios from 'axios';
import React from 'react';
import { baseUrl } from '../../Shared/baseUrl';

export default function AddReview(props) {
  const user_id = 1; //for now just assign to the first user
  const beer_id = 1; //for now just assign to the first beer

  console.log(props.user);
  const [reviewData, setReviewData] = React.useState({
    author_id: user_id,
    beer_id: beer_id,
    rating: 0,
    title: '',
    review_body: '',
    created_date: Date.now(),
    updated_date: Date.now(),
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setReviewData((prevReviewData) => {
      return { ...prevReviewData, [name]: value };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(reviewData);
  }

  return (
    <div>
      {console.log(props.user)}
      <h1>Add a review</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Review Title'
          name='title'
          value={reviewData.title}
          onChange={handleChange}
        />
        <input
          type='text'
          placeholder='Review Body'
          name='review_body'
          value={reviewData.review_body}
          onChange={handleChange}
        />
        <input
          type='number'
          name='rating'
          value={reviewData.rating}
          onChange={handleChange}
        />
        <button>Submit</button>
      </form>
    </div>
  );
}
