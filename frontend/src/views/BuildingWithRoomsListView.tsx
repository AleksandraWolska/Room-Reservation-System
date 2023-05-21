import React, { useState } from 'react';
import { BuildingWithRoomsResponse } from '../services/openapi';
import { List, ListItem, ListItemText, ListItemSecondaryAction, Button, Collapse } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

interface BuildingListProps {
  buildings: BuildingWithRoomsResponse[];
  onRoomSelect: (room: any) => void;
}

const BuildingWithRoomsListView: React.FC<BuildingListProps> = ({ buildings, onRoomSelect }) => {
  const [open, setOpen] = useState<number | null>(null);
  const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null);

  const handleClick = (index: number | undefined) => {
    index != undefined && setOpen(open === index ? null : index);
  };

  const handleRoomSelect = (room: any) => {
    setSelectedRoomId(room.id);
    onRoomSelect(room);
  }

  return (
    <List>
      {buildings.map((buildingData) => (
        <>
          <ListItem 
            button
            onClick={() => handleClick(buildingData.building?.id)}
            sx={{
              bgcolor: (open === buildingData.building?.id) ? 'action.selected' : 'inherit',
            }}
          >
            <ListItemText primary={`Building: ${buildingData.building?.name}`} />
            {open === buildingData.building?.id ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open === buildingData.building?.id} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {buildingData.rooms?.map((room) => (
                <ListItem
                  button
                  key={`${buildingData.building?.id}-${room.id}`}
                  sx={{
                    bgcolor: 'inherit',
                    ml: 2,
                  }}
                >
                  <ListItemText primary={`Room: ${room.number} - Type: ${room.roomType} - Places: ${room.places} - Floor: ${room.floor}`} />
                  <ListItemSecondaryAction>
                    <Button variant="contained" color="primary" onClick={() => handleRoomSelect(room)}>
                      Select
                    </Button>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Collapse>
        </>
      ))}
    </List>
  );
};

export default BuildingWithRoomsListView;
