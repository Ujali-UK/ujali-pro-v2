import Icon from '@chakra-ui/icon';
import { Box, Text } from '@chakra-ui/layout';
import { useToast } from '@chakra-ui/toast';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { MdDelete } from 'react-icons/md';
import CustomHeading from '../../../../src/components/common/custom-heading';
import CustomButton from '../../../../src/components/common/CustomButton';
import InputField from '../../../../src/components/inputs/Input-field';
import PageLoader from '../../../../src/components/loaders/PageLoader';
import FacilitatorProgres from '../../../../src/components/navbar/Facilitator-progress-nav';
import Protected from '../../../../src/layout/Protected';
import { useAuth } from '../../../../src/providers/auth-provider/Auth-provider';
import { database, firebase } from '../../../../src/utils/firbase-config';

const ValuesAndInterests = () => {
  const { user } = useAuth();
  const router = useRouter();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [facilitatorDetails, setFacilitatorDetails] = useState<any>({});
  const [interests, setInterests] = useState(['']);
  const [values, setValues] = useState(['']);

  useEffect(() => {
    setLoading(true);
    if (user) {
      getFacilitatorDetails();
    }
  }, [user]);

  const onSaveInterests = async e => {
    e.preventDefault();
    setSaving(true);
    const details = {
      valuesArray: values,
      interestsArray: interests,
    };
    database
      .collection('facilitators')
      .doc(facilitatorDetails?.id)
      .update({
        ...details,
        valuesAndInterests: true,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        toast({
          title: 'Facilitator Interest and values updated successfully.',
          status: 'success',
          duration: 4000,
          isClosable: true,
        });
      })
      .then(() => {
        setSaving(false);
        router.push('/facilitator/onboarding/workshops');
        // getFacilitatorDetails();
      })
      .catch(error => {
        if (error) {
          toast({
            title: 'Facilitator details could not be updated.',
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
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
          setFacilitatorDetails(doc.data());
          const data = doc.data();
          setValues(data.valuesArray ? data.valuesArray : ['']);
          setInterests(data.interestsArray ? data.interestsArray : ['']);
          if (!data.deliveryStyle && !data.deliveryStyle === true) {
            router.replace('/facilitator/onboarding/delivery-style');
          }
          setLoading(false);
        });
      })
      .catch(error => {
        setLoading(false);
        // console.log("error", error)
      });
  };

  const onDeleteInterest = index => {
    if (index > 0) {
      const tempInterests = [...interests];
      const afterdelete = tempInterests.filter((item, i) => index !== i);
      setInterests(afterdelete);
    }
  };

  const onAddInterest = () => {
    const tempInterests = [...interests];
    tempInterests.push('');
    setInterests(tempInterests);
  };

  const onChangeInterest = (value, index) => {
    const tempInterests = [...interests];
    tempInterests[index] = value;
    setInterests(tempInterests);
  };

  const onChangeValues = (value, index) => {
    const tempvalues = [...values];
    tempvalues[index] = value;
    setValues(tempvalues);
  };

  const onAddValue = () => {
    const tempValues = [...values];
    tempValues.push('');
    setValues(tempValues);
  };

  const onDeleteValues = index => {
    if (index > 0) {
      const tempValues = [...values];
      const afterdelete = tempValues.filter((item, i) => index !== i);
      setValues(afterdelete);
    }
  };

  return (
    <Protected>
      <FacilitatorProgres facilitatorDetails={facilitatorDetails} />
      {!loading ? (
        <Box px={{ base: '1rem', md: '6rem' }} pb="5rem" overflowY="auto">
          <form onSubmit={onSaveInterests}>
            <CustomHeading value="Your Interests" />
            <Text px={{ md: '2rem' }}>
              Add delivery styles you will use in delivering your sessions
            </Text>
            {interests && interests.length > 0
              ? interests.map((interest, i) => {
                  return (
                    <Box
                      key={i}
                      display={{ md: 'flex' }}
                      justifyContent="space-between"
                    >
                      <Box width="full" pt="1rem" px={{ md: '2rem' }}>
                        <InputField
                          label={i < 1 ? 'Interests' : ''}
                          type="text"
                          value={interest}
                          height="3rem"
                          placeholder="E.g Leadership"
                          onChange={e => onChangeInterest(e.target.value, i)}
                        />
                      </Box>
                      <Icon
                        color="red"
                        onClick={() => onDeleteInterest(i)}
                        mt="2rem"
                        display={i < 1 ? 'none' : ''}
                        cursor="pointer"
                        as={MdDelete}
                        w={6}
                        h={6}
                      />
                    </Box>
                  );
                })
              : ''}
            <Text
              onClick={onAddInterest}
              px={{ md: '2rem' }}
              color="brand.orange"
              cursor="pointer"
            >
              + Add special requirement
            </Text>

            <CustomHeading value="Your Values" />
            <Text px={{ md: '2rem' }}>
              Your characteristics and behaviours that describes your
              personality (Accountability, Reliable, Efficient,
              Results-oriented, e.t.c){' '}
            </Text>

            {values && values.length > 0
              ? values.map((val, i) => {
                  return (
                    <Box
                      key={i}
                      display={{ md: 'flex' }}
                      justifyContent="space-between"
                    >
                      <Box width="full" pt="1rem" px={{ md: '2rem' }}>
                        <InputField
                          label={i < 1 ? 'Values' : ''}
                          type="text"
                          value={val}
                          height="3rem"
                          placeholder="E.g Accountability"
                          onChange={e => onChangeValues(e.target.value, i)}
                        />
                      </Box>
                      <Icon
                        color="red"
                        onClick={() => onDeleteValues(i)}
                        mt="2rem"
                        display={i < 1 ? 'none' : ''}
                        cursor="pointer"
                        as={MdDelete}
                        w={6}
                        h={6}
                      />
                    </Box>
                  );
                })
              : ''}
            <Text
              onClick={onAddValue}
              px={{ md: '2rem' }}
              color="brand.orange"
              cursor="pointer"
            >
              + Add values
            </Text>
            <Box
              display={{ md: 'flex' }}
              justifyContent="space-between"
              px={{ md: '2rem' }}
              pt={{ md: '4rem' }}
            >
              <CustomButton
                direction="previous"
                label="Previous"
                onClick={() =>
                  router.push('/facilitator/onboarding/delivery-style')
                }
                type="button"
              />
              <CustomButton
                direction="next"
                label={saving ? 'Saving...' : 'Next'}
                saving={saving}
                type="submit"
              />
            </Box>
          </form>
        </Box>
      ) : (
        <PageLoader />
      )}
    </Protected>
  );
};

export default ValuesAndInterests;
