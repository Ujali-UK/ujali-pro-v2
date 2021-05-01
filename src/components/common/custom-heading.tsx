import { Heading } from '@chakra-ui/layout';
import React from 'react';

interface Iprops {
  value: string;
}

const CustomHeading: React.FC<Iprops> = ({ value }) => {
  return (
    <Heading
      textTransform="uppercase"
      fontSize={{ base: 'md', md: '2xl' }}
      pt="2rem"
      px={{ md: '2rem', base: '2rem' }}
    >
      {' '}
      {value}
    </Heading>
  );
};

export default CustomHeading;
