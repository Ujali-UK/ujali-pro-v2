import { Box } from '@chakra-ui/layout';
import React from 'react';
import styled from 'styled-components';

const FacilitatorProgres = () => {
  return (
    <Box height="6rem" bgColor="brand.gray">
      <StyledList>
        <li className="progress-tab done">
          <span />
          Overview
        </li>
        <li className="progress-tab">
          <span /> Rates & Requirements
        </li>
        <li className="progress-tab">
          <span /> Delivery style
        </li>
        <li className="progress-tab">
          <span /> Values & Interests
        </li>
        <li className="progress-tab">
          <span /> Workshops & Events
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
  overflow: hidden;
  padding-bottom: .9rem;
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
