import React from 'react';
import { Link } from 'react-router-dom';
import {Container, Flex, LinkOverlay, SimpleGrid, LinkBox, Text} from "@chakra-ui/react";


const LandingPage = () => {
    return (
        <Container
            maxW="100%"
            w="100%"
            position={"relative"}
            padding={0}
            maxH="100%"
            h="100%"
            margin="0">
            <Flex
                d={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
                height={'100%'}
                p={3}
            >
            <SimpleGrid columns={4} spacing={10} >
                <LinkBox
                    bg="white"
                     height="10rem"
                    w={'12rem'}
                    rounded="md"
                    d={'flex'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    boxShadow="lg"
                    _hover={{boxShadow:"0px 21.5645px 17.2516px rgba(51, 51, 51, 0.09)"}}
                >
                    <LinkOverlay as={Link} to={'/standard-payment'}>
                        <Text fontSize="lg"> Standard Payment</Text>
                    </LinkOverlay>
                </LinkBox>
                <LinkBox
                    bg="white"
                    height="10rem"
                    w={'12rem'}
                    rounded="md"
                    d={'flex'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    boxShadow="lg"
                    _hover={{boxShadow:"0px 21.5645px 17.2516px rgba(51, 51, 51, 0.09)"}}
                >
                    <LinkOverlay href="https://merchant-test-card.vercel.app">
                        <Text fontSize="lg">Direct Charge</Text>
                    </LinkOverlay>
                </LinkBox>
                <LinkBox
                    bg="white"
                    height="10rem"
                    w={'12rem'}
                    rounded="md"
                    d={'flex'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    boxShadow="lg"
                    _hover={{boxShadow:"0px 21.5645px 17.2516px rgba(51, 51, 51, 0.09)"}}
                >
                    <LinkOverlay href="https://merchant-test-threeds.vercel.app">
                        <Text fontSize="lg">Direct Charge with 3ds</Text>
                    </LinkOverlay>
                </LinkBox>
                <LinkBox
                    bg="white"
                    height="10rem"
                    w={'12rem'}
                    rounded="md"
                    d={'flex'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    boxShadow="lg"
                    _hover={{boxShadow:"0px 21.5645px 17.2516px rgba(51, 51, 51, 0.09)"}}
                >
                    <LinkOverlay href="https://vigorous-tereshkova-485ca4.netlify.app">
                        <Text fontSize="lg">Inline Payment</Text>
                    </LinkOverlay>
                </LinkBox>
            </SimpleGrid>
            </Flex>
        </Container>
    );
};

//https://vigorous-tereshkova-485ca4.netlify.app/

export default LandingPage;
