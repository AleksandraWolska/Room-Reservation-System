import React, { useState, useEffect } from 'react';
import { BuildingControllerApi } from '../services/openapi/apis/BuildingControllerApi';
import { BuildingWithRoomsResponse } from '../services/openapi/models/BuildingWithRoomsResponse';
import { List, ListItem, ListItemText, ListSubheader } from '@mui/material';

const BuildingsList = () => {

  const [buildings, setBuildings] = useState<BuildingWithRoomsResponse[]>([]);

  useEffect(() => {
    const fetchBuildings = async () => {
      const api = new BuildingControllerApi();
      const buildingsData = await api.allWithRooms();
      setBuildings(buildingsData);
    }

    fetchBuildings();
  }, []); 

  return (
    <List>
      <div>LISTA BUDYNKÓW</div>
      {buildings.map((building) => (
        <li key={`section-${building.building?.id}`}>
          <ul>
            <ListSubheader>{`Building: ${building.building?.name}, Coordunates: ${building.building?.latitude} ${building.building?.longitude}`}</ListSubheader>
            {building.rooms?.map((room) => (
              <ListItem key={room.id}>
                <ListItemText primary={`Room Number: ${room.number}, Floor: ${room.floor}`} />
              </ListItem>
            ))}
          </ul>
        </li>
      ))}
    </List>
  );
};

export default BuildingsList;
