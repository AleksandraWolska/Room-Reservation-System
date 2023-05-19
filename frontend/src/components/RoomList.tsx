import React, { useState, useEffect } from 'react';
import { RoomControllerApi } from '../services/openapi/apis/RoomControllerApi';
import { Room } from '../services/openapi/models/Room';
import { List, ListItem, ListItemText } from '@mui/material';

const RoomsList = () => {

  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    const fetchRooms = async () => {
      const api = new RoomControllerApi();
      const roomsData = await api.all();
      setRooms(roomsData);
      console.log(roomsData)
    }

    fetchRooms();
  }, []); 

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
