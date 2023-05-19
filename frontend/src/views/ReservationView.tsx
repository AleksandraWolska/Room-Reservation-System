import React, { useState } from 'react';
import { RoomControllerApi, WhenIsFreeRequest, AvailabilityAtResponse } from '../services/openapi'; 
import { Button, List, ListItem, ListItemText, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

interface RoomAvailabilityProps {
  id: number;
  onReservation: (dates: (Date|undefined)[], roomId: number) => void;
}

const ReservationView: React.FC<RoomAvailabilityProps> = ({ id, onReservation }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [availabilityList, setAvailabilityList] = useState<AvailabilityAtResponse[]>([]);
  const [chosenList, setChosenList] = useState<(Date|undefined)[]>([]);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const api = new RoomControllerApi();

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const handleSubmit = async () => {
    if (selectedDate) {
      const whenIsFreeRequest: WhenIsFreeRequest = {
        id: id,
        timeRequest: { date: selectedDate}
      };
      const response = await api.whenIsFree(whenIsFreeRequest);
      setAvailabilityList(response);
    }
  };

  const handleSelect = (availability: AvailabilityAtResponse, index: number) => {
    if (selectedIndices.includes(index)) {

        setSelectedIndices(selectedIndices.filter((i) => i !== index))
        setChosenList(chosenList.filter((d) => d !== availability.timeId))


    } else {
            setChosenList([...chosenList, availability.timeId]);
    setSelectedIndices([...selectedIndices, index]);
    }

  };

  const handleReservation = () => {
    onReservation(chosenList, id);
  };

  return (
    <div>
      <DatePicker
        label="Reservation Date"
        value={selectedDate}
        onChange={handleDateChange}
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Check Availability
      </Button>
      <List>
        {availabilityList.map((availability, index) => (
          <ListItem 
            button 
            key={index} 
            onClick={() => handleSelect(availability, index)}
            style={selectedIndices.includes(index) ? {backgroundColor: 'lightblue'} : {}}
          >
            <ListItemText primary={availability.timeId?.toISOString()} secondary={availability.isFree ? 'Free' : 'Occupied'} />
          </ListItem>
        ))}
      </List>
      <Button variant="contained" color="secondary" onClick={handleReservation}>
        Make Reservation
      </Button>
    </div>
  );
};

export default ReservationView;
