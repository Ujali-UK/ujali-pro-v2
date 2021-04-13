import CoverImage from '../../../../src/components/CoverImage';
import FacilitatorProgres from '../../../../src/components/navbar/Facilitator-progress-nav';
import Protected from '../../../../src/layout/Protected';
// import { firebase } from '../../../../src/utils/firbase-config'

const Overview = () => {
  return (
    <Protected>
      <FacilitatorProgres />
      <CoverImage />
      This is the facilitator over-view
    </Protected>
  );
};

export default Overview;
