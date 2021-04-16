import { useEffect, useState } from 'react';
import CoverImage from '../../../../src/components/CoverImage';
import FacilitatorProgres from '../../../../src/components/navbar/Facilitator-progress-nav';
import Protected from '../../../../src/layout/Protected';
import { useAuth } from '../../../../src/providers/auth-provider/Auth-provider';
import { database } from '../../../../src/utils/firbase-config';

const Overview = () => {
  const { user } = useAuth();
  const [facilitatorDetails, setFacilitatorDetails] = useState({});
  const [coverImage, setCoverImage] = useState('');

  useEffect(() => {
    if (user) {
      getFacilitatorDetails();
    }
  }, [user]);

  const getFacilitatorDetails = async () => {
    await database
      .collection('facilitators')
      .where('ownerUID', '==', user.uid)
      .get()
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
          setFacilitatorDetails(doc.data());
          setCoverImage(doc.data()?.coverImage);
        });
      })
      .catch(error => {
        // console.log("error", error)
      });
  };

  return (
    <Protected>
      <FacilitatorProgres facilitatorDetails={facilitatorDetails} />
      <CoverImage
        coverImage={coverImage}
        getFacilitatorDetails={getFacilitatorDetails}
      />
      This is the facilitator over-view
    </Protected>
  );
};

export default Overview;
