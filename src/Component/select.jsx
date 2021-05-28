import * as React from 'react';
import { Select as ChakraSelect } from '@chakra-ui/react';
import { Controller } from 'react-hook-form';
import {Error} from "./input";



const Select = ({ name, errors, defaultValue, control,options, placeholder}) => {
    return(
        <>
            <Controller
            name={name}
            control={control}
            defaultValue={defaultValue}
            render={({onChange, value, ref} ) => {
                return (
                    <ChakraSelect
                    placeholder={placeholder}
                    h="3rem"
                    bg="var(--primary-white)"
                    borderRadius="1rem"
                    border="1px solid #E5E5E5"
                    fontSize="1rem"
                    mt="1.5rem"
                    value={value}
                    ref={ref}
                    onChange={onChange}
                >
                    {options.map((item,index) => <option value={item.value} key={index}>{item.label}</option>)}
                </ChakraSelect>)
            }
                }
        />
            <Error errors={errors} name={name}/>
        </>
    )
};

export { Select }
