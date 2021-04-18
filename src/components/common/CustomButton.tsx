import { Button } from '@chakra-ui/button';
import React from 'react';
import { MdArrowBack, MdArrowForward } from 'react-icons/md';

interface Iprops {
  saving?: true;
  type: 'button' | 'submit';
  label: string;
  direction?: 'next' | 'previous';
  onClick?: () => void;
}

const CustomButton: React.FC<Iprops> = ({
  saving,
  type,
  direction,
  label,
  onClick,
}) => {
  return (
    <Button
      borderRadius="lg"
      color="white"
      height="3rem"
      onClick={onClick}
      bgColor={direction === 'next' ? 'brand.orange' : 'brand.gray'}
      width="15rem"
      isDisabled={saving}
      _hover={{
        bgColor: 'brand.gray',
      }}
      _disabled={{
        bgColor: 'brand.gray',
      }}
      type={type}
      mt="2rem"
      rightIcon={direction === 'next' && <MdArrowForward />}
      leftIcon={direction === 'previous' && <MdArrowBack />}
    >
      {saving ? 'Saving...' : label}
    </Button>
  );
};

export default CustomButton;
