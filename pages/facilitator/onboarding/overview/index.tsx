import { Button } from '@chakra-ui/button';
import Icon from '@chakra-ui/icon';
import { Box, Divider, Text } from '@chakra-ui/layout';
import { useToast } from '@chakra-ui/toast';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { MdArrowForward, MdDelete } from 'react-icons/md';
import CustomHeading from '../../../../src/components/common/custom-heading';
import CoverImage from '../../../../src/components/CoverImage';
import CustomTextArea from '../../../../src/components/inputs/CustomTextArea';
import InputField from '../../../../src/components/inputs/Input-field';
import PageLoader from '../../../../src/components/loaders/PageLoader';
import FacilitatorProgres from '../../../../src/components/navbar/Facilitator-progress-nav';
import Protected from '../../../../src/layout/Protected';
import { useAuth } from '../../../../src/providers/auth-provider/Auth-provider';
import { database, firebase } from '../../../../src/utils/firbase-config';

const Overview = () => {
  const { user } = useAuth();
  const toast = useToast();
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const [facilitatorDetails, setFacilitatorDetails] = useState<any>({});
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
  const [topics, setTopics] = useState([]);
  const [areasOfExpertise, setAreasOfExpertise] = useState('');
  const [facebookCompanyProfile, setfacebookCompanyProfile] = useState('');
  const [linkedInCompanyProfile, setLinkedInCompanyProfile] = useState('');
  const [twitterCompanyProfile, setTwitterCompanyProfile] = useState('');
  const [companyWebsite, setCompanyWebsite] = useState('');
  const [certificationArray, setCertificationArray] = useState([
    { certification: '' },
  ]);
  const [teamArray, setTeamArray] = useState([
    { firstNameTeam: '', lastNameTeam: '', jobTitleTeam: '' },
  ]);

  useEffect(() => {
    if (user) {
      getFacilitatorDetails();
    }
  }, [user]);

  /**
   * @description Save facilitator overview
   * @param e event
   */
  const onSaveFacilitatorOverview = async e => {
    e.preventDefault();
    setSaving(true);
    const details = {
      aboutFacilitator,
      companyName,
      companyRegistrationNumber,
      companyLocation,
      companyEmail,
      companyPhone,
      servicesOffer,
      topics,
      facebookCompanyProfile,
      linkedInCompanyProfile,
      twitterCompanyProfile,
      companyWebsite,
      certificationArray,
      teamArray,
      areasOfExpertise,
      overview: true,
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
        setSaving(false);
      })
      .then(() => {
        router.push('/facilitator/onboarding/rates');
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
    setLoading(true);
    await database
      .collection('facilitators')
      .where('ownerUID', '==', user.uid)
      .get()
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
          setFacilitatorDetails(doc.data());
          const data = doc.data();

          setAboutFacilitator(
            data.aboutFacilitator ? data.aboutFacilitator : ''
          );
          setCompanyName(data.companyName ? data.companyName : '');
          setCompanyRegistrationNumber(
            data.companyRegistrationNumber ? data.companyRegistrationNumber : ''
          );
          setCompanyLocation(data.companyLocation ? data.companyLocation : '');
          setCoverImage(doc.data()?.coverImage);
          setCompanyEmail(data.companyEmail ? data.companyEmail : '');
          setAreasOfExpertise(
            data.areasOfExpertise ? data.areasOfExpertise : ''
          );
          setCompanyPhone(data.companyPhone ? data.companyPhone : '');
          setServicesOffer(data.serviceOffer ? data.serviceOffer : '');
          setTopics(data.topics ? data.topics : '');
          setfacebookCompanyProfile(
            data.facebookCompanyProfile ? data.facebookCompanyProfile : ''
          );
          setLinkedInCompanyProfile(
            data.linkedInCompanyProfile ? data.linkedInCompanyProfile : ''
          );
          setTwitterCompanyProfile(
            data.twitterCompanyProfile ? data.twitterCompanyProfile : ''
          );
          setCompanyWebsite(data.companyWebsite ? data.companyWebsite : '');
          setCertificationArray(
            data.certificationArray ? data.certificationArray : ''
          );
          setTeamArray(data.teamArray ? data.teamArray : '');
          setLoading(false);
        });
      })
      .catch(error => {
        // console.log("error", error)
        setLoading(false);
      });
  };

  const onAddCertification = () => {
    const tempcertification = [...certificationArray];
    tempcertification.push({ certification: '' });
    setCertificationArray(tempcertification);
  };

  const onDeleteCertification = index => {
    if (index > 0) {
      const tempCertification = [...certificationArray];
      const afterdelete = tempCertification.filter((item, i) => index !== i);
      setCertificationArray(afterdelete);
    }
  };

  const onChangeCertificateArray = (value, index) => {
    const tempcertification = [...certificationArray];
    tempcertification[index].certification = value;
    setCertificationArray(tempcertification);
  };

  const onAddTeamMember = () => {
    const tempTeam = [...teamArray];
    tempTeam.push({ firstNameTeam: '', lastNameTeam: '', jobTitleTeam: '' });
    setTeamArray(tempTeam);
  };

  const onDeleteTeamMember = index => {
    if (index > 0) {
      const tempTeam = [...teamArray];
      const afterdelete = tempTeam.filter((item, i) => index !== i);
      setTeamArray(afterdelete);
    }
  };

  const onChangeTeamDetails = (value, index, target) => {
    const tempTeam = [...teamArray];
    tempTeam[index][target] = value;
    setTeamArray(tempTeam);
  };

  return (
    <Protected>
      <FacilitatorProgres facilitatorDetails={facilitatorDetails} />
      <CoverImage
        coverImage={coverImage}
        getFacilitatorDetails={getFacilitatorDetails}
      />

      {loading && <PageLoader />}

      {!loading && (
        <Box px={{ base: '1rem', md: '6rem' }} pb="5rem" overflowY="auto">
          <form onSubmit={e => onSaveFacilitatorOverview(e)}>
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
                value={aboutFacilitator}
                label="About Facilitator"
                required
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
              <InputField
                value={areasOfExpertise}
                label="Areas Of Expertise"
                type="text"
                height="3rem"
                placeholder="E.g Leadership"
                required
                onChange={e => setAreasOfExpertise(e.target.value)}
              />
              {/* <FormLabel fontWeight="bold">Areas of Expertise</FormLabel> */}
              {/* <CustomMultiSelect
                value={topics}
                onChange={val => setTopics(val)}
              /> */}
            </Box>

            <CustomHeading value="Certifications" />
            <Box width="full" pt="1rem" px={{ md: '2rem' }}>
              {certificationArray && certificationArray.length > 0
                ? certificationArray.map((cert, i) => {
                    return (
                      <Box key={i} display="flex">
                        <InputField
                          onChange={e =>
                            onChangeCertificateArray(e.target.value, i)
                          }
                          label={
                            i < 1 ? 'Certifications and qualifications' : ''
                          }
                          value={cert?.certification}
                          type="text"
                          height="3rem"
                          placeholder="Enter certification"
                        />
                        {i > 0 && (
                          <Box pt="1rem">
                            <Icon
                              onClick={() => onDeleteCertification(i)}
                              color="red"
                              cursor="pointer"
                              as={MdDelete}
                              w={6}
                              h={6}
                            />
                          </Box>
                        )}
                      </Box>
                    );
                  })
                : ''}
              <Text
                onClick={onAddCertification}
                color="brand.orange"
                cursor="pointer"
              >
                + Add Certification
              </Text>
            </Box>
            <CustomHeading value="Team members" />
            {teamArray && teamArray.length > 0
              ? teamArray.map((member, i) => {
                  return (
                    <Box
                      key={i}
                      display={{ md: 'flex' }}
                      justifyContent="space-between"
                    >
                      <Box width="full" pt="1rem" px={{ md: '2rem' }}>
                        <InputField
                          value={member.firstNameTeam}
                          label={i < 1 ? 'First Name' : ''}
                          type="text"
                          height="3rem"
                          placeholder="Last name"
                          onChange={e =>
                            onChangeTeamDetails(
                              e.target.value,
                              i,
                              'firstNameTeam'
                            )
                          }
                        />
                      </Box>
                      <Box width="full" pt="1rem" px={{ md: '2rem' }}>
                        <InputField
                          value={member.lastNameTeam}
                          label={i < 1 ? 'Last Name' : ''}
                          type="text"
                          height="3rem"
                          placeholder="Last name"
                          onChange={e =>
                            onChangeTeamDetails(
                              e.target.value,
                              i,
                              'lastNameTeam'
                            )
                          }
                        />
                      </Box>
                      <Box width="full" pt="1rem" px={{ md: '2rem' }}>
                        <InputField
                          value={member.jobTitleTeam}
                          label={i < 1 ? 'Job Title' : ''}
                          type="text"
                          height="3rem"
                          placeholder="Job title"
                          onChange={e =>
                            onChangeTeamDetails(
                              e.target.value,
                              i,
                              'jobTitleTeam'
                            )
                          }
                        />
                      </Box>

                      <Box pt="2rem">
                        <Icon
                          onClick={() => onDeleteTeamMember(i)}
                          color="red"
                          display={i < 1 ? 'none' : ''}
                          cursor="pointer"
                          as={MdDelete}
                          w={6}
                          h={6}
                        />
                      </Box>
                    </Box>
                  );
                })
              : ''}
            <Text
              onClick={onAddTeamMember}
              px={{ md: '2rem' }}
              color="brand.orange"
              cursor="pointer"
            >
              + Add Team Member
            </Text>

            <CustomHeading value="Social media and internet" />

            <Box display={{ md: 'flex' }} justifyContent="space-between">
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
              mt="2rem"
              borderColor="brand.orange"
              orientation="horizontal"
            />
            <Box d="flex" justifyContent="end">
              <Button
                borderRadius="lg"
                color="white"
                bgColor="brand.orange"
                width="15rem"
                isDisabled={saving}
                _hover={{
                  bgColor: 'brand.gray',
                }}
                _disabled={{
                  bgColor: 'brand.gray',
                }}
                type="submit"
                mt="2rem"
                rightIcon={<MdArrowForward />}
              >
                {saving ? 'Saving...' : ' Next'}
              </Button>
            </Box>
          </form>
        </Box>
      )}
    </Protected>
  );
};

export default Overview;
