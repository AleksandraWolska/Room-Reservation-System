import React, { useState } from 'react';
import { BuildingWithRoomsResponse } from '../services/openapi';
import { List, ListItem, ListItemText, ListItemSecondaryAction, Button, Collapse, styled } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

interface BuildingListProps {
  buildings: BuildingWithRoomsResponse[];
  onRoomSelect: (room: any) => void;
}

const StyledButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(theme.palette.primary.main),
  backgroundColor: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  backgroundColor: theme.palette.action.selected,
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));


const BuildingWithRoomsListView: React.FC<BuildingListProps> = ({ buildings, onRoomSelect }) => {
  const [open, setOpen] = useState<number | null>(null);
  const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null);

  const handleClick = (index: number | undefined) => {
    index != undefined && setOpen(open === index ? null : index);
  };

  const handleRoomSelect = (room: any) => {
    setSelectedRoomId(room.id);
    onRoomSelect(room);
    setSelectedRoomId(null)
    setOpen(null)
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
              borderBottom: '1px solid',
              borderBottomColor: 'divider',
            }}
          >
            <ListItemText primary={`Building: ${buildingData.building?.name}`} />
            {open === buildingData.building?.id ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open === buildingData.building?.id} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {buildingData.rooms?.map((room) => (
                <StyledListItem

                  key={`${buildingData.building?.id}-${room.id}`}
                  selected={selectedRoomId === room.id}
                >
                  <ListItemText primary={`Room: ${room.number} - Type: ${room.roomType} - Places: ${room.places} - Floor: ${room.floor}`} />
                  <ListItemSecondaryAction>
                    <StyledButton onClick={() => handleRoomSelect(room)}>
                      Select
                    </StyledButton>
                  </ListItemSecondaryAction>
                </StyledListItem>
              ))}
            </List>
          </Collapse>
        </>
      ))}
    </List>
  );
};

export default BuildingWithRoomsListView;
