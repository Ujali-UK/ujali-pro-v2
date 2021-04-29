import { Button } from '@chakra-ui/button';
import { Box } from '@chakra-ui/layout';
import React, { useState } from 'react';
import CustomTextArea from '../inputs/CustomTextArea';
import InputField from '../inputs/Input-field';
import CustomNumberInputField from '../inputs/NumberInput';

interface Iprops {
  onSaveGig: (e: any, details?: any) => Promise<void>;
  saving?: true | false;
}

const GigsForm: React.FC<Iprops> = ({ onSaveGig, saving }) => {
  const [gigName, setGigName] = useState('');
  const [gigDescription, setGigDescription] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [minimumPricePerPerson, setPricePerPerson] = useState(0);
  const [employeesNumber, setSpacesAvailable] = useState(0);

  return (
    <form
      onSubmit={e =>
        onSaveGig(e, {
          gigName,
          gigDescription,
          eventLocation,
          fromDate,
          toDate,
          minimumPricePerPerson,
          employeesNumber,
        })
      }
    >
      <Box>
        <InputField
          label="Event Name"
          type="text"
          value={gigName}
          height="3rem"
          placeholder="Name"
          required={true}
          onChange={e => setGigName(e.target.value)}
        />
        <Box pt="1rem">
          <CustomTextArea
            value={gigDescription}
            label="Event description"
            required={true}
            placeholder="Enter description for your event"
            onChange={e => setGigDescription(e.target.value)}
          />
        </Box>
        <Box pt="1rem">
          <InputField
            label="Event Location"
            type="text"
            required={true}
            value={eventLocation}
            height="3rem"
            placeholder="E.g: London"
            onChange={e => setEventLocation(e.target.value)}
          />
        </Box>
        <Box display={{ md: 'flex' }} justifyContent="space-between" pt="1rem">
          <InputField
            value={fromDate}
            label="Start Date"
            type="date"
            height="3rem"
            required={true}
            onChange={e => setFromDate(e.target.value)}
          />
          <Box width="full" pl="1rem">
            <InputField
              value={toDate}
              label="End Date"
              type="date"
              required={true}
              height="3rem"
              onChange={e => setToDate(e.target.value)}
            />
          </Box>
        </Box>
        <Box display={{ md: 'flex' }} justifyContent="space-between" pt="1rem">
          <CustomNumberInputField
            value={minimumPricePerPerson}
            label="Price per person £"
            type="number"
            height="3rem"
            placeholder="Price"
            onChange={value => setPricePerPerson(value)}
          />
          <Box width="full" pl="1rem">
            <CustomNumberInputField
              value={employeesNumber}
              label="Spaces available"
              type="number"
              height="3rem"
              onChange={value => setSpacesAvailable(value)}
            />
          </Box>
        </Box>
        {/* <Box mb="1rem">
          <FormLabel>Travel and Accommodation</FormLabel>
          <Select
            height="3rem"
            bgColor="#f1f1f6"
            value={travelAccommodation}
            onChange={e => setTravelAccomodation(e.target.value)}
            placeholder="Select account type"
            isRequired
          >
            <option value="Travel & Accommodation to be arranged by Ujali">
              Travel & Accommodation to be arranged by Ujali
            </option>
            <option value="I will arrange Travel & Accommodation">
              I will arrange Travel & Accommodation
            </option>
          </Select>
        </Box> */}
        <Box pt="1rem" display="flex" justifyContent="end">
          <Button type="submit" color="white" bgColor="brand.orange">
            {!saving ? 'Create event' : 'Creating...'}
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default GigsForm;
