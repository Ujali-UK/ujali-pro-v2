import { Button } from '@chakra-ui/button';
import { useDisclosure } from '@chakra-ui/hooks';
import Icon from '@chakra-ui/icon';
import { Box, Divider, Text } from '@chakra-ui/layout';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal';
import { format } from 'date-fns/esm';
import React, { useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { MdDateRange, MdDelete, MdTimer } from 'react-icons/md';
import { database } from '../../utils/firbase-config';
import { nameShortner } from '../../utils/helpers';

const EventCard = ({ event, getAllEvents, facilitatorDetails }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deleting, setDeleting] = useState(false);
  const toast = useToast();

  const onDeleteEvent = async id => {
    setDeleting(true);
    database
      .collection('facilitators')
      .doc(facilitatorDetails?.id)
      .collection('event')
      .doc(id)
      .delete()
      .then(() => {
        setDeleting(false);
        toast({
          title: 'Event deleted successfully.',
          status: 'success',
          duration: 4000,
          isClosable: true,
        });
        onClose();
        getAllEvents();
      })
      .catch(error => {
        toast({
          title: 'Error deleting event.',
          status: 'error',
          duration: 4000,
          isClosable: true,
        });
        onClose();
      });
  };

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
      <Box px="0.5rem" pb="2rem">
        <Text fontSize="lg" textTransform="capitalize" fontWeight="bold">
          {nameShortner(event.eventName, 30)}
        </Text>
        <Text mt="-0.5" fontSize="sm" color="brand.orange">
          {event?.pricePerPerson}£ per person ({event?.spacesAvailable} spaces
          available){' '}
        </Text>
        <Text fontSize="md">{event.eventDescription}</Text>
        <Divider pt="4" orientation="horizontal" />
        <Text>
          <span style={{ fontWeight: 'bold' }}>Location:</span>{' '}
          {event.eventLocation}
        </Text>
        <Box d="flex" justifyContent="space-between" pt="1rem">
          <Box d="flex">
            <Icon color="brand.orange" as={MdDateRange} w={8} h={8} />{' '}
            <Text pt="0.2rem">
              {format(
                event.eventDateStart
                  ? new Date(event.eventDateStart)
                  : new Date(),
                'Lo LLL, yyyy'
              )}
            </Text>
          </Box>
          <Box d="flex">
            <Icon color="brand.orange" as={MdTimer} w={8} h={8} />{' '}
            <Text pt="0.2rem">{event?.eventTimeStart}</Text>
          </Box>
        </Box>
      </Box>
      <Box d="flex" justifyContent="flex-end">
        <Icon
          p="2"
          onClick={onOpen}
          color="red"
          cursor="pointer"
          as={MdDelete}
          w={8}
          h={8}
        />
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Delete Event</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              You are about to delete an event, are you sure you want to delete{' '}
              <span style={{ color: 'red' }}>{event?.eventName}</span>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="gray" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button
                type="button"
                onClick={() => onDeleteEvent(event?.id)}
                bg="red"
                color="white"
              >
                {deleting ? 'Deleting...' : 'Delete'}
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Box>
  );
};

export default EventCard;
