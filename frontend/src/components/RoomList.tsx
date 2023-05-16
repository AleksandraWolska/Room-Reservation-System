import React, { useState, useEffect } from 'react';
import { RoomControllerApi } from '../services/openapi/apis/RoomControllerApi';
import { Room } from '../services/openapi/models/Room';
import { List, ListItem, ListItemText } from '@mui/material';

const RoomsList = () => {
  // Step 2: Create a state variable to hold rooms data
  const [rooms, setRooms] = useState<Room[]>([]);

  // Step 3: Use useEffect to fetch the data when the component mounts
  useEffect(() => {
    const fetchRooms = async () => {
      const api = new RoomControllerApi();
      const roomsData = await api.all();
      setRooms(roomsData);
      console.log(roomsData)
    }

    fetchRooms();
  }, []); // Make sure to pass an empty array as the dependency array, so this effect runs once on mount and not on every render

  // Step 5: In render method, map over the rooms and display the data
  return (
   
    <List>
        <div>LISTA POKOI</div>
      {rooms.map((room) => (
        <ListItem key={room.id}>
          <ListItemText primary={`Room Number: ${room.number}, Floor: ${room.floor}`} />
        </ListItem>
      ))}
    </List>
  );
};

export default RoomsList;
