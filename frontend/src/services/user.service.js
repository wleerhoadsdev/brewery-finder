import axios from 'axios';
import { headers } from './auth-header';
import { baseUrl } from '../Shared/baseUrl';
import { catchErrors } from './auth-error';

export const postCreatedBeer = (beerInformation, breweryId) => {
    return axios
        .post(
            `${baseUrl}/brewery/${breweryId}/addbeer`,
            beerInformation,
            headers
        )
        .then((response) => {
            return response;
        })
        .catch(catchErrors);
};

export const fetchBeersData = (breweryId, setBeersData) => {
    return axios
        .get(baseUrl + `/brewery/${breweryId}/beer`, {}, headers)
        .then((response) => {
            setBeersData(response.data);
        })
        .catch(catchErrors);
};

export const fetchBreweryOwnerUserId = (breweryId, setBreweryOwnerUserId) => {
    return axios
        .get(baseUrl + `/brewery/${breweryId}`, {}, headers)
        .then((response) => {
            setBreweryOwnerUserId(response.data.breweryOwnerUserId);
        })
        .catch(catchErrors);
};

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

export const updateBeerToggleIsActive = (breweryId, beerId, beer) => {
    return axios
        .put(`${baseUrl}/brewery/${breweryId}/beer/${beerId}`, beer, headers)
        .then((response) => {
            alert('Beer is now ' + (beer.isActive ? 'Inactive' : 'Active'));
        })
        .catch(catchErrors);
};

export const deleteBeer = (breweryId, beerId) => {
    return axios
        .delete(`${baseUrl}/brewery/${breweryId}/beer/${beerId}`, {}, headers)
        .then((response) => {
            alert('Beer has been deleted.');
        })
        .catch(catchErrors);
};

export const postCreateBrewery = (breweryInfo) => {
    return axios
        .post(baseUrl + '/brewery/addbrewery', breweryInfo, headers)
        .then((response) => {
            alert('Brewery was created');
            window.location.reload(true);
        })
        .catch(catchErrors);
};

export const fetchAllUsers = (setUsersData) => {
    return axios
        .get(baseUrl + '/usersbreweries', {}, headers)
        .then((response) => {
            setUsersData(response.data);
        })
        .catch(catchErrors);
};

const UserService = {
    postCreatedBeer,
    fetchBeersData,
    fetchBreweryOwnerUserId,
    fetchBeerRatings,
    updateBeerToggleIsActive,
    deleteBeer,
    postCreateBrewery,
    fetchAllUsers,
};

export default UserService;
