import axios from 'axios';
import React from 'react';
import {Link, useLocation} from 'react-router-dom';
import { baseUrl } from '../../Shared/baseUrl'; 

export default function ViewReviews(props){
    const role = props.user ? props.user.authorities[0].name:'';
    const [reviewsData, setReviewsData]=React.useState([]);
    const [avgRating,setAvgRating]=React.useState();

    React.useEffect(()=>{
        // axios.get(baseUrl+`/brewery/${breweryId}/beer/${beerId}/review`).then((response)=>{
        //     setReviewsData(response.data);
        // });
        
    });

    const reviewsElements=reviewsData.map((review)=>{
        return(
            <div>
                <tr key={review.reviewId}>
                    <td>{review.title}</td>
                    <td>{review.rating}</td>
                    <td>{review.body}</td>
                    <td>{review.createDateTime}</td>
                </tr>
            </div>
        )
    })
}