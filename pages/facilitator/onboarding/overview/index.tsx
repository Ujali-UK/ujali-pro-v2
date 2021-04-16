import { Box } from '@chakra-ui/layout';
import { useEffect, useState } from 'react';
import CustomHeading from '../../../../src/components/common/custom-heading';
import CustomMultiSelect from '../../../../src/components/common/multi-select';
import CoverImage from '../../../../src/components/CoverImage';
import CustomTextArea from '../../../../src/components/inputs/CustomTextArea';
import InputField from '../../../../src/components/inputs/Input-field';
import FacilitatorProgres from '../../../../src/components/navbar/Facilitator-progress-nav';
import Protected from '../../../../src/layout/Protected';
import { useAuth } from '../../../../src/providers/auth-provider/Auth-provider';
import { database } from '../../../../src/utils/firbase-config';

const Overview = () => {
  const { user } = useAuth();
  const [facilitatorDetails, setFacilitatorDetails] = useState({});
  const [coverImage, setCoverImage] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyRegistrationNumber, setCompanyRegistrationNumber] = useState(
    ''
  );
  const [aboutFacilitator, setAboutFacilitator] = useState('');
  const [companyLocation, setCompanyLocation] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');
  const [companyPhone, setCompanyPhone] = useState('');
  const [servicesOffer, setServicesOffer] = useState('');

  useEffect(() => {
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
          setCoverImage(doc.data()?.coverImage);
        });
      })
      .catch(error => {
        // console.log("error", error)
      });
  };

  return (
    <Protected>
      <FacilitatorProgres facilitatorDetails={facilitatorDetails} />
      <CoverImage
        coverImage={coverImage}
        getFacilitatorDetails={getFacilitatorDetails}
      />
      <Box px={{ base: '1rem', md: '6rem' }} pb="5rem" overflowY="auto">
        <CustomHeading value="Company Details" />
        <Box display={{ md: 'flex' }} justifyContent="space-between">
          <Box width="full" pt="1rem" px={{ md: '2rem' }}>
            <InputField
              value={companyName}
              label="Company Name"
              type="text"
              height="3rem"
              placeholder="Company name"
              required
              onChange={e => setCompanyName(e.target.value)}
            />
          </Box>
          <Box width="full" pt="1rem" px={{ md: '2rem' }}>
            <InputField
              value={companyRegistrationNumber}
              label="Company Registration Number"
              type="text"
              height="3rem"
              placeholder="Registration number"
              required
              onChange={e => setCompanyRegistrationNumber(e.target.value)}
            />
          </Box>
        </Box>
        <Box width="full" pt="1rem" px={{ md: '2rem' }}>
          <CustomTextArea
            value={aboutFacilitator}
            label="About Facilitator"
            placeholder="Enter details about you"
            onChange={e => setAboutFacilitator(e.target.value)}
          />
        </Box>
        <Box width="full" pt="1rem" px={{ md: '2rem' }}>
          <InputField
            value={companyLocation}
            label="Company location"
            type="text"
            height="3rem"
            placeholder=" Eg: London"
            required
            onChange={e => setCompanyLocation(e.target.value)}
          />
        </Box>
        <CustomHeading value="Primary contact Details" />
        <Box display={{ md: 'flex' }} justifyContent="space-between">
          <Box width="full" pt="1rem" px={{ md: '2rem' }}>
            <InputField
              value={companyEmail}
              label="Company Email"
              type="email"
              height="3rem"
              placeholder="Company email"
              required
              onChange={e => setCompanyEmail(e.target.value)}
            />
          </Box>
          <Box width="full" pt="1rem" px={{ md: '2rem' }}>
            <InputField
              value={companyPhone}
              label="Phone Number"
              type="number"
              height="3rem"
              placeholder="phone number"
              required
              onChange={e => setCompanyPhone(e.target.value)}
            />
          </Box>
        </Box>
        <CustomHeading value="Services" />
        <Box width="full" pt="1rem" px={{ md: '2rem' }}>
          <CustomTextArea
            value={servicesOffer}
            label="Describe the services that you offer"
            placeholder="Enter services"
            onChange={e => setServicesOffer(e.target.value)}
          />
        </Box>
        <Box width="full" pt="1rem" px={{ md: '2rem' }}>
          <CustomMultiSelect />
        </Box>
      </Box>
    </Protected>
  );
};

export default Overview;
