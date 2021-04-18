import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Select } from '@chakra-ui/select';
import React from 'react';

interface Iprops {
  placeholder?: string;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  label: string;
  options: string[];
  value?: string;
}

const SelectInput: React.FC<Iprops> = ({
  value,
  placeholder,
  required,
  onChange,
  label,
  options,
  ...props
}) => {
  return (
    <FormControl width="100%" borderRadius="xs" isRequired={required}>
      <FormLabel fontWeight="bold">{label}</FormLabel>
      <Select
        value={value}
        height="3rem"
        {...props}
        onChange={onChange}
        bgColor="#f1f1f6"
        width="100%"
        placeholder={placeholder}
      >
        {options.map((option, i) => {
          return (
            <option key={i} value={option}>
              {option}
            </option>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default SelectInput;
