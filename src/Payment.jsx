import React, { useEffect } from 'react';
import { useSetRecoilState } from "recoil";
import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom'
import {Box, Button, Container, Image, Text, Flex, useToast} from "@chakra-ui/react";
import {useForm} from "react-hook-form";
import {Input, PriceDetails} from './Component';
import { paymentStateDetails } from "./atoms/paymentState";
import { paymentSlugDetails } from './atoms/paymentSlugState';
import { makePayment } from './api/payment';
import { generateRandomNumber } from './utils/helper';
import Landing from './assets/img/landing.png'


const amount = 2700


const Payment = () => {
    const history = useHistory()
    const toast = useToast()
    const { control, errors, handleSubmit, formState } = useForm({
        mode:'onChange'
    });

    const setPaymentDetails = useSetRecoilState(paymentStateDetails)
    const setPaymentSlug = useSetRecoilState(paymentSlugDetails)


    const mutations = useMutation(makePayment);
    const { mutate, isLoading, data } = mutations

    useEffect(()=>{
        if(data?.data){
            const { data: dataResult } = data;
            toast({ title: `${dataResult.message}`, status: "success" })
            setPaymentSlug(dataResult);
            history.push("/pay");
        }
    }, [data])

    const handlePayment = (values) => {

        const newValue = {
          ...values,
          amount,
          redirectUrl: "https://www.credodemo.com/paymentsuccess",
          transRef: `iy67f${generateRandomNumber(
            10,
            60
          )}hvc${generateRandomNumber(10, 90)}`,
            currency: 'NGN'
        };
        setPaymentDetails(newValue);
        mutate(newValue)
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
