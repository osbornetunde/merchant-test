import * as React from "react";
import {Select as ChakraSelect, Box} from "@chakra-ui/react";
import ChakraMultiSelect from "./chakra-multi-select";
import {Controller} from "react-hook-form";
import {Error} from "./input";

const Select = ({
  name,
  errors,
  defaultValue,
  control,
  options,
  placeholder,
}) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({onChange, value, ref}) => {
          return (
            <ChakraSelect
              placeholder={placeholder}
              color="rgba(53, 53, 66, 0.5)"
              h="3rem"
              bg="var(--primary-white)"
              borderRadius="1rem"
              border="1px solid #E5E5E5"
              fontSize="1rem"
              mt="1.5rem"
              value={value}
              ref={ref}
              onChange={onChange}>
              {options.map((item, index) => (
                <option value={item.value} key={index}>
                  {item.label}
                </option>
              ))}
            </ChakraSelect>
          );
        }}
      />
      <Error errors={errors} name={name} />
    </>
  );
};

const MultiSelect = ({
  name,
  errors,
  defaultValue,
  control,
  options,
  placeholder,
}) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({onChange, value, ref}) => {
            return (
              <Box mt="1.5rem">
                <ChakraMultiSelect
                  isMulti
                  options={options}
                  closeMenuOnSelect={false}
                  placeholder={placeholder}
                  color="rgba(53, 53, 66, 0.5)"
                  size="lg"
                  h="3rem"
                  borderRadius="1rem"
                  border="1px solid #E5E5E5"
                  fontSize="1rem"
                  value={value.value}
                  ref={ref}
                  onChange={onChange}
                />
              </Box>
            );
        }}
      />
      <Error errors={errors} name={name} />
    </>
  );
};

export {Select, MultiSelect};
