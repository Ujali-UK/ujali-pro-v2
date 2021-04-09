import { Box } from '@chakra-ui/layout';
import React from 'react';
import styled from 'styled-components';

/**
 * @description: change cover image
 * @returns Cover image component
 */
const CoverImage = () => {
  return (
    <Box
      d="flex"
      justifyContent="center"
      height="10rem"
      width="full"
      bgImage="url(https://res.cloudinary.com/w3bh4ck/image/upload/v1617668753/ujali/ujali-pro/facilitators-cover-image.jpg)"
      backgroundRepeat="no-repeat"
      bgPosition="center"
      bgSize="cover"
    >
      <StyledImageButton>
        <input type="file" />
      </StyledImageButton>
    </Box>
  );
};

export default CoverImage;

const StyledImageButton = styled.label`
  position: relative;
  color: #ffffff input {
    position: absolute;
    opacity: 0;
    width: 100%;
    height: 100%;
  }
  .content {
    display: flex;
    align-items: center;
    background: transparent;
    padding: 0.8rem 0;
    color: #ffffff;
    svg {
      width: 17px;
      height: 17px;
    }
    span {
      margin-left: 0.5rem;
      font-family: var(--ff-medium);
      font-weight: 500;
      font-size: 1.4rem;
    }
  }
`;
