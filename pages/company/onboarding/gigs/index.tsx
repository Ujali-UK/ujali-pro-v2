import { Button } from '@chakra-ui/button';
import { useDisclosure } from '@chakra-ui/hooks';
import { Box } from '@chakra-ui/layout';
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
  // const [companyGigs, setCompanyGigs] = useState<any>({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (user) {
      getCompanyDetails();
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
          </Box>
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
