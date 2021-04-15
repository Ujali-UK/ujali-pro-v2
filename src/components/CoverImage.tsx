import { Box } from '@chakra-ui/layout';
import React from 'react';
import { useToast } from '@chakra-ui/react';
import styled from 'styled-components';
import { useAuth } from '../providers/auth-provider/Auth-provider';
import { firebase } from '../utils/firbase-config';

/**
 * @description: change cover image
 * @returns Cover image component
 */
const CoverImage = () => {
  const { user, userInfo } = useAuth();
  const toast = useToast();

  // Save cover image and get cover image URL
  const onUploadImage = async file => {
    const storageRef = await firebase.storage().ref(`users/${user.uid}`);
    const childFolder = await storageRef.child(user.uid);
    childFolder.put(file).then(snapshot => {
      snapshot.ref.getDownloadURL().then(async url => {
        console.log('file uploaded', url, userInfo, user);
        if (userInfo && userInfo.accountType === 'facilitator') {
          const db = await firebase.firestore();
          await db
            .collection('facilitators')
            .where('userUIDS', 'array-contains', userInfo.uid)
            .get()
            .then(snapshot => {
              snapshot.docs.forEach(doc => {
                db.collection('facilitators')
                  .doc(doc.data().id)
                  .update({
                    coverImage: url,
                  })
                  .then(() => {
                    toast({
                      title: 'Cover image uploaded successfully.',
                      status: 'success',
                      duration: 4000,
                      isClosable: true,
                    });
                  });
              });
            });
        }
      });
    });
  };

  return (
    <Box
      d="flex"
      justifyContent="center"
      height="10rem"
      width="full"
      color="#ffffff"
      textAlign="center"
      bgImage="url('https://res.cloudinary.com/w3bh4ck/image/upload/v1617668753/ujali/ujali-pro/facilitators-cover-image.jpg')"
      backgroundRepeat="no-repeat"
      bgPosition="center"
      bgSize="cover"
    >
      <StyledImageButton>
        <input onChange={e => onUploadImage(e.target.files[0])} type="file" />
        <span> Change Cover Image</span>
      </StyledImageButton>
    </Box>
  );
};

export default CoverImage;

const StyledImageButton = styled.label`
  position: relative;
  margin-top: 4rem;
  padding-top: 0.4rem;
  cursor: pointer;
  height: 2rem;
  border-radius: 0.2rem;
  font-size: 12px;
  width: 10rem;
  cursor: pointer;
  background-color: orange;
  input {
    position: absolute;
    opacity: 0;
    display: hidden;
    width: 100%;
    height: 100%;
  }
  .content {
    display: flex;
    cursor: pointer;
    align-items: center;
    background: transparent;
    padding: 0.8rem 0;
    color: white;
    svg {
      width: 17px;
      height: 17px;
    }
    span {
      padding: 5px;
      font-weight: 500;
      font-size: 1.4rem;
    }
  }
`;
