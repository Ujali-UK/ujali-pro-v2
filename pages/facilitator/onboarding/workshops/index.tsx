import { Button } from '@chakra-ui/button';
import { useDisclosure } from '@chakra-ui/hooks';
import { Box, Text } from '@chakra-ui/layout';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal';
import { useToast } from '@chakra-ui/toast';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import CustomHeading from '../../../../src/components/common/custom-heading';
import Eventform from '../../../../src/components/event-form/Eventform';
import PageLoader from '../../../../src/components/loaders/PageLoader';
import FacilitatorProgres from '../../../../src/components/navbar/Facilitator-progress-nav';
import Protected from '../../../../src/layout/Protected';
import { useAuth } from '../../../../src/providers/auth-provider/Auth-provider';
import { database, firebase } from '../../../../src/utils/firbase-config';

const Workshops = () => {
  const { user } = useAuth();
  const router = useRouter();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [facilitatorDetails, setFacilitatorDetails] = useState<any>({});
  // const [workshops, setWorkshops] = useState([])
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    setLoading(true);
    if (user) {
      getFacilitatorDetails();
    }
  }, [user]);

  const onSaveEvent = async (e, details) => {
    e.preventDefault();
    setSaving(true);
    database
      .collection('facilitators')
      .doc(facilitatorDetails?.id)
      .collection('event')
      .add({
        ...details,
        ownerUID: facilitatorDetails?.ownerUID,
        facilitatorId: facilitatorDetails?.id,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(async docRef => {
        database
          .collection('facilitators')
          .doc(facilitatorDetails?.id)
          .collection('event')
          .doc(docRef.id)
          .set(
            {
              id: docRef.id,
            },
            { merge: true }
          );
      })
      .then(() => {
        toast({
          title: 'New event created successfully.',
          status: 'success',
          duration: 4000,
          isClosable: true,
        });
        onClose();
        setSaving(false);
      })
      .catch(error => {
        if (error) {
          toast({
            title: 'Event creation failed.',
            status: 'error',
            duration: 4000,
            isClosable: true,
          });
        }
        setSaving(false);
      });
  };

  const getFacilitatorDetails = async () => {
    await database
      .collection('facilitators')
      .where('ownerUID', '==', user.uid)
      .get()
      .then(async snapshot => {
        snapshot.docs.forEach(doc => {
          setFacilitatorDetails(doc.data());
          const data = doc.data();
          if (!data.deliveryStyle && !data.deliveryStyle === true) {
            router.replace('/facilitator/onboarding/interests');
          }
          setLoading(false);
        });
        await database
          .collection(`facilitator/${facilitatorDetails.id}/event`)
          .where('ownerUID', '==', user.uid)
          .get()
          .then(data => {
            data.docs.forEach(doc => {
              console.log('check event', doc.data());
            });
          })
          .catch(error => {
            console.log('error', error);
          });
      })
      .catch(error => {
        setLoading(false);
        // console.log("error", error)
      });
  };

  return (
    <Protected>
      <FacilitatorProgres facilitatorDetails={facilitatorDetails} />
      {!loading ? (
        <Box px={{ base: '1rem', md: '6rem' }} pb="5rem" overflowY="auto">
          <Box>
            <CustomHeading value="Your Events/Workshops" />
            <Text px={{ md: '2rem' }}>
              Create your events for companies and agencies to participate
            </Text>
            <Box px={{ md: '2rem' }} pt={{ base: '1rem', md: '2rem' }}>
              <Button
                onClick={onOpen}
                type="button"
                color="white"
                bgColor="brand.orange"
              >
                Create new event
              </Button>
            </Box>
            <Box></Box>
            <Modal size="xl" isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Add New Event</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Eventform onSaveEvent={onSaveEvent} saving={saving} />
                </ModalBody>
                <ModalFooter
                  display="flex"
                  justifyContent="space-between"
                  mx="1rem"
                ></ModalFooter>
              </ModalContent>
            </Modal>
          </Box>
        </Box>
      ) : (
        <PageLoader />
      )}
    </Protected>
  );
};

export default Workshops;
