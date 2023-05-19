import React, { useState } from 'react';
import { RoomControllerApi, WhenIsFreeRequest, AvailabilityAtResponse } from '../services/openapi'; // assuming your openAPI generated code resides in api directory.
import {  Button, List, ListItem, ListItemText, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


interface RoomAvailabilityProps {
  id: number;
  onReservation: (dates: AvailabilityAtResponse[]) => void;
}

const ReservationView: React.FC<RoomAvailabilityProps> = ({ id, onReservation }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [availabilityList, setAvailabilityList] = useState<AvailabilityAtResponse[]>([]);
  const [chosenList, setChosenList] = useState<AvailabilityAtResponse[]>([]);
  const api = new RoomControllerApi();

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const handleSubmit = async () => {
    if (selectedDate) {
      const whenIsFreeRequest: WhenIsFreeRequest = {
        id: id,
        request: { date: selectedDate}
      };
      const response = await api.whenIsFree(whenIsFreeRequest);
      setAvailabilityList(response);
    }
  };

  const handleSelect = (availability: AvailabilityAtResponse) => {
    setChosenList([...chosenList, availability]);
  };

  const handleReservation = () => {
    onReservation(chosenList);
  };

  return (
    <div>
      <DatePicker
        label="Reservation Date"
        value={selectedDate}
        onChange={handleDateChange}
        // renderInput={(params) => <TextField {...params} />}
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Check Availability
      </Button>
      <List>
        {availabilityList.map((availability, index) => (
          <ListItem button key={index} onClick={() => handleSelect(availability)}>
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


















// import React, { useState, useEffect } from "react";
// import { RoomControllerApi, WhenIsFreeRequest } from '../services/openapi'; 
// import { Button, List, ListItem, ListItemText } from "@mui/material";
// import DateTimePicker from 'react-datetime-picker';
// import { AvailabilityAtResponse } from "../services/openapi";

// interface Props {
//   id: number;
//   onReservation: (dates: Date[]) => void;
// }

// const RoomReservation: React.FC<Props> = ({ id, onReservation }) => {
//   const [selectedDate, setSelectedDate] = useState<Date>(new Date());
//   const [availabilityList, setAvailabilityList] = useState<Array<AvailabilityAtResponse>>([]);
//   const [chosenList, setChosenList] = useState<Array<Date>>([]);

//   const roomControllerApi = new RoomControllerApi();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const request: WhenIsFreeRequest = {
//           id: id,
//           request: {
//             date: selectedDate, 
//           },
//         };
//         const response = await roomControllerApi.whenIsFree(request);
//         setAvailabilityList(response);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchData();
//   }, [selectedDate, id, roomControllerApi]);

//   const handleDateChange = (date: Date) => {
//     setSelectedDate(date);
//   };

//   const handleSelectDate = (date: Date) => {
//     setChosenList([...chosenList, date]);
//   };

//   const handleMakeReservation = () => {
//     onReservation(chosenList);
//   };

//   return (
//     <div>
//       <DateTimePicker onChange={handleDateChange} value={selectedDate} />
//       <List>
//         {availabilityList.map((availability, index) => (
//           <ListItem button key={index} onClick={() => handleSelectDate(availability.timeId!)}>
//             <ListItemText primary={availability.timeId?.toString()} secondary={availability.isFree ? 'Free' : 'Occupied'} />
//           </ListItem>
//         ))}
//       </List>
//       <Button variant="contained" color="primary" onClick={handleMakeReservation}>Make Reservation</Button>
//     </div>
//   );
// };

// export default RoomReservation;
