import React, {useEffect} from 'react';
import {Box, Spacer, Button, Text, Container} from "@chakra-ui/react";
import {useForm} from "react-hook-form";
import {useMutation} from "react-query";
import {CardPinInput, CreditCardInput, ExpiryCardInput, Input} from "./Component";
import {useResponse} from "./hooks/useResponse";
import {directCharge} from "./api/payment";
import {alphabetOnly} from "./utils/constants";
import cardValidator from "card-validator";
import {useRecoilValue} from "recoil";
import {paymentStateDetails} from "./atoms/paymentState";

//
// {
//     "orderAmount": 5000,
//     "orderCurrency": "NGN",
//     "cardNumber": "5399670123490229",
//     "expiryMonth": "05",
//     "expiryYear": "22",
//     "securityCode": "439",
//     "transRef": "iy67f64hvc63",
//     "customerEmail": "cirochwukunle@example.com",
//     "customerName": "Ciroma Chukwuma Adekunle",
//     "customerPhoneNo": "2348012345678",
//     "paymentSlug": "0H0UOEsawNjkIxgspANd"
// }

// amount: "500"
// currency: "NGN"
// customerEmail: "osbornetunde@gmail.com"
// customerName: "Tunde Elliot Osborne"
// customerPhoneNo: "08032698324"
// paymentOptions: "CARD"

cardValidator.creditCardType.addCard({
    niceType: 'VERVE',
    type: 'verve',
    patterns: [50],
    gaps: [4, 8, 12, 16],
    lengths: [18, 19],
    code: {
        name: 'CVV',
        size: 3,
    },
});

export const validateCardNumber = (value) => {
    const numberValidation = cardValidator.number(value);
    return numberValidation.isValid || 'Card number is not valid';
};

export const validateExpiryDate = (value) => {
    const expirationDateValidation = cardValidator.expirationDate(value);
    return expirationDateValidation.isValid || 'Card has expired';
};

const PayWithCard = ( ) => {
    const { control, handleSubmit, errors, formState } = useForm({
        mode: 'onChange',
        criteriaMode: 'all',
    });

    const paymentDetails = useRecoilValue(paymentStateDetails);

    console.log("======>", paymentDetails)

    const mutations  = useMutation(directCharge);
    const { mutate, isLoading, data } = mutations;
    const { result } = useResponse(data, 'Payment Successful', 'Failed to make payment');

    useEffect(() => {
        if (Object.entries(result).length > 0) {
            if (result?.status === 200) {
                console.log("hello")
            }
        }
    }, [result]);

    const handleNext = (values) => {
        values.cardNumber = values?.cardNumber.replace(/ /g, '');

        let month = values.expiryDate.split('/')[0];
        let year = values.expiryDate.split('/')[1];

        const rechargeDetails = {
            currency_code: 'NGN',
            cardDetails: {
                ...values,
                expiryMonth: month,
                expiryYear: year,
            },
        };
        delete rechargeDetails.cardDetails.expiryDate;
        mutate(rechargeDetails);
    };
    return (
        <Container maxW="container.xl" position={"relative"}>
            <Box w="100%" d="flex" justifyContent="center" alignItems="center" flexDirection="column" mt="2.5rem">
                <Text fontSize="2xl">Payment Page</Text>
                <Box width="30rem" bg="#ffffff" borderRadius="1rem" p={5}>
            <form>
                <Box>
                    <Input
                        placeholder="Cardholder Name"
                        type="text"
                        control={control}
                        errors={errors}
                        name="fullName"
                        rules={{
                            required: { value: true, message: "Cardholder's Name is required" },
                            minLength: { value: 3, message: 'Must be more than 3 characters' },
                            pattern: alphabetOnly,
                        }}
                        defaultValue=""
                    />
                </Box>
                <CreditCardInput
                    placeholder="Enter Your card Number"
                    type="tel"
                    control={control}
                    errors={errors}
                    name="cardNumber"
                    rules={{
                        required: {
                            value: true,
                            message: 'Card number is required',
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
                                required: { value: true, message: 'Enter card expiryDate' },
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
                            name="cvv"
                            rules={{
                                required: { value: true, message: 'CVV number is required' },
                                maxLength: { value: 3, message: 'Must be 3 digits' },
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
                                required: { value: true, message: 'Four-Digit PIN is required' },
                                maxLength: { value: 4, message: 'Must be 4 digits' },
                            }}
                            defaultValue=""
                        />
                    </Box>
                    <Spacer size="1rem" />
                    <Box width={'65%'}>
                        <Input
                            placeholder="Phone Number"
                            type="tel"
                            control={control}
                            errors={errors}
                            name="phoneNumber"
                            rules={{
                                required: { value: true, message: 'Phone number is required' },
                                maxLength: { value: 11, message: 'Must be 11 digits long without 234' },
                                minLength: { value: 11, message: 'Must be 11 digits long' },
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
                    isLoading={isLoading}
                >
                    Pay Now
                </Button>
            </form>
                </Box>
            </Box>
        </Container>
    );
};

export default PayWithCard;
