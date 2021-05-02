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
import { format } from 'date-fns';
import React, { useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { MdDelete } from 'react-icons/md';
import { database } from '../../utils/firbase-config';
import { nameShortner } from '../../utils/helpers';

const GigsCard = ({ gig, companyDetails, getAllGigs }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deleting, setDeleting] = useState(false);
  const toast = useToast();

  const onDeleteGig = async id => {
    setDeleting(true);
    database
      .collection('companies')
      .doc(companyDetails?.id)
      .collection('gigs')
      .doc(id)
      .delete()
      .then(() => {
        setDeleting(false);
        toast({
          title: 'Gig deleted successfully.',
          status: 'success',
          duration: 4000,
          isClosable: true,
        });
        onClose();
        getAllGigs();
      })
      .catch(error => {
        toast({
          title: 'Error deleting Gig.',
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
      border="1px solid #707070"
      borderRadius="md"
      _hover={{ boxShadow: '2xl' }}
    >
      <Box
        width="100%"
        height="8rem"
        backgroundImage={
          gig.coverImage && gig.coverImage?.length > 0
            ? `url(${gig?.coverImage})`
            : 'url(https://res.cloudinary.com/w3bh4ck/image/upload/v1617668753/ujali/ujali-pro/facilitators-cover-image.jpg)'
        }
        backgroundRepeat="no-repeat"
        bgPos="center"
        bgSize="cover"
      ></Box>
      <Box px="0.5rem" pb="2rem">
        <Text fontSize="lg" textTransform="capitalize" fontWeight="bold">
          {nameShortner(gig?.gigName, 30)}
        </Text>
        <Text mt="-0.5" fontSize="sm" color="brand.orange">
          {gig?.minimumPricePerPerson}£ per person ({gig?.employeesNumber}{' '}
          spaces available){' '}
        </Text>
        <Text fontSize="md">description</Text>
        <Divider pt="4" orientation="horizontal" />
        <Text>
          <span style={{ fontWeight: 'bold' }}>Location:</span>{' '}
          {gig.eventLocation && gig.eventLocation instanceof Object === true
            ? gig.eventLocation.formattedAddress
            : gig.eventLocation}
        </Text>
        <Box d="flex" justifyContent="space-between" pt="1rem">
          <Box>
            {/* <Icon color="brand.orange" as={MdDateRange} w={8} h={8} />{' '} */}
            <Text fontWeight="bold">Start Date:</Text>
            <Text pt="0.2rem">
              {format(
                gig && gig.fromDate && gig.fromDate instanceof Object === false
                  ? new Date(gig.fromDate)
                  : new Date(),
                'Lo LLL, yyyy'
              )}
            </Text>
          </Box>
          <Box>
            {/* <Icon color="brand.orange" as={MdDateRange} w={8} h={8} />{' '} */}
            <Text fontWeight="bold">End Date:</Text>
            <Text>
              {format(
                gig?.toDate &&
                  gig.toDate &&
                  gig.toDate instanceof Object === false
                  ? new Date(gig.toDate)
                  : new Date(),
                'Lo LLL, yyyy'
              )}
            </Text>
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
            <ModalHeader>Delete Gig</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              You are about to delete a gig, are you sure you want to delete{' '}
              <span style={{ color: 'red' }}>{gig?.gigName}</span>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="gray" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button
                type="button"
                onClick={() => onDeleteGig(gig?.id)}
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

export default GigsCard;
