import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import { baseUrl } from '../../Shared/baseUrl';
import './ViewReviews.css';

export default function ViewReviews(props) {
  const role = props.user ? props.user.authorities[0].name : '';
  const breweryId = props.breweryId;
  const beerId = props.beerId;
  const [reviewsData, setReviewsData] = React.useState([]);
  const elementArray = [];

  React.useEffect(() => {
    axios
      .get(baseUrl + `/brewery/${breweryId}/beer/${beerId}/review`)
      .then((response) => {
        setReviewsData(response.data);
      });
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
