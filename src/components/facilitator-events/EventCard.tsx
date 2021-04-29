import { Box } from '@chakra-ui/layout';
import React from 'react';

const EventCard = ({ event }) => {
  return (
    <Box
      w="100%"
      minH="15rem"
      border="1px solid gray"
      borderRadius="md"
      _hover={{ boxShadow: '2xl' }}
    >
      <Box
        width="100%"
        height="8rem"
        backgroundImage={
          event.coverImage && event.coverImage?.length > 0
            ? `url(${event?.coverImage})`
            : 'url(https://res.cloudinary.com/w3bh4ck/image/upload/v1617668753/ujali/ujali-pro/facilitators-cover-image.jpg)'
        }
        backgroundRepeat="no-repeat"
        bgPos="center"
        bgSize="cover"
      ></Box>
    </Box>
  );
};

export default EventCard;
