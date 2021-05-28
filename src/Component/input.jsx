import React from 'react';
import {Controller} from 'react-hook-form';
import {Input as ChakraInput, Text, Textarea as ChakraTextarea,} from '@chakra-ui/react';
// import NumberFormat from "react-number-format";

export const Error = ({ errors, name }) =>
    errors[name] ? (
        <Text color="red" fontSize="1rem" pt="0.5rem">
            {errors[name].message}
        </Text>
    ) : null;

const Input = ({ name, type, placeholder, defaultValue, control, rules, errors, maxLength }) => {
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

const Textarea = ({ name, type, placeholder, defaultValue, control, rules, errors }) => {
    return (
        <>
            <Controller
                name={name}
                render={({ value, onChange }) => (
                    <ChakraTextarea
                        isInvalid={errors[name]}
                        h="32.5rem"
                        w="100%"
                        bg="var(--primary-white)"
                        borderRadius="1rem"
                        border="1px solid #E5E5E5"
                        fontSize="1rem"
                        mt="3rem"
                        type={type}
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
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

// const CreditCardInput = ({ name, type, placeholder, defaultValue, control, rules, errors, maxLength }) => {
//     return (
//         <>
//             <Controller
//                 name={name}
//                 render={({ value, onChange }) => (
//                     <NumberFormat
//                         format="#### #### #### ####"
//                         customInput={ChakraInput}
//                         isInvalid={errors[name]}
//                         h="5rem"
//                         w="100%"
//                         bg="var(--primary-white)"
//                         borderRadius="1rem"
//                         border="1px solid #E5E5E5"
//                         fontSize="1.6rem"
//                         mt="3rem"
//                         type={type}
//                         value={value}
//                         onChange={onChange}
//                         placeholder={placeholder}
//                         maxLength={maxLength}
//                     />
//                 )}
//                 defaultValue={defaultValue}
//                 rules={rules}
//                 control={control}
//             />
//             <Error errors={errors} name={name} />
//         </>
//     );
// };

// const ExpiryCardInput = ({ name, type, placeholder, defaultValue, control, rules, errors, maxLength }) => {
//     return (
//         <>
//             <Controller
//                 name={name}
//                 render={({ value, onChange }) => (
//                     <NumberFormat
//                         format="##/##"
//                         mask={['M', 'M', 'Y', 'Y']}
//                         customInput={ChakraInput}
//                         isInvalid={errors[name]}
//                         h="5rem"
//                         w="100%"
//                         bg="var(--primary-white)"
//                         borderRadius="1rem"
//                         border="1px solid #E5E5E5"
//                         fontSize="1.6rem"
//                         mt="3rem"
//                         type={type}
//                         value={value}
//                         onChange={onChange}
//                         placeholder={placeholder}
//                         maxLength={maxLength}
//                     />
//                 )}
//                 defaultValue={defaultValue}
//                 rules={rules}
//                 control={control}
//             />
//             <Error errors={errors} name={name} />
//         </>
//     );
// };

export { Input, Textarea };
