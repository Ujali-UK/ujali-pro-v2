import React, { useState } from 'react';
import Billing from '../../../src/components/hub-tabs/billing';
import Bookings from '../../../src/components/hub-tabs/bookings';
import Calendar from '../../../src/components/hub-tabs/calendar';
import Chats from '../../../src/components/hub-tabs/chats';
import Subnav from '../../../src/components/navbar/Subnav';
import Protected from '../../../src/layout/Protected';

const Hub = () => {
  const [activeTab, setActiveTab] = useState<string>('bookings');

  return (
    <Protected>
      <Subnav activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === 'chats' && <Chats />}
      {activeTab === 'bookings' && <Bookings />}
      {activeTab === 'calendar' && <Calendar />}
      {activeTab === 'billing' && <Billing />}
    </Protected>
  );
};

export default Hub;
