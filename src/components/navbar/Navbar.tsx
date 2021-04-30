import React, { FC, useEffect } from 'react';
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
import { useAuth } from '../../providers/auth-provider/Auth-provider';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Navbar: FC = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log('user info', router);
  });

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
      <Box d={{ md: 'flex', base: 'none' }} justifyContent="center" pt="1rem">
        <Box
          fontWeight="bold"
          px="1rem"
          borderBottom={
            router?.pathname === '/facilitator/gigs' ? '5px solid orange' : ''
          }
          color={router?.pathname === '/facilitator/gigs' ? 'orange' : ''}
        >
          {' '}
          <Link href="/facilitator/gigs">GIGS</Link>
        </Box>
        <Box
          fontWeight="bold"
          px="1rem"
          borderBottom={
            router?.pathname === '/facilitator/hub' ? '5px solid orange' : ''
          }
          color={router?.pathname === '/facilitator/hub' ? 'orange' : ''}
        >
          {' '}
          <Link href="/facilitator/hub">HUB</Link>
        </Box>
      </Box>
      <Box display="flex" fontWeight="bold">
        <Box>
          <Image
            mt="2"
            src={
              user.photoUrl
                ? user.photoUrl
                : 'https://res.cloudinary.com/w3bh4ck/image/upload/v1585801837/person-placeholder.jpg'
            }
            height="3rem"
            width="3rem"
            borderRadius="full"
          />
        </Box>

        <Menu>
          <MenuButton fontSize="3xl" pt="1">
            <MdArrowDropDown />
          </MenuButton>
          <MenuList>
            <MenuItem>Profile Settings</MenuItem>
            <MenuItem onClick={logout}>Sign Out</MenuItem>
            <MenuItem>Contact Ujali</MenuItem>
            <MenuItem>Book a Workshop</MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Box>
  );
};

export default Navbar;
