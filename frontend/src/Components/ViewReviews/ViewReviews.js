import axios from 'axios';
import React from 'react';
import {Link } from 'react-router-dom';
import { baseUrl } from '../../Shared/baseUrl'; 

export default function ViewReviews(props){
    const role = props.user ? props.user.authorities[0].name:'';
    const breweryId=props.breweryId;
    const beerId=props.beerId;
    const [reviewsData, setReviewsData]=React.useState([]);
    const [avgRating,setAvgRating]=React.useState();
    const elementArray=[];

    React.useEffect(()=>{
        axios.get(baseUrl+`/brewery/${breweryId}/beer/${beerId}/review`).then((response)=>{
            setReviewsData(response.data);
        });
    },[breweryId,beerId]);

    reviewsData.forEach((review)=>{
        const currentElement=(
            <div>
                <tr key={review.reviewId}>
                    <td>{review.rating}</td>
                    <td>{review.title}</td>
                    <td>{review.createDateTime}</td>
                    <td>{review.body}</td>
                </tr>
            </div>
        )
        if(review.authorUserId===props.user.id){
            elementArray.unshift(currentElement);
            return;
        }
        elementArray.push(currentElement);
    })

    return(
        <main>
            <h3>Reviews</h3>
            <table>
                {elementArray}
            </table>
        </main>
    )
}