import { API_BASE_URL } from './constant';
import { axiosInstance } from './httpHelper';
import { clearDataFromStorage, getDataFromStorage } from './storage';
import { message } from 'antd';

export const interceptor = () => {
    const token = getDataFromStorage('token');

    axiosInstance.interceptors.request.use(
        (config) => {
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            Promise.reject(error);
        },
    );

    axiosInstance.interceptors.response.use(
        (response) => {
            return response;
        },
        function (error) {
            console.log('error*', error.response);
            const originalRequest = error.config;
            if (error?.response === undefined) {
                message.error('No response from the server');
            } else if (error.response.status === 401) {
                message.error('Unauthorized');
            } else if (error.response.status === 401 && originalRequest.url === `${API_BASE_URL}/token`) {
                message.error('UnAuthorized');
                // history.push('/');
                clearDataFromStorage();
                return Promise.reject(error);
            } else if (error.response.status === 403) {
                message.error('Access Denied');
            } else if (error.response.status === 400) {
                message.error(`${error.response}`);
            } else if (error.response.status === 500) {
                message.error(`${error.response.data.error}`);
            }
            return Promise.reject(error.response);
        },
    );
};
