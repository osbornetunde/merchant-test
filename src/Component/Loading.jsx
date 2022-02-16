import React from "react";
import { Box, Spinner } from "@chakra-ui/react";

const Loading = ({ isLoading }) => {
  if (!isLoading) return null;
  return (
    <Box
      zIndex="100"
      position="absolute"
      left="50%"
      top="50%"
      transform="translate(-50%, -50%)"
    >
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </Box>
  );
};

export default Loading;
