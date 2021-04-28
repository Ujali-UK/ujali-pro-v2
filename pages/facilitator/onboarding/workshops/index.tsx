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
import CustomButton from '../../../../src/components/common/CustomButton';
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
  const [facilitatorEvents, setFacilitatorEvents] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    setLoading(true);
    if (user) {
      getFacilitatorDetails();
      getAllEvents();
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

  const onCompleteProfile = async e => {
    e.preventDefault();
    setSaving(true);
    database
      .collection('facilitators')
      .doc(facilitatorDetails?.id)
      .update({
        workshopAndEvents: true,
      })
      .then(() => {
        toast({
          title: 'Facilitator profile completed successfully.',
          status: 'success',
          duration: 4000,
          isClosable: true,
        });
        setSaving(false);
        // getFacilitatorDetails();
        router.push('/facilitator/hub');
      })
      .catch(error => {
        if (error) {
          toast({
            title: 'Updating profile failed.',
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
          const data = doc.data();
          setFacilitatorDetails(data);
          if (!data.deliveryStyle && !data.deliveryStyle === true) {
            router.replace('/facilitator/onboarding/interests');
          }
          setLoading(false);
        });
      })
      .catch(error => {
        setLoading(false);
        // console.log("error", error)
      });
  };

  const getAllEvents = async () => {
    database
      .collection('facilitators')
      .where('ownerUID', '==', user.uid)
      .get()
      .then(async snapshot => {
        snapshot.docs.forEach(async doc => {
          const data = doc.data();
          const allevents = [];
          await database
            .collection('facilitators')
            .doc(data.id)
            .collection('event')
            .get()
            .then(async querySnapShot => {
              querySnapShot.docs.forEach(event => {
                const eventData = event.data();
                allevents.push(eventData);
              });
              setFacilitatorEvents(allevents);
              console.log('event data', allevents);
            });
        });
      });
  };

  return (
    <Protected>
      <Box>
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
              <Box>
                {facilitatorEvents.map((event, i) => {
                  return <Box key={i}>{event.name}</Box>;
                })}
              </Box>

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
              <form onSubmit={e => onCompleteProfile(e)}>
                <Box
                  display={{ md: 'flex' }}
                  justifyContent="space-between"
                  px={{ md: '2rem' }}
                  pt={{ md: '17rem' }}
                >
                  <CustomButton
                    direction="previous"
                    label="Previous"
                    onClick={() =>
                      router.push('/facilitator/onboarding/interests')
                    }
                    type="button"
                  />
                  <CustomButton
                    direction="next"
                    label={saving ? 'Saving...' : 'Complete profile'}
                    saving={saving}
                    type="submit"
                  />
                </Box>
              </form>
            </Box>
          </Box>
        ) : (
          <PageLoader />
        )}
      </Box>
    </Protected>
  );
};

export default Workshops;
