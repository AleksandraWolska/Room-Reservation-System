import React, { useState, useEffect } from 'react';
import { BuildingControllerApi } from '../services/openapi/apis/BuildingControllerApi';
import { BuildingWithRoomsResponse } from '../services/openapi/models/BuildingWithRoomsResponse';
import { List, ListItem, ListItemText, ListSubheader } from '@mui/material';

const BuildingsList = () => {
  // Step 2: Create a state variable to hold buildings data
  const [buildings, setBuildings] = useState<BuildingWithRoomsResponse[]>([]);

  // Step 3: Use useEffect to fetch the data when the component mounts
  useEffect(() => {
    const fetchBuildings = async () => {
      const api = new BuildingControllerApi();
      const buildingsData = await api.allWithRooms();
      setBuildings(buildingsData);
    }

    fetchBuildings();
  }, []); 

  // Step 5: In render method, map over the buildings and display the data
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
