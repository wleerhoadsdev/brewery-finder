import axios from 'axios';
import {React} from 'react';
import {useNavigate, useParams} from 'react-router-dom'
import { baseUrl } from '../../Shared/baseUrl';

export default function AddReview(props) {
  let params=useParams();
  let breweryId=params.breweryId;
  let userId=props.user.id;
  let beerId=params.beerId;
  let navigate=useNavigate();

  const [reviewData, setReviewData] = React.useState({
    author_id: userId,
    beer_id: beerId,
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
    axios.post(baseUrl+`/brewery/${breweryId}/beer/${beerId}/review`,reviewData)
         .then((response)=>{
          alert('Review was posted');
          navigate(baseUrl+`/brewery/${breweryId}/beer/${beerId}`);
         })
  }

  return (
    <div>
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
