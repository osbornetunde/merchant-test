import React, {useEffect, useState} from 'react';
import {Box, Container, Button, Text, useToast} from "@chakra-ui/react";
import {Input, Select } from './Component';
import {useForm} from "react-hook-form";
import {useMutation} from "react-query";
import {makePayment} from "./api/payment";

const currencyOptions = [
    {value: "NGN", label: 'Naira'},
    {value:"USD", label:'US Dollars'},
    {value: "EUR", lable:"EURO"}
]

const paymentOptions = [
    {value: 'CARD', label:'Card'},
    {value: 'CASH', label:'Cash'}
]


const Payment = () => {
    const toast = useToast()
    const [paymentLink, setPaymentLink] = useState();
    const { control, errors, handleSubmit, formState } = useForm({
        mode:'onChange'
    });
    const mutations = useMutation(makePayment);
    const { mutate, isLoading, data } = mutations
    console.log("result", data);
    useEffect(()=>{
        if(data?.data){
            const { data: dataResult } = data;
            toast({title: `${dataResult.message}`, status:"success"})
            // window.location.href = `${dataResult.paymentLink}`;
            setPaymentLink(`${dataResult.paymentLink}`)
        }
    },[data])
    const handlePayment = (values) => {
        const newValue = {
            ...values,
            amount: +values.amount,
            redirectUrl: 'https://www.credodemo.com/paymentsuccess',
            transRef: 'iy67f64hvc63'
        }
        console.log("values",newValue)
        mutate(newValue)
    }

    return (
        <>
        <Container maxW="container.xl" position={"relative"}>
            {paymentLink &&
            <iframe
                title="Credo Payment"
                src={paymentLink}
                sandbox="allow-scripts allow-same-origin allow-forms"
                frameBorder="0"
                height="625px"
                width="100%" style={{position:"absolute", zIndex: 5}}
            />}
            <Box w="100%" d="flex" justifyContent="center" alignItems="center" flexDirection="column" mt="2.5rem">
                <Text fontSize="2xl">Merchant Payment Page</Text>
                <Box width="30rem" bg="#ffffff" borderRadius="1rem" p={5}>
                    <form onSubmit={handleSubmit(handlePayment)}>
                            <Input name="customerName" control={control} errors={errors} type="text" defaultValue="" placeholder="Enter your name" rules={{required:{value:true, message:'Please enter your name'}}} />
                            <Input name="customerEmail" control={control} errors={errors} type="text" defaultValue="" placeholder="Enter your email" rules={{required:{value:true, message:'Please enter email'}}} />
                            <Input name="customerPhoneNo" control={control} errors={errors} type="number" defaultValue="" placeholder="Enter phone number" rules={{required:{value:true, message:'Please enter phone number'}}} />
                            <Input name="amount" control={control} errors={errors} type="number" defaultValue="" placeholder="Enter amount" rules={{required:{value:true, message:'Please enter amount'}}} />
                            <Select name="currency" errors={errors} defaultValue="" control={control} options={currencyOptions} rules={{required:{value:true, message:'Please select currency'}}}/>
                            <Select name="paymentOptions" errors={errors} defaultValue="" control={control} options={paymentOptions} rules={{required:{value:true, message:'Please select payment option'}}}/>
                        <Box w="100%" d="flex" justifyContent="center" alignItems="center" mt="1rem">
                            <Button colorScheme="green" w="10rem" h="3rem" borderRadius="1rem" isLoading={isLoading} variant="outline" isDisabled={!formState.isValid} type="submit">Make Payment</Button>
                        </Box>
                    </form>
                </Box>
            </Box>
        </Container>
        </>
    );
};

export default Payment;
