import React, { useEffect, useState } from "react";
import { useDebounce } from "react-use";
import {
  Box,
  Button,
  Container,
  Flex,
  Image,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import {
  CreditCardInput,
  ExpiryCardInput,
  Input,
  PriceDetails,
} from "./Component";
import { directCharge3DS, verifyCardNumber } from "./api/payment";
import { useRecoilValue } from "recoil";
import { paymentStateDetails } from "./atoms/paymentState";
import { paymentSlugDetails } from "./atoms/paymentSlugState";
import { validateCardNumber, validateExpiryDate } from "./utils/helper.js";
import Landing from "./assets/img/landing.png";
import Loading from "./Component/Loading";

const PayWithCard = () => {
  const [proceed, setProceed] = useState("");
  const [redirectHtml, setRedirectHtml] = useState(null);

  const { control, handleSubmit, errors, formState, watch } = useForm({
    mode: "onChange",
    criteriaMode: "all",
  });

  const paymentDetails = useRecoilValue(paymentStateDetails);
  const paymentSlug = useRecoilValue(paymentSlugDetails);

  const mutations = useMutation(directCharge3DS);
  const { mutate, isLoading, data } = mutations;

  useEffect(() => {
    if (data?.data) {
      setRedirectHtml(
        data?.data?.redirectHtml
          ?.replace('target="redirectTo3ds1Frame"', "")
          .replace(
            '<iframe id="redirectTo3ds1Frame" name="redirectTo3ds1Frame" height="100%" width="100%" > </iframe>',
            ""
          )
          .replace(
            '<iframe id="challengeFrame" name="challengeFrame" width="100%" height="100%" ></iframe>',
            ""
          )
          .replace(
            '<iframe id="challengeFrame" name="challengeFrame"> </iframe>',
            ""
          )
          .replace('target="challengeFrame', "")
      );
    }
  }, [data]);

  useEffect(() => {
    if (redirectHtml) {
      const windowChallenge = window.open("", "credoPaymentFrame");
      if (windowChallenge) {
        windowChallenge.document.write(redirectHtml);
      }
    }
  }, [redirectHtml]);

  const verifyCardMutation = useMutation(verifyCardNumber);
  const {
    mutate: verifyCardMutate,
    isLoading: verifyCardLoading,
    data: verifyCardData,
  } = verifyCardMutation;

  const cardNumber = watch("cardNumber");

  const onValidateCardNumber = (values) => {
    if (
      String(values.trim()).length === 16 ||
      String(values.trim()).length === 19
    ) {
      const newValue = {
        cardNumber: String(values).replace(/ /g, ""),
        orderCurrency: "NGN",
        paymentSlug: paymentSlug.paymentSlug,
      };
      verifyCardMutate(newValue);
    }
  };

  useDebounce(() => onValidateCardNumber(cardNumber), 200, [cardNumber]);

  useEffect(() => {
    if (verifyCardData && Object.entries(verifyCardData).length) {
      if (verifyCardData.status === 200) {
        setProceed(verifyCardData.data.gatewayRecommendation);
      }
    }
  }, [verifyCardData]);

  const paymentWith3DS = (values) => {
    const newPaymentDetails = {
      ...paymentDetails,
      orderAmount: paymentDetails.amount,
      orderCurrency: paymentDetails.currency,
      paymentSlug: paymentSlug.paymentSlug,
      paymentOptions: "CARD,BANK",
      orderId: verifyCardData.data.orderId,
      transactionId: verifyCardData.data.transactionId,
      cardNumber: values.cardNumber.replace(/ /g, ""),
      expiryMonth: values.expiryDate.split("/")[0],
      expiryYear: values.expiryDate.split("/")[1],
      securityCode: values.securityCode,
      // colorDepth: 24,
      // javaEnabled: true,
      // language: "en-US",
      // screenHeight: 640,
      // screenWidth: 480,
      // timeZone: 273,
      secureChallengeWindowSize: "FULL_SCREEN",
      // secureChallengeWindowSize:
      // "250_X_400 or 390_X_400 or 500_X_600 or 600_X_400 or FULL_SCREEN",
      browser: "chrome",
      successTransactionUrl:
        import.meta.env.MODE === "development"
          ? "http://localhost:3000/successful"
          : "https://merchant-test-threeds.vercel.app/successful",
      failedTransactionUrl:
        import.meta.env.MODE === "development"
          ? "http://localhost:3000/failed"
          : "https://merchant-test-threeds.vercel.app/failed",
    };
    delete newPaymentDetails.amount;
    delete newPaymentDetails.currency;
    mutate(newPaymentDetails);
  };

  return (
    <>
      {data && (
        <Box
          bg="white"
          w="100%"
          h="100%"
          borderRadius="lg"
          left="0"
          top="0"
          position="absolute"
          zIndex="150"
        >
          <Loading isLoading={true} />
          <iframe
            name="credoPaymentFrame"
            width="100%"
            height="100%"
            title="3ds Challenge"
            style={{
              borderRadius: "0 20px 0 0",
              border: "none",
              zIndex: 200,
              position: "relative",
            }}
          ></iframe>
        </Box>
      )}
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
                        required: {
                          value: true,
                          message: "Enter card expiryDate",
                        },
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
                        required: {
                          value: true,
                          message: "CVV number is required",
                        },
                        maxLength: { value: 3, message: "Must be 3 digits" },
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
                  disabled={
                    (!formState.isValid && proceed === "PROCEED") || isLoading
                  }
                  onClick={handleSubmit(paymentWith3DS)}
                  isLoading={isLoading}
                >
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
    </>
  );
};

export default PayWithCard;
