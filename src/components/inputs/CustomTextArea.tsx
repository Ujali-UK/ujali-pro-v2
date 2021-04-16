import { FormControl, FormLabel, InputGroup, Textarea } from '@chakra-ui/react';
import React from 'react';

interface Iprops {
  label: string;
  placeholder?: string;
  value?: string | number;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  props?: any;
  height?: string;
}

const CustomTextArea: React.FC<Iprops> = ({
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
      <InputGroup width="100%" size="md" borderRadius="xs">
        <Textarea
          {...props}
          value={value}
          height={height}
          width="100%"
          onChange={onChange}
          size="lg"
          colorScheme="brand.orange"
          placeholder={placeholder}
        />
      </InputGroup>
    </FormControl>
  );
};

export default CustomTextArea;
