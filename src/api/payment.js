import {makePostRequest} from "../utils/httpHelper";

export const makePayment = async (values) => {
  const data = await makePostRequest("/payments/initiate", values);
  return data;
};

export const directCharge = async (values) => {
  const data = await makePostRequest("/payments/card/third-party/pay", values);
  return data;
};

export const verifyCardNumber = async (values) => {
    const data = await makePostRequest(
      "/payments/card/third-party/3ds-verify-card-number",
      values
    );
    return data
}

export const directCharge3DS = async (values) => {
  const data = await makePostRequest(
    "/payments/card/third-party/3ds-pay",
    values
  );
  return data;
};
