// .storybook/preview.js

import React from 'react';

import { ChakraProvider } from "@chakra-ui/react"

export const decorators = [
    (Story) => (
        <ChakraProvider>
            <Story />
        </ChakraProvider>
    ),
];

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
};
