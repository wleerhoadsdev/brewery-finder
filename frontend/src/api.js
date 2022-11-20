import { baseUrl } from './Shared/baseUrl';
import axios from 'axios';
axios.defaults.baseURL = 'baseUrl';
axios.defaults.headers.common = { Authorization: `bearer ${token}` };

export const postCreatedBeer = (beerInformation, breweryId) => {
    axios
        .post(`${baseUrl}/brewery/${breweryId}/addbeer`, beerInformation)
        .then((response) => {
            alert('Beer was created');
        })
        .catch(catchErrors);
};

export const fetchBeersData = (breweryId, setBeersData) => {
    axios
        .get(baseUrl + `/brewery/${breweryId}/beer`)
        .then((response) => {
            setBeersData(response.data);
        })
        .catch(catchErrors);
};

export const fetchBreweryOwnerUserId = (breweryId, setBreweryOwnerUserId) => {
    axios
        .get(baseUrl + `/brewery/${breweryId}`)
        .then((response) => {
            setBreweryOwnerUserId(response.data.breweryOwnerUserId);
        })
        .catch(catchErrors);
};

export const fetchBeerRatings = (breweryId, setBeerRatings) => {
    axios
        .get(baseUrl + `/brewery/${breweryId}/beer/avgrating`)
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

export const updateBeerToggleIsActive = (breweryId, beerId, beer) => {
    axios
        .put(`${baseUrl}/brewery/${breweryId}/beer/${beerId}`, beer)
        .then((response) => {
            alert('Beer is now ' + (beer.isActive ? 'Inactive' : 'Active'));
        })
        .catch(catchErrors);
};

export const deleteBeer = (breweryId, beerId) => {
    axios
        .delete(`${baseUrl}/brewery/${breweryId}/beer/${beerId}`)
        .then((response) => {
            alert('Beer has been deleted.');
        })
        .catch(catchErrors);
};

export const postCreateBrewery = (breweryInfo) => {
    axios
        .post(baseUrl + '/brewery/addbrewery', breweryInfo)
        .then((response) => {
            alert('Brewery was created');
        })
        .catch(catchErrors);
};

const catchErrors = (error) => {
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
};
