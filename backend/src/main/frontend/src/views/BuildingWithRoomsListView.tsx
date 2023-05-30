import React, { useState } from 'react';
import { BuildingWithRoomsResponse } from '../services/openapi';
import { List, ListItem, ListItemText, ListItemSecondaryAction, Button, Collapse, Typography } from '@mui/material';
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
              my: 1,
            }}
            divider
          >
            <ListItemText primary={
              <>
                <Typography variant="h6">{`Building: ${buildingData.building?.name}`}</Typography>
                <Typography variant="subtitle1">{`Available rooms: ${buildingData.roomsCount}`}</Typography>

              </>

            } sx={{ fontSize: "1.5em"  }} />
            {open === buildingData.building?.id ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open === buildingData.building?.id} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {buildingData.rooms?.map((room) => (
                <ListItem key={room.id} sx={{
                  bgcolor: (selectedRoomId === room.id) ? 'action.hover' : 'inherit', 

                }} divider>
                  <ListItemText
                    primary={
                      <>
                        <Typography variant="h6">{`Room Number: ${room.number}`}</Typography>
                        <Typography variant="subtitle1">{`Floor: ${room.floor}`}</Typography>
                        <Typography variant="subtitle1">{`Places: ${room.places}`}</Typography>
                        <Typography variant="subtitle1">{`Type: ${room.roomType}`}</Typography>
                        <Typography variant="subtitle1">{`Projector: ${room.projector ? "Yes" : "No"}`}</Typography>
                      </>
                    }
                  />
                  <Button variant="contained" color="primary" onClick={() => handleRoomSelect(room)}>
                    Select
                  </Button>
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
