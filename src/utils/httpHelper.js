import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: "https://api.public.credodemo.com/credo-payment/v1/",
  headers: {
    Authorization: "pk_demo-85mnMAejb480LTdn0WbG39GdoXuEzJ.nUdQT5I9Pn-d",
  },
//   baseURL: "https://credo-payments.nugitech.com/v1/",
//   headers: {
//     Authorization: "pk_demo-oZkCJkSyFCdb61ZN00nLPVzl5Bdpqp.Yxeb33I11X-d",
//   },
});



const responseHandler = (response) => {
    const { data, status, ...others } = response;
    return { data, status, error: false, ...others };
};

const errorHandler = (response) => {
    const { data } = response;
    return data;
};

export const buildUrlEncodedParams = (paramsObject) => new URLSearchParams(paramsObject).toString();

export const makePostRequest = async (requestURL, requestData, configParams = {}, query) => {
    const params = decodeURIComponent(`${requestURL}${requestData ? `?${buildUrlEncodedParams(requestData)}` : ''}`);
    try {
        const data = !query
            ? await axiosInstance.post(requestURL, requestData, configParams)
            : await axiosInstance.post(params);
        return responseHandler(data);
    } catch (err) {
        return errorHandler(err.response);
    }
};

export const makePutRequest = async (requestURL, requestData, configParams = {}) => {
    try {
        const { data } = await axiosInstance.put(requestURL, requestData, configParams);
        return responseHandler(data);
    } catch (err) {
        return errorHandler(err);
    }
};
export const makePatchRequest = async (requestURL, requestData, configParams = {}) => {
    try {
        const data = await axiosInstance.patch(requestURL, requestData, configParams);
        return responseHandler(data);
    } catch (err) {
        return errorHandler(err);
    }
};

export const makeGetRequest = async (
    requestURL,
    requestData,
    configParams = {},
) => {
    try {
        const data = await axiosInstance.get(
            `${requestURL}${requestData ? `?${buildUrlEncodedParams(requestData)}` : ''}`,
        );
        return responseHandler(data);
    } catch (err) {
        return errorHandler(err);
    }
};

export const makePostRequest2 = async (
  requestURL,
  requestData,
  configParams = {},
  query
) => {
  const params = decodeURIComponent(
    `${requestURL}${
      requestData ? `?${buildUrlEncodedParams(requestData)}` : ""
    }`
  );
  try {
    const data = !query
      ? await axiosInstance2.post(requestURL, requestData, configParams)
      : await axiosInstance2.post(params);
    return responseHandler(data);
  } catch (err) {
    return errorHandler(err.response);
  }
};
