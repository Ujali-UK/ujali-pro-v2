import {
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
} from '@chakra-ui/react';
import React from 'react';

interface Iprops {
  type: string;
  label: string;
  placeholder?: string;
  value?: string | number;
  onChange: any;
  required?: boolean;
  props?: null | number;
  height?: string;
}

const parse = val => val.replace(/^\$/, '');

const CustomNumberInputField: React.FC<Iprops> = ({
  type,
  placeholder,
  value,
  onChange,
  label,
  required,
  height,
  ...props
}) => {
  return (
    <FormControl isRequired={required}>
      <FormLabel fontWeight="bold">{label}</FormLabel>
      <NumberInput
        {...props}
        value={value}
        height="3rem"
        borderRadius="xs"
        width="100%"
        bgColor="#f1f1f6"
        onChange={valueString => onChange(parse(valueString))}
        placeholder={placeholder}
      >
        <NumberInputField height="3rem" placeholder={placeholder} />
      </NumberInput>
    </FormControl>
  );
};

export default CustomNumberInputField;
