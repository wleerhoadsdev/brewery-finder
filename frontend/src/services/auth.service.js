import axios from 'axios';
import { baseUrl } from '../Shared/baseUrl';
import { catchErrors } from './auth-error';

const register = (registerInfo) => {
    return axios
        .post(baseUrl + '/register', registerInfo)
        .then((response) => {
            alert('Account creation successful! \nLogin to your new account');
            return response.status;
        })
        .catch(catchErrors);
};

const login = (loginInfo) => {
    return axios
        .post(baseUrl + '/login', loginInfo)
        .then((response) => {
            if (response.data.token) {
                sessionStorage.setItem(
                    'user',
                    JSON.stringify(response.data.user)
                );
                sessionStorage.setItem(
                    'token',
                    JSON.stringify(response.data.token)
                );
            }
            return response.data;
        })
        .catch(catchErrors);
};

const logout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
};

const getCurrentUser = () => {
    return JSON.parse(sessionStorage.getItem('user'));
};

const getCurrentToken = () => {
    return JSON.parse(sessionStorage.getItem('token'));
};

const AuthService = {
    register,
    login,
    logout,
    getCurrentUser,
    getCurrentToken,
};

export default AuthService;
