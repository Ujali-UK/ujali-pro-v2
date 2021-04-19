import { Box } from '@chakra-ui/layout';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

interface Iprops {
  facilitatorDetails?: any;
}

const FacilitatorProgres: React.FC<Iprops> = ({ facilitatorDetails }) => {
  return (
    <Box height="6rem" bgColor="brand.gray" overflowX="scroll">
      <StyledList>
        <li
          className={
            facilitatorDetails?.overview === true
              ? 'progress-tab done'
              : 'progress-tab'
          }
        >
          <span />
          <Link href="/facilitator/onboarding/overview"> Overview</Link>
        </li>
        <li
          className={
            facilitatorDetails?.ratesAndRequirements === true
              ? 'progress-tab done'
              : 'progress-tab'
          }
        >
          <span />
          <Link href="/facilitator/onboarding/rates">
            {' '}
            Rates & Requirements
          </Link>
        </li>
        <li
          className={
            facilitatorDetails?.deliveryStyle === true
              ? 'progress-tab done'
              : 'progress-tab'
          }
        >
          <span />
          <Link href="/facilitator/onboarding/delivery-style">
            {' '}
            Delivery style
          </Link>
        </li>
        <li
          className={
            facilitatorDetails?.valuesAndInterests === true
              ? 'progress-tab done'
              : 'progress-tab'
          }
        >
          <span />{' '}
          <Link href="/facilitator/onboarding/interests">
            Values & Interests
          </Link>
        </li>
        <li
          className={
            facilitatorDetails?.workshopsAndEvents === true
              ? 'progress-tab done'
              : 'progress-tab'
          }
        >
          <span />{' '}
          <Link href="/facilitator/onboarding/workshops">
            Workshops & Events
          </Link>
        </li>
      </StyledList>
    </Box>
  );
};

export default FacilitatorProgres;

const StyledList = styled.ul`
counter-reset: step;
  padding-top: 1rem;
  width: 100%;
  overflow-x: scroll;
  padding-bottom: .9rem;
  @media (max-width: 768px) {
    width: 900px;
  }
 li{
   list-style: none;
  display: inline-block;
  width: 20%;
  position: relative;
  text-align: center;
  cursor: pointer;
  color: #ffffff
  

}
li::before {
 content: counter(step);
  counter-increment: step;
  width: 30px;
  height: 30px;
  line-height: 30px;
  border: 1px solid #B9B8B8;
  border-radius: 100%;
  display: block;
  text-align: center;
  margin: 0 auto 10px auto;
  background-color: white;
  color: #707070
  
}
li::after {
   content: "";
  position: absolute;
  width: 100%;
  height: 1px;
  background-color: white;
  top: 15px;
  left: -50%;

}

li:first-child:after {
  content: none
}

li.done:before {
  border-color: white;
  background-color: #FF9717;
  z-index: 2;
  position: relative;
  color: #fff
}

li.done+li:after {
  background-color: #FF9717

`;
