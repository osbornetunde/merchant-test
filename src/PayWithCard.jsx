import React, {useEffect} from "react";
import {useDebounce} from "react-use";
import {Box, Spacer, Button, Text, Container} from "@chakra-ui/react";
import {useForm} from "react-hook-form";
import {useMutation} from "react-query";
import {
  CardPinInput,
  CreditCardInput,
  ExpiryCardInput,
  Input,
} from "./Component";
import {useResponse} from "./hooks/useResponse";
import {directCharge, directCharge3DS, verifyCardNumber} from "./api/payment";
import cardValidator from "card-validator";
import {useRecoilValue} from "recoil";
import {paymentStateDetails} from "./atoms/paymentState";
import {paymentSlugDetails} from "./atoms/paymentSlugState";
import {generateRandomNumber} from "./utils/helper.js";

cardValidator.creditCardType.addCard({
  niceType: "VERVE",
  type: "verve",
  patterns: [50],
  gaps: [4, 8, 12, 16],
  lengths: [18, 19],
  code: {
    name: "CVV",
    size: 3,
  },
});

export const validateCardNumber = (value) => {
  const numberValidation = cardValidator.number(value);
  return numberValidation.isValid || "Card number is not valid";
};

export const validateExpiryDate = (value) => {
  const expirationDateValidation = cardValidator.expirationDate(value);
  return expirationDateValidation.isValid || "Card has expired";
};

const PayWithCard = () => {
  const {control, handleSubmit, errors, formState, watch} = useForm({
    mode: "onChange",
    criteriaMode: "all",
  });

  const paymentDetails = useRecoilValue(paymentStateDetails);
  const paymentSlug = useRecoilValue(paymentSlugDetails);

  const mutations = useMutation(directCharge);
  const {mutate, isLoading, data} = mutations;

  // const mutations = useMutation(directCharge3DS);
  const verifyCardMutation = useMutation(verifyCardNumber);
  const {
    mutate: verifyCardMutate,
    isLoading: verifyCardLoading,
    data: verifyCardData,
  } = verifyCardMutation;

  const cardNumber = watch("cardNumber");

  const onValidateCardNumber = (values) => {
    console.log("===>values", String(values).replace(/ /g, ""));
    if (String(values.trim()).length === 16 || String(values.trim()).length === 19) {
      const newValue = {
        cardNumber: String(values).replace(/ /g, ""),
        orderCurrency: "NGN",
        paymentSlug: paymentSlug.paymentSlug,
      };
      verifyCardMutate(newValue);
    }
  };

  console.log("=====> verifyCardDetails", verifyCardData);

  useDebounce(() => onValidateCardNumber(cardNumber), 200, [cardNumber]);

  const {result} = useResponse(
    data,
    "Payment Successful",
    "Failed to make payment"
  );

  console.log("result", result);

  useEffect(() => {
    if (Object.entries(result).length > 0) {
      if (result?.status === 200) {
        console.log("hello");
      }
    }
  }, [result]);

  const handleNext = (values) => {
    values.cardNumber = values?.cardNumber.replace(/ /g, "");

    let month = values.expiryDate.split("/")[0];
    let year = values.expiryDate.split("/")[1];
    const reference = `iy67f${generateRandomNumber(
      10,
      60
    )}hvc${generateRandomNumber(10, 90)}`;

    const paymentValues = {
      orderAmount: +paymentDetails.amount,
      orderCurrency: paymentDetails.currency,
      customerEmail: paymentDetails.customerEmail,
      customerPhoneNo: paymentDetails.customerPhoneNo,
      customerName: paymentDetails.customerName,
      paymentSlug: paymentSlug.paymentSlug,
      transRef: reference,
      expiryMonth: month,
      expiryYear: year,
      cardNumber: values.cardNumber,
      securityCode: values.securityCode,
    };
    mutate(paymentValues);
  };

  const paymentWith3DS = (values) => {
    // values.cardNumber = values?.cardNumber.replace(/ /g, "");
    // const value = {
    //   orderCurrency: paymentDetails.currency,
    //   cardNumber: values.cardNumber,
    //   paymentSlug: paymentSlug.paymentSlug,
    // };
    mutate(paymentDetails);
  };
  return (
    <Container maxW="container.xl" position={"relative"}>
      <Box
        w="100%"
        d="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        mt="2.5rem">
        <Text fontSize="2xl">Payment Page</Text>
        <Box width="30rem" bg="#ffffff" borderRadius="1rem" p={5}>
          <form>
            <CreditCardInput
              placeholder="Enter Your card Number"
              type="tel"
              control={control}
              errors={errors}
              name="cardNumber"
              rules={{
                required: {
                  value: true,
                  message: "Card number is required",
                },
                validate: validateCardNumber,
              }}
              defaultValue=""
            />
            <Box d="flex" justifyContent="spaceBetween" alignItems="center">
              <Box width="45%">
                <ExpiryCardInput
                  placeholder="MM/YY"
                  type="tel"
                  control={control}
                  errors={errors}
                  name="expiryDate"
                  rules={{
                    required: {value: true, message: "Enter card expiryDate"},
                    validate: validateExpiryDate,
                  }}
                  defaultValue=""
                />
              </Box>
              <Spacer size="1rem" />
              <Box width="45%">
                <Input
                  placeholder="CVV"
                  type="tel"
                  control={control}
                  errors={errors}
                  name="securityCode"
                  rules={{
                    required: {value: true, message: "CVV number is required"},
                    maxLength: {value: 3, message: "Must be 3 digits"},
                  }}
                  defaultValue=""
                  maxLength={3}
                />
              </Box>
            </Box>
            <Box d="flex" justifyContent="spaceBetween" alignItems="center">
              <Box width="30%">
                <CardPinInput
                  placeholder="PIN"
                  type="password"
                  control={control}
                  errors={errors}
                  name="cardPin"
                  rules={{
                    required: {
                      value: true,
                      message: "Four-Digit PIN is required",
                    },
                    maxLength: {value: 4, message: "Must be 4 digits"},
                  }}
                  defaultValue=""
                />
              </Box>
              <Spacer size="1rem" />
              <Box width={"65%"}>
                <Input
                  placeholder="Phone Number"
                  type="tel"
                  control={control}
                  errors={errors}
                  name="phoneNumber"
                  rules={{
                    required: {
                      value: true,
                      message: "Phone number is required",
                    },
                    maxLength: {
                      value: 11,
                      message: "Must be 11 digits long without 234",
                    },
                    minLength: {value: 11, message: "Must be 11 digits long"},
                  }}
                  defaultValue=""
                />
              </Box>
            </Box>

            <Button
              w="100%"
              colorScheme="blue.800"
              bg="blue.800"
              fontSize="1rem"
              mt="4rem"
              variant="solid"
              py="1rem"
              lineHeight="10px"
              borderRadius="1rem"
              h={"3rem"}
              disabled={!formState.isValid || isLoading}
              onClick={handleSubmit(handleNext)}
              isLoading={isLoading}>
              Pay Now
            </Button>
          </form>
        </Box>
      </Box>
    </Container>
  );
};

export default PayWithCard;
