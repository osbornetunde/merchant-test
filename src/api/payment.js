import { makePostRequest } from "../utils/httpHelper";


 export const makePayment = async (values) => {
    const data = await makePostRequest('/payments/initiate', values);
    return data;
}
