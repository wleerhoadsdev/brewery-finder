import axios from 'axios';
import authHeader from './auth-header';
import { baseUrl } from '../Shared/baseUrl';
import { catchErrors } from './auth-error';

export const fetchBreweryOwnerUserId = (
    breweryId,
    setBreweryOwnerUserId,
    setBreweryPhoto
) => {
    return axios
        .get(baseUrl + `/brewery/${breweryId}`, {}, { headers: authHeader() })
        .then((response) => {
            setBreweryOwnerUserId(response.data.breweryOwnerUserId);
            setBreweryPhoto(response.data.imageUrl);
        })
        .catch(catchErrors);
};

export const postCreateBrewery = (breweryInfo) => {
    return axios
        .post(baseUrl + '/brewery/addbrewery', breweryInfo, {
            headers: authHeader(),
        })
        .then((response) => {
            alert('Brewery was created');
            window.location.reload(true);
        })
        .catch(catchErrors);
};

export const putUpdatedBrewery = (breweryId, updatedBreweryData) => {
    return axios
        .put(baseUrl + `/brewery/${breweryId}`, updatedBreweryData, {
            headers: authHeader(),
        })
        .then((response) => {
            alert('Brewery infomation was updated!');
        })
        .catch(catchErrors);
};

export const fetchAllBreweriesData = (setBreweriesData) => {
    return axios
        .get(baseUrl + '/brewery', {}, { headers: authHeader() })
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
        .get(baseUrl + `/brewery/${breweryId}`, {}, { headers: authHeader() })
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
