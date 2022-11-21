import axios from 'axios';
import authHeader from './auth-header';
import { baseUrl } from '../Shared/baseUrl';
import { catchErrors } from './auth-error';

export const fetchAllUsers = (setUsersData) => {
    return axios
        .get(baseUrl + '/usersbreweries', {}, { headers: authHeader() })
        .then((response) => {
            setUsersData(response.data);
        })
        .catch(catchErrors);
};

export const fetchMyBrewery = (userId, handleMyBrewery) => {
    return axios
        .get(baseUrl + `/user/${userId}/brewery`, {}, { headers: authHeader() })
        .then((response) => handleMyBrewery(response.data.breweryId))
        .catch(catchErrors);
};

const UserService = {
    fetchAllUsers,
    fetchMyBrewery,
};

export default UserService;
