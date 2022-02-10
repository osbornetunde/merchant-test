import React, {useEffect, useState} from "react";
import { useHistory } from 'react-router-dom'
import {useDebounce} from "react-use";
import {Box, Button, Container, Flex, Image, Spacer, Text} from "@chakra-ui/react";
import {useForm} from "react-hook-form";
import {useMutation} from "react-query";
import {CreditCardInput, ExpiryCardInput, Input, PriceDetails,} from "./Component";
import {useResponse} from "./hooks/useResponse";
import {directCharge3DS, verifyCardNumber} from "./api/payment";
import {useRecoilValue} from "recoil";
import {paymentStateDetails} from "./atoms/paymentState";
import {paymentSlugDetails} from "./atoms/paymentSlugState";
import {generateRandomNumber, validateCardNumber, validateExpiryDate} from "./utils/helper.js";
import Landing from "./assets/img/landing.png";


const PayWithCard = () => {
  const history = useHistory()
  const [proceed, setProceed] = useState('')
  const {control, handleSubmit, errors, formState, watch} = useForm({
    mode: "onChange",
    criteriaMode: "all",
  });

  const paymentDetails = useRecoilValue(paymentStateDetails);
  const paymentSlug = useRecoilValue(paymentSlugDetails);

  const mutations = useMutation(directCharge3DS);
  const {mutate, isLoading, data} = mutations;


  const verifyCardMutation = useMutation(verifyCardNumber);
  const {
    mutate: verifyCardMutate,
    isLoading: verifyCardLoading,
    data: verifyCardData,
  } = verifyCardMutation;

  const cardNumber = watch("cardNumber");

  const onValidateCardNumber = (values) => {
    if (String(values.trim()).length === 16 || String(values.trim()).length === 19) {
      const newValue = {
        cardNumber: String(values).replace(/ /g, ""),
        orderCurrency: "NGN",
        paymentSlug: paymentSlug.paymentSlug,
      };
      verifyCardMutate(newValue);
    }
  };

  // console.log("=====> verifyCardDetails", verifyCardData);

  useDebounce(() => onValidateCardNumber(cardNumber), 200, [cardNumber]);

  const {result} = useResponse(
    data,
    "Payment Successful",
    "Failed to make payment"
  );

  console.log("result", paymentDetails);

  useEffect(() => {
    if(verifyCardData && Object.entries(verifyCardData).length){
      if(verifyCardData.status === 200){
        setProceed(verifyCardData.data.gatewayRecommendation)
      }
    }
  })

  useEffect(() => {
    if (Object.entries(result).length > 0) {
      if (result?.status === 200) {
        console.log("hello");
        history.push('/successful')
      }
    }
  }, [result]);

  // const handleNext = (values) => {
  //   values.cardNumber = values?.cardNumber.replace(/ /g, "");
  //
  //   let month = values.expiryDate.split("/")[0];
  //   let year = values.expiryDate.split("/")[1];
  //   const reference = `iy67f${generateRandomNumber(
  //     10,
  //     60
  //   )}hvc${generateRandomNumber(10, 90)}`;
  //
  //   const paymentValues = {
  //     orderAmount: +paymentDetails.amount,
  //     orderCurrency: paymentDetails.currency,
  //     customerEmail: paymentDetails.customerEmail,
  //     customerPhoneNo: paymentDetails.customerPhoneNo,
  //     customerName: paymentDetails.customerName,
  //     paymentSlug: paymentSlug.paymentSlug,
  //     transRef: reference,
  //     expiryMonth: month,
  //     expiryYear: year,
  //     cardNumber: values.cardNumber,
  //     securityCode: values.securityCode,
  //   };
  //   mutate(paymentValues);
  // };



  const paymentWith3DS = (values) => {

    const newPaymentDetails = {
      ...paymentDetails,
      paymentSlug: paymentSlug.paymentSlug,
      paymentOptions: "CARD,BANK"
    }
    console.log("====>Payment details",newPaymentDetails)
    mutate(newPaymentDetails);
  };
  return (
    <Container
        maxW="100%"
        w="100%"
        position={"relative"}
        padding={0}
        maxH="100%"
        h="100%"
        margin="0"
    >
      <Flex w="100%" h="100%">
      <Box
          w="100%"
          d="flex"
          justifyContent="flex-start"
          alignItems="center"
          flexDirection="column"
          mt="6.5rem"
      >
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
              disabled={!formState.isValid && proceed === 'PROCEED'|| isLoading }
              onClick={handleSubmit(paymentWith3DS)}
              isLoading={isLoading}>
              Pay Now
            </Button>
          </form>
        </Box>
      </Box>
        <Box h="100%" w="100%" position="relative">
          <Image h="100%" w="100%" fit="cover" src={Landing} alt="bg-image" />
          <PriceDetails />
        </Box>
      </Flex>
    </Container>
  );
};

export default PayWithCard;
