import CoverImage from '../../../../src/components/CoverImage';
import FacilitatorProgres from '../../../../src/components/navbar/Facilitator-progress-nav';
import Protected from '../../../../src/layout/Protected';

const index = () => {
  return (
    <Protected>
      <FacilitatorProgres />
      <CoverImage />
      This is the facilitator over-view
    </Protected>
  );
};

export default index;
