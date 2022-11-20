import axios from 'axios';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { baseUrl } from '../../Shared/baseUrl';

export default function AddReview(props) {
  let params = useParams();
  let breweryId = params.breweryId;
  let userId = props.user.id;
  let beerId = params.beerId;
  let navigate = useNavigate();

  const [reviewData, setReviewData] = React.useState({
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
    axios
      .post(baseUrl + `/brewery/${breweryId}/beer/${beerId}/review`, reviewData)
      .then((response) => {
        alert('Review was posted');
        navigate(`/brewery/${breweryId}/beers/${beerId}`);
      })
      .catch((error) => {
        if (error.response) {
          // Request made and server responded
          alert(error.response.data);
          console.error(error.response.status + ': ' + error.response.data);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          alert(error.request);
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          alert('Error \n', error.message);
          console.log('Error', error.message);
        }
      });
  }

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
