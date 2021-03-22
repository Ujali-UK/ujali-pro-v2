import React, { FC } from 'react';
import Image from 'next/image';

const Navbar: FC = () => {
  return (
    <div>
      <div>
        <Image
          src="/assets/ujali_logo.png"
          height={85}
          width={113}
          alt="ujali-logo"
        />
      </div>
      hello Navbar
    </div>
  );
};

export default Navbar;
