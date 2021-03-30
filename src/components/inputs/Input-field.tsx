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
}

const InputField: React.FC<Iprops> = ({
  type,
  placeholder,
  value,
  onChange,
  label,
  required,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <FormControl isRequired={required}>
      <FormLabel>{label}</FormLabel>
      <InputGroup {...props} width="100%" size="md" borderRadius="xs">
        <Input
          value={value}
          width="100%"
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
