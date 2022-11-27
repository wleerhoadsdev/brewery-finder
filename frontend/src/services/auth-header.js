export default function authHeader() {
    const token = JSON.parse(sessionStorage.getItem('token'));
    const user = JSON.parse(sessionStorage.getItem('user'));

    if (token && user) {
        return { Authorization: 'Bearer ' + token };
    } else {
        return {};
    }
}

export const headers = { headers: authHeader() };
