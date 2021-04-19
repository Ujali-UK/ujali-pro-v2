import { Button } from '@chakra-ui/button';
import { Box } from '@chakra-ui/layout';
import React, { useState } from 'react';
import CustomTextArea from '../inputs/CustomTextArea';
import InputField from '../inputs/Input-field';
import CustomNumberInputField from '../inputs/NumberInput';

interface Iprops {
  onSaveEvent: (e: any, details?: any) => Promise<void>;
  saving?: true | false;
}

const Eventform: React.FC<Iprops> = ({ onSaveEvent, saving }) => {
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventTimeStart, seteventTimeStart] = useState('');
  const [eventDateStart, setEventDateStart] = useState('');
  const [pricePerPerson, setPricePerPerson] = useState(0);
  const [spacesAvailable, setSpacesAvailable] = useState(0);

  return (
    <form
      onSubmit={e =>
        onSaveEvent(e, {
          eventName,
          eventDescription,
          eventLocation,
          eventTimeStart,
          eventDateStart,
          pricePerPerson,
          spacesAvailable,
        })
      }
    >
      <Box>
        <InputField
          label="Event Name"
          type="text"
          value={eventName}
          height="3rem"
          placeholder="Name"
          onChange={e => setEventName(e.target.value)}
        />
        <Box pt="1rem">
          <CustomTextArea
            value={eventDescription}
            label="Event description"
            placeholder="Enter description for your event"
            onChange={e => setEventDescription(e.target.value)}
          />
        </Box>
        <Box pt="1rem">
          <InputField
            label="Event Location"
            type="text"
            value={eventLocation}
            height="3rem"
            placeholder="E.g: London"
            onChange={e => setEventLocation(e.target.value)}
          />
        </Box>
        <Box display={{ md: 'flex' }} justifyContent="space-between" pt="1rem">
          <InputField
            value={eventDateStart}
            label="Start Date"
            type="date"
            height="3rem"
            onChange={e => setEventDateStart(e.target.value)}
          />
          <Box width="full" pl="1rem">
            <InputField
              value={eventTimeStart}
              label="Time"
              type="time"
              height="3rem"
              onChange={e => seteventTimeStart(e.target.value)}
            />
          </Box>
        </Box>
        <Box display={{ md: 'flex' }} justifyContent="space-between" pt="1rem">
          <CustomNumberInputField
            value={pricePerPerson}
            label="Price per person £"
            type="number"
            height="3rem"
            placeholder="Price"
            onChange={value => setPricePerPerson(value)}
          />
          <Box width="full" pl="1rem">
            <CustomNumberInputField
              value={spacesAvailable}
              label="Spaces available"
              type="number"
              height="3rem"
              onChange={value => setSpacesAvailable(value)}
            />
          </Box>
        </Box>
        <Box pt="1rem" display="flex" justifyContent="end">
          <Button type="submit" color="white" bgColor="brand.orange">
            {!saving ? 'Create event' : 'Creating...'}
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default Eventform;
