import axios from 'axios';
import { headers } from './auth-header';
import { baseUrl } from '../Shared/baseUrl';
import { catchErrors } from './auth-error';

export const fetchBreweryOwnerUserId = (breweryId, setBreweryOwnerUserId) => {
    return axios
        .get(baseUrl + `/brewery/${breweryId}`, {}, headers)
        .then((response) => {
            setBreweryOwnerUserId(response.data.breweryOwnerUserId);
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

export const putUpdatedBrewery = (breweryId, updatedBreweryData) => {
    return axios
        .put(baseUrl + `/brewery/${breweryId}`, updatedBreweryData, headers)
        .then((response) => {
            alert('Brewery infomation was updated!');
        })
        .catch(catchErrors);
};

export const fetchAllBreweriesData = (setBreweriesData) => {
    return axios
        .get(baseUrl + '/brewery')
        .then((response) => {
            setBreweriesData(response.data);
        })
        .catch(catchErrors);
};

export const fetchBreweryData = (
    breweryId,
    userId,
    setAddress,
    setBreweryData,
    setIsMyBrewery
) => {
    return axios
        .get(baseUrl + `/brewery/${breweryId}`, {}, headers)
        .then((response) => {
            const { street, city, state, zipCode, country } =
                response.data.address;
            setAddress(`${street} ${city} ${state} ${zipCode} ${country}`);
            setBreweryData(response.data);
            if (response.data.breweryOwnerUserId === userId) {
                setIsMyBrewery(true);
            }
        })
        .catch(catchErrors);
};

const BreweryService = {
    fetchBreweryOwnerUserId,
    postCreateBrewery,
    putUpdatedBrewery,
    fetchAllBreweriesData,
    fetchBreweryData,
};

export default BreweryService;
