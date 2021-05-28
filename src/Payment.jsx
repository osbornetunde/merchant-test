import React from 'react';
import {useSetRecoilState} from "recoil";
import { useHistory } from 'react-router-dom'
import {Box, Button, Container, Text} from "@chakra-ui/react";
import {useForm} from "react-hook-form";
import {Input, Select} from './Component';
import {paymentStateDetails} from "./atoms/paymentState";


const amount = 2700

const generateRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const Payment = () => {
    const history = useHistory()
    const { control, errors, handleSubmit, formState } = useForm({
        mode:'onChange'
    });

    const setPaymentDetails = useSetRecoilState(paymentStateDetails)

    const handlePayment = (values) => {
            setPaymentDetails(values)
        history.push('/pay')
    }

  return (
    <>
      <Container
        maxW="100%"
        w="100%"
        position={"relative"}
        padding={0}
        maxH="100%"
        h="100%"
        margin="0">
        <Flex w="100%" h="100%">
          <Box
            w="100%"
            d="flex"
            justifyContent="flex-start"
            alignItems="center"
            flexDirection="column"
            mt="6.5rem">
            <Text fontSize="2xl">Merchant Payment Page</Text>
            <Box width="30rem" bg="#ffffff" borderRadius="1rem" p={5}>
              <form onSubmit={handleSubmit(handlePayment)}>
                <Input
                  name="customerName"
                  control={control}
                  errors={errors}
                  type="text"
                  defaultValue=""
                  placeholder="Enter your name"
                  rules={{
                    required: {
                      value: true,
                      message: "Please enter your name",
                    },
                  }}
                />
                <Input
                  name="customerEmail"
                  control={control}
                  errors={errors}
                  type="text"
                  defaultValue=""
                  placeholder="Enter your email"
                  rules={{
                    required: {value: true, message: "Please enter email"},
                  }}
                />
                <Input
                  name="customerPhoneNo"
                  control={control}
                  errors={errors}
                  type="number"
                  defaultValue=""
                  placeholder="Enter phone number"
                  rules={{
                    required: {
                      value: true,
                      message: "Please enter phone number",
                    },
                  }}
                />
                <Box
                  w="100%"
                  d="flex"
                  justifyContent="center"
                  alignItems="center"
                  mt="1rem">
                  <Button
                    colorScheme="blue"
                    w="14rem"
                    h="3rem"
                    borderRadius="1rem"
                    isLoading={isLoading}
                    variant="solid"
                    isDisabled={!formState.isValid}
                    type="submit">
                    Pay Now
                  </Button>
                </Box>
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

export default Payment;
