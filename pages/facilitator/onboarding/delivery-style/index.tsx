import Icon from '@chakra-ui/icon';
import { Box, Text } from '@chakra-ui/layout';
import { useToast } from '@chakra-ui/toast';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { MdDelete } from 'react-icons/md';
import CustomHeading from '../../../../src/components/common/custom-heading';
import CustomButton from '../../../../src/components/common/CustomButton';
import InputField from '../../../../src/components/inputs/Input-field';
import PageLoader from '../../../../src/components/loaders/PageLoader';
import FacilitatorProgres from '../../../../src/components/navbar/Facilitator-progress-nav';
import Protected from '../../../../src/layout/Protected';
import { useAuth } from '../../../../src/providers/auth-provider/Auth-provider';
import { database, firebase } from '../../../../src/utils/firbase-config';

const DeliveryStyle = () => {
  const { user } = useAuth();
  const router = useRouter();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [facilitatorDetails, setFacilitatorDetails] = useState<any>({});
  const [deliveryArray, setDeliveryArray] = useState([{ deliveryStyle: '' }]);

  useEffect(() => {
    setLoading(true);
    if (user) {
      getFacilitatorDetails();
    }
  }, [user]);

  const onSaveDeliveryStyle = async e => {
    e.preventDefault();
    setSaving(true);
    const details = {
      deliveryArray,
    };
    database
      .collection('facilitators')
      .doc(facilitatorDetails?.id)
      .update({
        ...details,
        deliveryStyle: true,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        toast({
          title: 'Delivery style updated successfully.',
          status: 'success',
          duration: 4000,
          isClosable: true,
        });
        router.push('/facilitator/onboarding/interests');
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
          if (!data.overview && data.ratesAndRequirements === true) {
            router.replace('/facilitator/onboarding/rates');
          }
          setLoading(false);
        });
      })
      .catch(error => {
        setLoading(false);
        // console.log("error", error)
      });
  };

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

  return (
    <Protected>
      <FacilitatorProgres facilitatorDetails={facilitatorDetails} />
      {!loading ? (
        <Box px={{ base: '1rem', md: '6rem' }} pb="5rem" overflowY="auto">
          <form onSubmit={e => onSaveDeliveryStyle(e)}>
            <CustomHeading value="Delivery style" />
            <Text px={{ md: '2rem' }}>
              Add delivery styles you will use in delivering your sessions
            </Text>
            {deliveryArray.map((delivery, i) => {
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
                      onChange={e => onChangeDeliveryStyle(e.target.value, i)}
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
            })}
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
              pt={{ md: '10rem' }}
            >
              <CustomButton
                direction="previous"
                label="Previous"
                type="button"
                onClick={() => router.push('/facilitator/onboarding/rates')}
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

export default DeliveryStyle;
