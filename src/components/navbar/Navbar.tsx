import React, { FC } from 'react';
import { UjaliLogo } from '../../assets/logos/ujali-logo';
import {
  Box,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { MdArrowDropDown } from 'react-icons/md';

const Navbar: FC = () => {
  return (
    <Box
      bgColor="#ffffff"
      px="4"
      height="4rem"
      borderBottom="1px solid #707070"
      display="flex"
      justifyContent="space-between"
    >
      <Box pt="2">
        <UjaliLogo boxSize={{ md: '3rem', base: '2rem' }} />
      </Box>
      <Box display="flex" fontWeight="bold">
        <Menu>
          <MenuButton>
            <Image
              mt="2"
              src="https://bit.ly/sage-adebayo"
              height="3rem"
              width="3rem"
              alt="profile-photo"
              borderRadius="full"
            />
          </MenuButton>
          <MenuList>
            <MenuItem>Profile Settings</MenuItem>
            <MenuItem>Create a Copy</MenuItem>
            <MenuItem>Sign Out</MenuItem>
            <MenuItem>Contact Ujali</MenuItem>
            <MenuItem>Book a Workshop</MenuItem>
          </MenuList>
        </Menu>
        <Box fontSize="2xl" pt="5">
          <MdArrowDropDown />
        </Box>
      </Box>
    </Box>
  );
};

export default Navbar;
