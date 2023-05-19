import React from 'react';
import { BuildingWithRoomsResponse } from '../services/openapi';
import { List, ListItem, ListItemText, ListItemSecondaryAction, Button, Collapse } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

interface BuildingListProps {
  buildings: BuildingWithRoomsResponse[];
  onRoomSelect: (room: any) => void;
}



const BuildingWithRoomsListView: React.FC<BuildingListProps> = ({ buildings, onRoomSelect }) => {
 // const classes = useStyles();
  const [open, setOpen] = React.useState<number | null>(null);

  const handleClick = (index: number |undefined) => {
    index != undefined && setOpen(open === index ? null : index);
    console.log("lista budynkow")
    console.log(buildings)
  };

  return (
    <List>
      {buildings.map((buildingData) => (
        <>
          <ListItem onClick={() => handleClick(buildingData.building?.id)}>
            <ListItemText primary={`Building: ${buildingData.building?.name}`} />
            {open === buildingData.building?.id ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open === buildingData.building?.id} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {buildingData.rooms?.map((room) => (
                <ListItem  key={`${buildingData.building?.id}-${room.id}`}>
                  <ListItemText primary={`Room: ${room.number} - Type: ${room.roomType} - Places: ${room.places} - Floor: ${room.floor}`} />
                  <ListItemSecondaryAction>
                    <Button variant="contained" color="primary" onClick={() => onRoomSelect(room)}>
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