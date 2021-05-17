import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useToast } from '@chakra-ui/toast';
import Protected from '../../../../src/layout/Protected';
import { useAuth } from '../../../../src/providers/auth-provider/Auth-provider';
import { database, firebase } from '../../../../src/utils/firbase-config';
import FacilitatorProgres from '../../../../src/components/navbar/Facilitator-progress-nav';
import { Box, Text } from '@chakra-ui/layout';
import PageLoader from '../../../../src/components/loaders/PageLoader';
import CustomHeading from '../../../../src/components/common/custom-heading';
import InputField from '../../../../src/components/inputs/Input-field';
import Icon from '@chakra-ui/icon';
import { MdDelete } from 'react-icons/md';
import CustomButton from '../../../../src/components/common/CustomButton';
import CustomNumberInputField from '../../../../src/components/inputs/NumberInput';

const Rates = () => {
  const { user } = useAuth();
  const router = useRouter();
  const toast = useToast();
  const [saving, setSaving] = useState(false);
  const [facilitatorDetails, setFacilitatorDetails] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [dailyRate, setDailyRate] = useState();
  const [weeklyRate, setWeeklyRate] = useState('');
  const [values, setValues] = useState(['']);
  // const [travelRequirements, setTravelRequirements] = useState('');
  const [specialRequirements, setSpecialRequirements] = useState([
    { requirements: '' },
  ]);
  const [sortCode, setSortCode] = useState('');
  const [accountHolderName, setAccountHolderName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [interests, setInterests] = useState(['']);
  const [deliveryArray, setDeliveryArray] = useState([{ deliveryStyle: '' }]);

  useEffect(() => {
    setLoading(true);
    if (user) {
      getFacilitatorDetails();
    }
  }, [user]);

  const onAddDeliveryStyle = () => {
    const tempDelivaryArray = [...deliveryArray];
    tempDelivaryArray.push({ deliveryStyle: '' });
    setDeliveryArray(tempDelivaryArray);
  };

  const onChangeDeliveryStyle = (value, index) => {
    const tempDelivaryArray = [...deliveryArray];
    tempDelivaryArray[index].deliveryStyle = value;
    setDeliveryArray(tempDelivaryArray);
  };

  const onDeleteDeliveryStyle = index => {
    const tempDelivaryArray = [...deliveryArray];
    const afterdelete = tempDelivaryArray.filter((item, i) => index !== i);
    setDeliveryArray(afterdelete);
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
          setDeliveryArray(
            data.deliveryArray ? data.deliveryArray : { deliveryStyle: '' }
          );
          setDailyRate(data.dailyRate ? data.dailyRate : 0);
          setWeeklyRate(data.weeklyRate ? data.weeklyRate : 0);
          setInterests(data.interestsArray ? data.interestsArray : ['']);
          setSpecialRequirements(
            data.specialRequirements
              ? data.specialRequirements
              : [{ requirements: '' }]
          );
          setValues(data.valuesArray ? data.valuesArray : ['']);
          setSortCode(data.sortCode ? data.sortCode : '');
          setAccountNumber(data.accountNumber ? data.accountNumber : '');
          setAccountHolderName(
            data.accountHolderName ? data.accountHolderName : ''
          );
          if (!data.overview && !data.overview === true) {
            router.replace('/facilitator/onboarding/overview');
          }
          setLoading(false);
        });
      })
      .catch(error => {
        setLoading(false);
        // console.log("error", error)
      });
  };

  const onSaveViews = async e => {
    e.preventDefault();
    setSaving(true);
    const details = {
      dailyRate,
      weeklyRate,
      specialRequirements,
      sortCode,
      accountNumber,
      accountHolderName,
      deliveryArray,
      interestsArray: interests,
      ratesAndRequirements: true,
      valuesArray: values,
    };
    database
      .collection('facilitators')
      .doc(facilitatorDetails?.id)
      .update({
        ...details,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        toast({
          title: 'Facilitator rates updated successfully.',
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

  const onAddSpecialRequirements = () => {
    const tempSpecialRequirements = [...specialRequirements];
    tempSpecialRequirements.push({ requirements: '' });
    setSpecialRequirements(tempSpecialRequirements);
  };

  const onChangeSpecialRequirements = (value, index) => {
    const tempSpecialRequirements = [...specialRequirements];
    tempSpecialRequirements[index].requirements = value;
    setSpecialRequirements(tempSpecialRequirements);
  };

  const onDeleteSpecialRequirements = index => {
    if (index > 0) {
      const tempSpecialRequirements = [...specialRequirements];
      const afterdelete = tempSpecialRequirements.filter(
        (item, i) => index !== i
      );
      setSpecialRequirements(afterdelete);
    }
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
          <form onSubmit={e => onSaveViews(e)}>
            <CustomHeading value="Rates" />
            <Box display={{ md: 'flex' }} justifyContent="space-between">
              <Box width="full" pt="1rem" px={{ md: '2rem' }}>
                <CustomNumberInputField
                  value={dailyRate}
                  label={'Daily  Rate £'}
                  type="number"
                  height="3rem"
                  placeholder="Daily Rate £"
                  required
                  onChange={value => setDailyRate(value)}
                />
              </Box>
              <Box width="full" pt="1rem" px={{ md: '2rem' }}>
                <CustomNumberInputField
                  value={weeklyRate}
                  label="Weekly Rate £"
                  type="number"
                  height="3rem"
                  placeholder="Weekly rate £"
                  required
                  onChange={value => setWeeklyRate(value)}
                />
              </Box>
            </Box>
            <CustomHeading value="Requirements" />

            {specialRequirements.map((req, i) => {
              return (
                <Box
                  key={i}
                  display={{ md: 'flex' }}
                  justifyContent="space-between"
                >
                  <Box width="full" pt="1rem" px={{ md: '2rem' }}>
                    <InputField
                      value={req.requirements}
                      label={i < 1 ? 'Special Requirements' : ''}
                      type="text"
                      height="3rem"
                      placeholder="special requirements"
                      onChange={e =>
                        onChangeSpecialRequirements(e.target.value, i)
                      }
                    />
                  </Box>
                  <Icon
                    color="red"
                    mt="2rem"
                    onClick={() => onDeleteSpecialRequirements(i)}
                    display={i < 1 ? 'none' : ''}
                    cursor="pointer"
                    as={MdDelete}
                    w={6}
                    h={6}
                  />
                </Box>
              );
            })}

            <Text
              onClick={() => onAddSpecialRequirements()}
              px={{ md: '2rem' }}
              color="brand.orange"
              cursor="pointer"
            >
              + Add special requirement
            </Text>
            <CustomHeading value="Bank account details" />
            <Box display={{ md: 'flex' }} justifyContent="space-between">
              <Box width="full" pt="1rem" px={{ md: '2rem' }}>
                <InputField
                  value={accountHolderName}
                  onChange={e => setAccountHolderName(e.target.value)}
                  label="Account Holder Name"
                  type="text"
                  height="3rem"
                  placeholder="Account name"
                />
              </Box>
              <Box width="full" pt="1rem" px={{ md: '2rem' }}>
                <InputField
                  value={accountNumber}
                  onChange={e => setAccountNumber(e.target.value)}
                  label="Account Number"
                  type="text"
                  height="3rem"
                  placeholder="Account number"
                />
              </Box>
              <Box width="full" pt="1rem" px={{ md: '2rem' }}>
                <InputField
                  value={sortCode}
                  onChange={e => setSortCode(e.target.value)}
                  label="Sort Code"
                  type="text"
                  height="3rem"
                  placeholder="Sort code"
                />
              </Box>
            </Box>

            <Text px={{ md: '2rem' }} mt="3rem">
              Add your personal interests
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
              + Add Interest
            </Text>

            <Text px={{ md: '2rem' }} mt="3rem">
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

            {deliveryArray && Array.isArray(deliveryArray)
              ? deliveryArray.map((delivery, i) => {
                  return (
                    <Box
                      key={i}
                      display={{ md: 'flex' }}
                      justifyContent="space-between"
                    >
                      <Box width="full" pt="1rem" px={{ md: '2rem' }}>
                        <InputField
                          label={i < 1 ? 'Delivery Style' : ''}
                          type="text"
                          value={delivery.deliveryStyle}
                          height="3rem"
                          placeholder="special requirements"
                          onChange={e =>
                            onChangeDeliveryStyle(e.target.value, i)
                          }
                        />
                      </Box>
                      <Icon
                        color="red"
                        onClick={() => onDeleteDeliveryStyle(i)}
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
              onClick={onAddDeliveryStyle}
              px={{ md: '2rem' }}
              color="brand.orange"
              cursor="pointer"
            >
              + Add delivery style
            </Text>

            <Box
              display={{ md: 'flex' }}
              justifyContent="space-between"
              px={{ md: '2rem' }}
            >
              <CustomButton
                direction="previous"
                label="Previous"
                onClick={() => router.push('/facilitator/onboarding/overview')}
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

export default Rates;
