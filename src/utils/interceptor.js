import { axiosInstance } from './httpHelper';
import { getDataFromStorage } from './storage';
import {useToast,} from "@chakra-ui/react";

export const interceptor = () => {
    const toast = useToast()
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
            if (error?.response === undefined) {
                toast({title:'No response from the server', status:'info'})
            } else if (error.response.status === 401) {
                toast({title:'Unauthorized', status:'error'})
            } else if (error.response.status === 403) {
                toast({title:'Access Denied', status:'error'})
            } else if (error.response.status === 400) {
                toast({title:`${error.response}`, status:'error'})
            } else if (error.response.status === 500) {
                toast({title:`${error.response.data.error}`, status:'error'})
            }
            return Promise.reject(error.response);
        },
    );
};
