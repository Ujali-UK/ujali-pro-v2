import Icon from '@chakra-ui/icon';
import { Box, Grid, Text } from '@chakra-ui/layout';
import React from 'react';
import { EmptyStateSvg } from '../../assets/icons/empty-state';
import EventCard from './EventCard';

type Event = {
  eventDateStart: string;
  eventDescription: string;
  eventLocation: string;
  eventName: string;
  eventTimeStart: string;
  facilitatorId: string;
  id: string;
  ownerUID: string;
  pricePerPerson: string | number;
  spacesAvailable: string | number;
};

interface Iprops {
  events?: Event[] | undefined;
  loading?: true | false;
  getAllEvents: () => void;
  facilitatorDetails: any;
}

const FacilitatorEvents: React.FC<Iprops> = ({
  events,
  loading,
  getAllEvents,
  facilitatorDetails,
}) => {
  return (
    <Box>
      <Grid
        templateColumns={{ md: 'repeat(3, 1fr)', base: 'repeat(1, 1fr)' }}
        gap={6}
      >
        {events && events.length > 0
          ? events.map((event, i) => {
              return (
                <EventCard
                  facilitatorDetails={facilitatorDetails}
                  getAllEvents={getAllEvents}
                  event={event}
                  key={i}
                />
              );
            })
          : ''}
      </Grid>
      {(loading === false && !events) ||
        (events.length < 1 && (
          <Box textAlign="center">
            <Text fontWeight="bold" fontSize="xl">
              No Event or Workshop added
            </Text>
            <Box d="flex" justifyContent="center">
              <Icon as={EmptyStateSvg} w={60} h={60} />
            </Box>
          </Box>
        ))}
    </Box>
  );
};

export default FacilitatorEvents;
