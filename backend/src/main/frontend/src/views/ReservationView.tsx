import React, { useState } from 'react';
import { RoomControllerApi, WhenIsFreeRequest, AvailabilityAtResponse, Room } from '../services/openapi';
import { Button, List, ListItem, ListItemText, TextField, Box, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

interface RoomAvailabilityProps {
  room: Room;
  onReservation: (dates: (Date | undefined)[], roomId: number) => void;
}

const ReservationView: React.FC<RoomAvailabilityProps> = ({ room, onReservation }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [availabilityList, setAvailabilityList] = useState<AvailabilityAtResponse[]>([]);
  const [chosenList, setChosenList] = useState<(Date | undefined)[]>([]);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const api = new RoomControllerApi();

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const handleSubmit = async () => {
    if (selectedDate) {
      const whenIsFreeRequest: WhenIsFreeRequest = {
        id: room.id!,
        timeRequest: { date: selectedDate }
      };
      const response = await api.whenIsFree(whenIsFreeRequest);
      setAvailabilityList(response);
    }
  };

  const handleSelect = (availability: AvailabilityAtResponse, index: number) => {
    if (selectedIndices.includes(index)) {
      setSelectedIndices(selectedIndices.filter((i) => i !== index));
      setChosenList(chosenList.filter((d) => d !== availability.timeId));
    } else {
      setSelectedIndices([...selectedIndices, index]);
      setChosenList([...chosenList, availability.timeId]);
    }
  };

  const handleReservation = () => {
    onReservation(chosenList, room.id!);
    setChosenList([]);
    setSelectedIndices([]);
    setSelectedDate(new Date());
  };

  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        borderRadius: 2,
        p: 2,
      }}
    >
      <Typography variant="h6" sx={{ mb: 2 }}>
        {`Room: ${room.number} - Type: ${room.roomType} - Places: ${room.places} - Floor: ${room.floor}`}
      </Typography>
      <DatePicker
        label="Reservation Date"
        value={selectedDate}
        onChange={handleDateChange}
        minDate={new Date()}
        sx={{ mb: 2, width: '100%' }}
      />
      <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mb: 2, width: '100%' }}>
        Check Availability
      </Button>
      <List sx={{ maxHeight: '30vh', overflowY: 'auto', mb: 2 }}>
        {availabilityList.map((availability, index) => (
          <ListItem
            button
            key={index}
            onClick={() => handleSelect(availability, index)}
            sx={{
              bgcolor: selectedIndices.includes(index) ? 'action.selected' : 'inherit',
              color: !availability.isFree ? 'text.disabled' : 'text.primary',
              pointerEvents: !availability.isFree ? 'none' : 'auto',
            }}
          >
            <ListItemText primary={availability.timeId?.toISOString()} secondary={availability.isFree ? 'Free' : 'Occupied'} />
          </ListItem>
        ))}
      </List>
      {chosenList.length > 0 && (
        <Button variant="contained" color="secondary" onClick={handleReservation} sx={{ width: '100%' }}>
          Make Reservation
        </Button>
      )}
    </Box>
  );
};

export default ReservationView;
