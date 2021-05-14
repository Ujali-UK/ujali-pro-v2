import Icon from '@chakra-ui/icon';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/input';
import { Box, Grid, Text } from '@chakra-ui/layout';
import React, { useEffect, useState } from 'react';
import { MdArrowBack, MdArrowForward, MdSearch } from 'react-icons/md';
import CustomHeading from '../../../src/components/common/custom-heading';
import FacilitatorCard from '../../../src/components/facilitator-card/FacilitatorCard';
import PageLoader from '../../../src/components/loaders/PageLoader';
import Protected from '../../../src/layout/Protected';
import { database } from '../../../src/utils/firbase-config';

const Facilitators = () => {
  const [facilitators, setFacilitators] = useState([]);
  const [latestDoc, setLatestDoc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalFacilitators, setTotalFacilitators] = useState(0);

  const getAllFacilitators = async () => {
    setLoading(true);
    const tempFacilitators = [];
    const ref = database
      .collection('facilitators')
      .orderBy('createdAt')
      .limit(9);
    const data = await ref.get();
    const tempLatest = data.docs[data.docs.length - 1];
    setLatestDoc(tempLatest);
    data.docs.forEach(doc => {
      tempFacilitators.push(doc.data());
    });
    database
      .collection('facilitators')
      .get()
      .then(snap => {
        setTotalFacilitators(snap.size);
      });
    setFacilitators(tempFacilitators);
    setLoading(false);
  };

  const getNextPage = async () => {
    setLoading(true);
    const tempFacilitators = [];
    const ref = database
      .collection('facilitators')
      .orderBy('createdAt')
      .startAfter(latestDoc)
      .limit(9);
    const data = await ref.get();
    const tempLatest = data.docs[data.docs.length - 1];
    setLatestDoc(tempLatest);
    data.docs.forEach(doc => {
      tempFacilitators.push(doc.data());
    });
    database
      .collection('facilitators')
      .get()
      .then(snap => {
        setTotalFacilitators(snap.size);
      });
    setFacilitators(tempFacilitators);
    setCurrentPage(currentPage + 1);
    setLoading(false);
  };

  useEffect(() => {
    getAllFacilitators();
  }, []);

  return (
    <Protected>
      <Box height="5rem" bgColor="brand.gray" width="full">
        <Box d="flex" justifyContent="space-between" px="1rem">
          <Box pt="1rem" width={{ base: 'full', md: '50%' }}>
            <InputGroup size="lg" color="white">
              <InputLeftElement
                pointerEvents="none"
                color="white"
                fontSize="1.2em"
                children={<Icon as={MdSearch} h="8" w="8" />}
              />
              <Input
                _placeholder={{ color: 'white' }}
                bgColor="brand.orange"
                color="white"
                placeholder="Search facilitators..."
                borderRadius="lg"
              />
            </InputGroup>
          </Box>
          <Box>
            <Text color="white" pt="1.5rem">
              Page: <span style={{ fontWeight: 'bold' }}>{currentPage}</span>/
              {Math.ceil(totalFacilitators / 9)}
              {currentPage > 1 && (
                <span>
                  <Icon as={MdArrowBack} cursor="pointer" w="8" />
                </span>
              )}
              {currentPage < Math.ceil(totalFacilitators / 9) && (
                <span>
                  {' '}
                  <Icon
                    as={MdArrowForward}
                    cursor="pointer"
                    w="8"
                    onClick={getNextPage}
                  />
                </span>
              )}
            </Text>
          </Box>
        </Box>
      </Box>
      <Box>
        <CustomHeading value="Facilitators" />
        {loading === false ? (
          <Grid
            templateColumns={{ md: 'repeat(4, 1fr)', base: 'repeat(1, 1fr)' }}
            gap={4}
            px={{ base: '1rem', md: '2rem' }}
            pt="2rem"
          >
            {facilitators && facilitators.length > 0
              ? facilitators.map((facilitator, i) => {
                  return <FacilitatorCard facilitator={facilitator} key={i} />;
                })
              : ''}
          </Grid>
        ) : (
          <PageLoader />
        )}
      </Box>
    </Protected>
  );
};

export default Facilitators;
