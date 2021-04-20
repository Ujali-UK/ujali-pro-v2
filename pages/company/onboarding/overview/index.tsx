import { Box, Divider } from '@chakra-ui/layout';
import React from 'react';
import Protected from '../../../../src/layout/Protected';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../../src/providers/auth-provider/Auth-provider';
import { useToast } from '@chakra-ui/toast';
import { useRouter } from 'next/router';
import { database, firebase } from '../../../../src/utils/firbase-config';
import CustomHeading from '../../../../src/components/common/custom-heading';
import InputField from '../../../../src/components/inputs/Input-field';
import CustomTextArea from '../../../../src/components/inputs/CustomTextArea';
import { FormLabel } from '@chakra-ui/form-control';
import CustomMultiSelect from '../../../../src/components/common/multi-select';
import CustomButton from '../../../../src/components/common/CustomButton';
import CompanyCoverImage from '../../../../src/components/CompanyCoverImage';

const CompanyOverview = () => {
  const { user } = useAuth();
  const toast = useToast();
  const router = useRouter();
  const [coverImage, setCoverImage] = useState('');
  const [saving, setSaving] = useState(false);
  const [companydetails, setCompanyDetails] = useState<any>({});
  const [companyName, setCompanyName] = useState('');
  const [companyRegistrationNumber, setCompanyRegistrationNumber] = useState(
    ''
  );
  const [aboutCompany, setAboutCompany] = useState('');
  const [companyLocation, setCompanyLocation] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');
  const [companyPhone, setCompanyPhone] = useState('');
  const [trainingRequirements, setTrainingRequirements] = useState([]);
  const [companyWebsite, setCompanyWebsite] = useState('');
  const [facebookCompanyProfile, setfacebookCompanyProfile] = useState('');
  const [linkedInCompanyProfile, setLinkedInCompanyProfile] = useState('');
  const [twitterCompanyProfile, setTwitterCompanyProfile] = useState('');

  useEffect(() => {
    if (user) {
      console.log(router.pathname);
      getCompanyDetails();
    }
  }, [user]);

  const onSaveCompanyDetails = async e => {
    e.preventDefault();
    setSaving(true);
    const details = {
      companyName,
      companyRegistrationNumber,
      aboutCompany,
      companyLocation,
      companyEmail,
      companyPhone,
      trainingRequirements,
      companyWebsite,
      facebookCompanyProfile,
      linkedInCompanyProfile,
      twitterCompanyProfile,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    };

    database
      .collection('companies')
      .doc(companydetails?.id)
      .update({
        ...details,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        toast({
          title: 'Company overview updated successfully.',
          status: 'success',
          duration: 4000,
          isClosable: true,
        });
        setSaving(false);
      })
      .then(() => {
        // router.push('/company/onboarding/gigs');
        // getFacilitatorDetails();
      })
      .catch(error => {
        console.log('error', error);
      });
  };

  const getCompanyDetails = async () => {
    await database
      .collection('companies')
      .where('ownerUID', '==', user.uid)
      .get()
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
          const data = doc.data();
          setCompanyDetails(doc.data());
          if (data.coverImage && data.coverImage.length > 0) {
            setCoverImage(data.coverImage);
          }
          setCompanyName(data.companyName ? data.companyName : '');
          setCompanyRegistrationNumber(
            data.companyRegistrationNumber ? data.companyRegistrationNumber : ''
          );
          setAboutCompany(data.aboutCompany ? data.aboutCompany : '');
          setCompanyLocation(data.companyLocation ? data.companyLocation : '');
          setCompanyEmail(data.companyEmail ? data.companyEmail : '');
          setCompanyPhone(data.companyPhone ? data.companyPhone : '');
          setTrainingRequirements(
            data.trainingRequirements ? data.trainingRequirements : ''
          );
          setCompanyWebsite(data.companyWebsite ? data.companyWebsite : '');
          setfacebookCompanyProfile(
            data.facebookCompanyProfile ? data.facebookCompanyProfile : ''
          );
          setLinkedInCompanyProfile(
            data.linkedInCompanyProfile ? data.linkedInCompanyProfile : ''
          );
          setTwitterCompanyProfile(
            data.twitterCompanyProfile ? data.twitterCompanyProfile : ''
          );
        });
      })
      .catch(error => {
        // console.log("error", error)
      });
  };

  return (
    <Protected>
      <Box height="4rem" bgColor="brand.gray" width="100%">
        <Box
          display="flex"
          justifyContent="center"
          color="white"
          pt="1.5rem"
          fontWeight="bold"
          textTransform="uppercase"
        >
          <Box
            mr="2rem"
            cursor="pointer"
            width="6rem"
            textAlign="center"
            borderBottom={
              router.pathname.includes('overview') ? '4px solid orange' : ''
            }
            pb="0.5rem"
          >
            Overview
          </Box>
          <Box
            ml="2rem"
            cursor="pointer"
            width="6rem"
            textAlign="center"
            borderBottom={
              router.pathname.includes('gigs') ? '4px solid orange' : ''
            }
            pb="0.5rem"
          >
            Gigs
          </Box>
        </Box>
      </Box>
      <CompanyCoverImage
        coverImage={coverImage}
        getCompanyDetails={getCompanyDetails}
      />
      <Box px={{ base: '1rem', md: '6rem' }} pb="5rem" overflowY="auto">
        <form onSubmit={e => onSaveCompanyDetails(e)}>
          <CustomHeading value="Company Details" />
          <Box display={{ md: 'flex' }} justifyContent="space-between">
            <Box width="full" pt="1rem" px={{ md: '2rem' }}>
              <InputField
                value={companyName}
                label={'Company Name'}
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
              value={aboutCompany}
              label="About Company"
              required
              placeholder="Enter details about your company"
              onChange={e => setAboutCompany(e.target.value)}
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
          <CustomHeading value="Training requirements" />
          <Box width="full" pt="1rem" px={{ md: '2rem' }}>
            <FormLabel fontWeight="bold">Topics</FormLabel>
            <CustomMultiSelect
              value={trainingRequirements}
              onChange={val => setTrainingRequirements(val)}
            />
          </Box>

          <CustomHeading value="Social media and internet" />
          <Box width="full" pt="1rem" px={{ md: '2rem' }}>
            <InputField
              value={companyWebsite}
              label="Company Website"
              type="text"
              height="3rem"
              placeholder="https://"
              onChange={e => setCompanyWebsite(e.target.value)}
            />
          </Box>
          <Box display={{ md: 'flex' }} justifyContent="space-between">
            <Box width="full" pt="1rem" px={{ md: '2rem' }}>
              <InputField
                value={facebookCompanyProfile}
                label="Facebook profile"
                type="text"
                height="3rem"
                placeholder="Facebook"
                onChange={e => setfacebookCompanyProfile(e.target.value)}
              />
            </Box>
            <Box width="full" pt="1rem" px={{ md: '2rem' }}>
              <InputField
                value={twitterCompanyProfile}
                label="Twitter Profile"
                type="text"
                height="3rem"
                placeholder="Twitter"
                onChange={e => setTwitterCompanyProfile(e.target.value)}
              />
            </Box>
            <Box width="full" pt="1rem" px={{ md: '2rem' }}>
              <InputField
                value={linkedInCompanyProfile}
                label="LinkedIn Profile"
                type="text"
                height="3rem"
                placeholder="LinkedIn"
                onChange={e => setLinkedInCompanyProfile(e.target.value)}
              />
            </Box>
          </Box>
          <Divider
            orientation="horizontal"
            width="full"
            borderColor="brand.orange"
            mt="4rem"
          />
          <Box
            display={{ md: 'flex' }}
            justifyContent="end"
            px={{ md: '2rem' }}
          >
            <CustomButton
              direction="next"
              label={saving ? 'Saving...' : 'Save'}
              saving={saving}
              type="submit"
            />
          </Box>
        </form>
      </Box>
      This is company overview
    </Protected>
  );
};

export default CompanyOverview;
