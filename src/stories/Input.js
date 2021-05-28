import React from 'react';
import {Controller} from 'react-hook-form';
import {Input as ChakraInput, Text} from '@chakra-ui/react';

export const Error = ({ errors, name }) =>
    errors[name] ? (
        <Text color="red" fontSize="1rem" pt="0.5rem">
            {errors[name].message}
        </Text>
    ) : null;

export const Input = ({ name, type, placeholder, defaultValue, control, rules, errors, maxLength }) => {
    return (
        <>
            <Controller
                name={name}
                render={({ value, onChange }) => (
                    <ChakraInput
                        isInvalid={errors[name]}
                        h="3rem"
                        w="100%"
                        bg="var(--primary-white)"
                        borderRadius="1rem"
                        border="1px solid #E5E5E5"
                        fontSize="1rem"
                        mt="1.5rem"
                        type={type}
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                        maxLength={maxLength}
                    />
                )}
                defaultValue={defaultValue}
                rules={rules}
                control={control}
            />
            <Error errors={errors} name={name} />
        </>
    );
};
