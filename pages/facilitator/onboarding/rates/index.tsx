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
import SelectInput from '../../../../src/components/inputs/SelectInput';
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
  const [travelRequirements, setTravelRequirements] = useState('');
  const [specialRequirements, setSpecialRequirements] = useState([
    { requirements: '' },
  ]);
  const [sortCode, setSortCode] = useState('');
  const [accountHolderName, setAccountHolderName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');

  useEffect(() => {
    setLoading(true);
    if (user) {
      getFacilitatorDetails();
    }
  }, [user]);

  const getFacilitatorDetails = async () => {
    await database
      .collection('facilitators')
      .where('ownerUID', '==', user.uid)
      .get()
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
          setFacilitatorDetails(doc.data());
          const data = doc.data();
          setDailyRate(data.dailyRate ? data.dailyRate : 0);
          setWeeklyRate(data.weeklyRate ? data.weeklyRate : 0);
          setTravelRequirements(
            data.travelRequirements ? data.travelRequirements : ''
          );
          setSpecialRequirements(
            data.specialRequirements
              ? data.specialRequirements
              : [{ requirements: '' }]
          );
          setSortCode(data.sortCode ? data.sortCode : '');
          setAccountNumber(data.accountNumber ? data.accountNumber : '');
          setAccountHolderName(
            data.accountHolderName ? data.accountHolderName : ''
          );
          if (!data.overview && data.overview === true) {
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
      travelRequirements,
      specialRequirements,
      sortCode,
      accountNumber,
      accountHolderName,
      ratesAndRequirements: true,
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
          title: 'Facilitator overview updated successfully.',
          status: 'success',
          duration: 4000,
          isClosable: true,
        });
        // router.push('/facilitator/onboarding/rates');
      })
      .then(() => {
        setSaving(false);
        getFacilitatorDetails();
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
            <Box width="full" pt="1rem" px={{ md: '2rem' }}>
              <SelectInput
                value={travelRequirements}
                label="Travel and accomodation requirements"
                placeholder="Select preferred travel arrangement"
                onChange={e => setTravelRequirements(e.target.value)}
                options={[
                  'Travel & Accommodation to be arranged by Ujali',
                  'I will arrange Travel & Accommodation',
                ]}
              />
            </Box>
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
            <Box
              display={{ md: 'flex' }}
              justifyContent="space-between"
              px={{ md: '2rem' }}
            >
              <CustomButton
                direction="previous"
                label="Previous"
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
