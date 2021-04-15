import { useEffect } from 'react';
import CoverImage from '../../../../src/components/CoverImage';
import FacilitatorProgres from '../../../../src/components/navbar/Facilitator-progress-nav';
import Protected from '../../../../src/layout/Protected';
import { useAuth } from '../../../../src/providers/auth-provider/Auth-provider';

const Overview = () => {
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      // getFacilitatorDetails();
    }
  }, [user]);

  // const getFacilitatorDetails = async () => {
  //   await database
  //     .collection('facilitators')
  //     .where('uid', '==', user.uid)
  //     .get()
  //     .then(snapshot => {
  //       snapshot.docs.forEach(doc => {
  //         // console.log("check doc", doc.data())
  //       });
  //     });
  // };

  return (
    <Protected>
      <FacilitatorProgres />
      <CoverImage />
      This is the facilitator over-view
    </Protected>
  );
};

export default Overview;
