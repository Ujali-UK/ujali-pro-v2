import { Box, Text } from '@chakra-ui/layout';
import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table';
import { format } from 'date-fns';
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import CustomHeading from '../../common/custom-heading';

const CalendarTab = () => {
  const [date, setDate] = useState(new Date());

  return (
    <Box bgColor="#f7f7f7" height="80vh">
      <CustomHeading value="Calendar" />
      <Text textAlign="justify" mx="2rem">
        Be ontop of your schedules. The calendar allows team coordination and
        makes it easy to stay on top of your business schedules.{' '}
      </Text>
      <Box display={{ md: 'flex' }} justifyContent={{ md: 'center' }} pt="4rem">
        <Box px="1rem">
          <Calendar
            view="month"
            onChange={value => setDate(value)}
            value={date}
          />
        </Box>
        <Box mx={{ md: '2rem' }} height="30rem" overflowY="scroll">
          <Table colorScheme="orange">
            <Thead>
              <Tr>
                <Th>
                  {format(date ? new Date(date) : new Date(), 'Lo LLL, yyyy')}
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>00:00</Td>
              </Tr>
              <Tr>
                <Td>01:00</Td>
              </Tr>
              <Tr>
                <Td>02:00</Td>
              </Tr>
              <Tr>
                <Td>03:00</Td>
              </Tr>
              <Tr>
                <Td>04:00</Td>
              </Tr>
              <Tr>
                <Td>04:00</Td>
              </Tr>
              <Tr>
                <Td>06:00</Td>
              </Tr>
              <Tr>
                <Td>07:00</Td>
              </Tr>
              <Tr>
                <Td>08:00</Td>
              </Tr>
              <Tr>
                <Td>09:00</Td>
              </Tr>
              <Tr>
                <Td>10:00</Td>
              </Tr>
              <Tr>
                <Td>11:00</Td>
              </Tr>
              <Tr>
                <Td>12:00</Td>
              </Tr>
              <Tr>
                <Td>13:00</Td>
              </Tr>
              <Tr>
                <Td>14:00</Td>
              </Tr>
              <Tr>
                <Td>15:00</Td>
              </Tr>
              <Tr>
                <Td>16:00</Td>
              </Tr>
              <Tr>
                <Td>17:00</Td>
              </Tr>
              <Tr>
                <Td>18:00</Td>
              </Tr>
              <Tr>
                <Td>19:00</Td>
              </Tr>
              <Tr>
                <Td>20:00</Td>
              </Tr>
              <Tr>
                <Td>21:00</Td>
              </Tr>
              <Tr>
                <Td>22:00</Td>
              </Tr>
              <Tr>
                <Td>23:00</Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>
      </Box>
    </Box>
  );
};

export default CalendarTab;
