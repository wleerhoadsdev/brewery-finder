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

export const fetchBeerTypes = (setBeerTypes) => {
    return axios
        .get(baseUrl + '/beertype')
        .then((response) => {
            setBeerTypes(response.data);
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

export const fetchBeerData = (breweryId, beerId, setBeerData) => {
    return axios
        .get(baseUrl + `/brewery/${breweryId}/beer/${beerId}`, {}, headers)
        .then((response) => {
            setBeerData(response.data);
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

const BeerService = {
    postCreatedBeer,
    fetchBeersData,
    fetchBeerTypes,
    fetchBeerData,
    updateBeerToggleIsActive,
    deleteBeer,
};

export default BeerService;
