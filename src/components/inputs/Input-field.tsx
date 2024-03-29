import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';

interface Iprops {
  type: string;
  label: string;
  placeholder?: string;
  value?: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  props?: any;
  height?: string;
}

const InputField: React.FC<Iprops> = ({
  type,
  placeholder,
  value,
  onChange,
  label,
  required,
  height,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <FormControl isRequired={required}>
      <FormLabel fontWeight="bold">{label}</FormLabel>
      <InputGroup width="100%" size="md" borderRadius="xs">
        <Input
          {...props}
          value={value}
          height={height}
          width="100%"
          bgColor="#f1f1f6"
          onChange={onChange}
          type={!showPassword ? type : 'text'}
          placeholder={placeholder}
        />
        {type === 'password' && (
          <>
            {' '}
            <InputRightElement
              onClick={() => setShowPassword(!showPassword)}
              cursor="pointer"
              children={showPassword ? <MdVisibility /> : <MdVisibilityOff />}
            />{' '}
          </>
        )}
      </InputGroup>
    </FormControl>
  );
};

export default InputField;
