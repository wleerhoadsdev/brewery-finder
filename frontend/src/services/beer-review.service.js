import axios from 'axios';
import { headers } from './auth-header';
import { baseUrl } from '../Shared/baseUrl';
import { catchErrors } from './auth-error';

export const fetchBeerRatings = (breweryId, setBeerRatings) => {
    return axios
        .get(baseUrl + `/brewery/${breweryId}/beer/avgrating`, {}, headers)
        .then((response) => {
            response.data.forEach((rating) => {
                const beerId = rating.beerId;
                const averageRating = rating.averageRating;
                setBeerRatings((prevBeerRatings) => ({
                    ...prevBeerRatings,
                    [beerId]: averageRating,
                }));
            });
        })
        .catch(catchErrors);
};

export const fetchAvgBeerRating = (breweryId, beerId, setAvgRating) => {
    return axios
        .get(
            baseUrl + `/brewery/${breweryId}/beer/${beerId}/avgrating`,
            {},
            headers
        )
        .then((response) => {
            setAvgRating(response.data);
        })
        .catch(catchErrors);
};

export const postBeerReview = (breweryId, beerId, reviewData) => {
    return axios
        .post(
            baseUrl + `/brewery/${breweryId}/beer/${beerId}/review`,
            reviewData,
            headers
        )
        .then((response) => {
            alert('Review was posted');
        })
        .catch(catchErrors);
};

export const fetchReviewData = (breweryId, beerId, setReviewsData) => {
    return axios
        .get(baseUrl + `/brewery/${breweryId}/beer/${beerId}/review`)
        .then((response) => {
            setReviewsData(response.data);
        })
        .catch(catchErrors);
};

const BeerReviewService = {
    fetchBeerRatings,
    fetchAvgBeerRating,
    postBeerReview,
    fetchReviewData,
};

export default BeerReviewService;
