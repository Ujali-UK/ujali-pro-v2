import { Box, Grid } from '@chakra-ui/layout';
import React from 'react';
import GigsCard from './GigsCard';

const CompanyGigs = ({ companyGigs, companyDetails, getAllGigs }) => {
  return (
    <Box pt="2rem">
      <Grid
        templateColumns={{ md: 'repeat(3, 1fr)', base: 'repeat(1, 1fr)' }}
        gap={6}
      >
        {companyGigs && companyGigs.length > 0
          ? companyGigs.map((gig, i) => {
              return (
                <GigsCard
                  gig={gig}
                  key={i}
                  companyDetails={companyDetails}
                  getAllGigs={getAllGigs}
                />
              );
            })
          : ''}
      </Grid>
    </Box>
  );
};

export default CompanyGigs;
