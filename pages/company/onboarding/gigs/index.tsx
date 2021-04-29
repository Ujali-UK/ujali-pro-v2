import { Button } from '@chakra-ui/button';
import { useDisclosure } from '@chakra-ui/hooks';
import Icon from '@chakra-ui/icon';
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
import { EmptyStateSvg } from '../../../../src/assets/icons/empty-state';
import CustomHeading from '../../../../src/components/common/custom-heading';
import CustomButton from '../../../../src/components/common/CustomButton';
import CompanyGigs from '../../../../src/components/company-gigs-form/CompanyGigs';
import GigsForm from '../../../../src/components/company-gigs-form/GigsForm';
import CompanyTabs from '../../../../src/components/company-tabs/CompanyTabs';
import PageLoader from '../../../../src/components/loaders/PageLoader';
import Protected from '../../../../src/layout/Protected';
import { useAuth } from '../../../../src/providers/auth-provider/Auth-provider';
import { database, firebase } from '../../../../src/utils/firbase-config';

const Gigs = () => {
  const { user } = useAuth();
  const toast = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [companyDetails, setCompanyDetails] = useState<any>({});
  const [companyGigs, setCompanyGigs] = useState<any>({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (user) {
      getCompanyDetails();
      getAllGigs();
    }
  }, [user]);

  const getCompanyDetails = async () => {
    await database
      .collection('companies')
      .where('ownerUID', '==', user.uid)
      .get()
      .then(async snapshot => {
        snapshot.docs.forEach(doc => {
          const data = doc.data();
          setCompanyDetails(data);
          if (!data.companyOverview && !data.companyOverview === true) {
            router.replace('/company/onboarding/overview');
          }
          setLoading(false);
        });
      })
      .catch(error => {
        setLoading(false);
        // console.log("error", error)
      });
  };

  const onSaveGig = async (e, details) => {
    e.preventDefault();
    setSaving(true);
    database
      .collection('companies')
      .doc(companyDetails?.id)
      .collection('gigs')
      .add({
        ...details,
        ownerUID: companyDetails?.ownerUID,
        companyID: companyDetails?.id,
        coverImage: companyDetails?.coverImage,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(async docRef => {
        database
          .collection('companies')
          .doc(companyDetails?.id)
          .collection('gigs')
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
          title: 'New gig created successfully.',
          status: 'success',
          duration: 4000,
          isClosable: true,
        });
        onClose();
        getAllGigs();
        setSaving(false);
      })
      .catch(error => {
        if (error) {
          toast({
            title: 'Gig creation failed.',
            status: 'error',
            duration: 4000,
            isClosable: true,
          });
        }
        setSaving(false);
      });
  };

  const getAllGigs = async () => {
    database
      .collection('companies')
      .where('ownerUID', '==', user.uid)
      .get()
      .then(async snapshot => {
        snapshot.docs.forEach(async doc => {
          const data = doc.data();
          const allGigs = [];
          await database
            .collection('companies')
            .doc(data.id)
            .collection('gigs')
            .get()
            .then(async querySnapShot => {
              querySnapShot.docs.forEach(event => {
                const gigData = event.data();
                allGigs.push(gigData);
              });
              setCompanyGigs(allGigs);
            });
        });
      });
  };

  const onCompleteProfile = async e => {
    e.preventDefault();
    setSaving(true);
    database
      .collection('companies')
      .doc(companyDetails?.id)
      .update({
        profileCompleted: true,
      })
      .then(() => {
        toast({
          title: 'Company profile completed successfully.',
          status: 'success',
          duration: 4000,
          isClosable: true,
        });
        setSaving(false);
        // getFacilitatorDetails();
        router.push('/company/hub');
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

  return (
    <Protected>
      <CompanyTabs route={router.pathname} />

      {!loading ? (
        <Box px={{ base: '1rem', md: '6rem' }} pb="5rem" overflowY="auto">
          <CustomHeading value="Your gigs" />
          <Box px={{ md: '2rem' }} pt={{ base: '1rem', md: '2rem' }}>
            <Button
              onClick={onOpen}
              type="button"
              color="white"
              bgColor="brand.orange"
            >
              Create new event
            </Button>

            {companyGigs && companyGigs.length > 0 ? (
              <Box>
                <CompanyGigs
                  companyGigs={companyGigs}
                  companyDetails={companyDetails}
                  getAllGigs={getAllGigs}
                />
              </Box>
            ) : (
              <Box textAlign="center">
                <Text fontWeight="bold" fontSize="xl">
                  No Company Gig Added
                </Text>
                <Box d="flex" justifyContent="center">
                  <Icon as={EmptyStateSvg} w={60} h={60} />
                </Box>
              </Box>
            )}
          </Box>
          <form onSubmit={e => onCompleteProfile(e)}>
            <Box
              display={{ md: 'flex' }}
              justifyContent="space-between"
              px={{ md: '2rem' }}
              pt={{ md: '6rem' }}
            >
              <CustomButton
                direction="previous"
                label="Previous"
                onClick={() => router.push('/company/onboarding/overview')}
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
      ) : (
        <PageLoader />
      )}
      <Modal size="xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Gig</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <GigsForm onSaveGig={onSaveGig} saving={saving} />
          </ModalBody>
          <ModalFooter
            display="flex"
            justifyContent="space-between"
            mx="1rem"
          ></ModalFooter>
        </ModalContent>
      </Modal>
    </Protected>
  );
};

export default Gigs;
