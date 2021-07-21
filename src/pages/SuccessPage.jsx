import React, {useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom'
import {Box, Container, Text, Button} from "@chakra-ui/react";
import Tick from '../assets/vector/tick'

const SuccessPage = () => {
    const history = useHistory()
    const [currentTime, setCurrentTime] = useState(5)

    useEffect(()=> {
        const counter = setTimeout(()=>{
            if(currentTime > 0) {
                setCurrentTime(prevState => prevState - 1)
            }
        }, 1000)
        return () => clearTimeout(counter)
    })

    useEffect(() => {
        if(currentTime === 0){
            redirectToHomePage()
        }

    },[currentTime])

    const redirectToHomePage = () => history.push('/')
    return (
        <Container
            maxW="100%"
            w="100%"
            position={"relative"}
            padding={0}
            maxH="100%"
            h="100%"
            margin="0"
            d={'flex'}
            justifyContent="center"
            alignItems='center'
        >
            <Box
                w="24rem"
                h="17rem"
                d="flex"
                borderRadius='1.25rem'
                justifyContent="center"
                alignItems="center"
                flexDir="column"
                pt='2rem'
                pb='2.3rem'
                boxShadow='lg'
            >
                <Box>
                    <Tick/>
                </Box>
                <Text
                    fontSize='1.4rem'
                    lineHeight='1.65rem'
                    fontWeight={400}
                    color='#353542'
                >
                    Payment Successful
                </Text>
                <Box mt='2.5rem' d='flex'>
                    <Text
                        fontSize='0.8rem'
                        lineHeight='1.4rem'
                        color='rgba(53, 53, 66, 0.6)'
                    >
                        {`Redirecting in  ${currentTime} seconds...`}
                    </Text>
                    <Button
                        ml='0.4rem'
                        w='2.7rem'
                        h='1.3rem'
                        fontSize='0.8rem'
                        lineHeight='0.9rem'
                        color='rgba(53, 53, 66, 0.6)'
                        onClick={redirectToHomePage}
                    >
                        Skip
                    </Button>
                </Box>

            </Box>
        </Container>
    );
};

export default SuccessPage;
