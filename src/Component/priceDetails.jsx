import React from "react";
import {Box, Text} from "@chakra-ui/react";

export const PriceDetails = () => {
  return (
    <Box
      bg="rgba(76, 76, 76, 0.3)"
      d="flex"
      flexDir="column"
      borderRadius="12px 0px 0px 12px"
      w="460px"
      h="165px"
      style={{backdropFilter: "blur(20px)"}}
      p="24px 72px 19px 49px"
      position="absolute"
      top="60%"
      right="0"
      border="1px solid var(--primary-white)">
      <Text size="md" color="rgba(255,255,255,0.6)">
        Skin So Soft
      </Text>
      <Text size="xl" color="rgba(255,255,255)" mb="0.8rem">
        Aroma Therapy Calming Gelled BodyOil
      </Text>
      <Text size="md" color="rgba(255,255,255,0.6)" mb="1.1rem">
        Medium (200ml)
      </Text>
      <Text size="5xl" color="rgba(255,255,255)" fontWeight="bold">
        ₦2,700.00
      </Text>
    </Box>
  );
};
