import axios from 'axios';
import { ACCESS_TOKEN, USER_API_BASE_URL } from 'src/constants';

export const authorizationHeader = () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};

export const multipartHeader = {
    headers: {
        ...authorizationHeader().headers,
        'content-type': 'multipart/form-data',
    },
};

export const userClient = axios.create({
    baseURL: USER_API_BASE_URL,
});
