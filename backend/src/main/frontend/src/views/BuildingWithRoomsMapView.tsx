import React, { useState } from 'react';
import { BuildingWithRoomsResponse } from '../services/openapi';
import { List, ListItem, ListItemText, Button, Typography, Box } from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';

interface BuildingListProps {
  buildings: BuildingWithRoomsResponse[];
  onRoomSelect: (room: any) => void;
}

interface BuildingMarkerProps {
  position: LatLngExpression;
  onOpen: () => void;
  text: string;
}

const BuildingMarker: React.FC<BuildingMarkerProps> = ({ position, onOpen, text }) => (
  <Marker position={position} eventHandlers={{ click: onOpen }}>
    <Popup>{text}</Popup>
  </Marker>
);

const BuildingWithRoomsMapView: React.FC<BuildingListProps> = ({ buildings, onRoomSelect }) => {
  const [selectedBuilding, setSelectedBuilding] = useState<BuildingWithRoomsResponse | null>(null);
  const [isListVisible, setListVisible] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null);

  if (!buildings.length) {
    return <p>Loading...</p>; 
  }

  const handleRoomSelect = (room: any) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSelectedRoomId(room.id);
    onRoomSelect(room);
  }


  const center = {
    lat: buildings[0].building?.latitude!,
    lng: buildings[0].building?.longitude!
  };

  const handleBuildingClick = (building: BuildingWithRoomsResponse) => {
    setSelectedBuilding(building);
    setListVisible(true);
  };

  const closeList = () => {
    setSelectedBuilding(null)
    setListVisible(false);
  };

  return (
    <div>
            <Typography variant="h4" component="h1" textAlign="center" mb={2} sx={{ mt: 2 }}>
        {selectedBuilding ? `Rooms in building: ${selectedBuilding.building?.name}` : "Choose building from the map"}
      </Typography>
      <MapContainer center={center} zoom={11} style={{ height: "30vh", width: "95%" }} scrollWheelZoom={true}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {buildings.map((buildingData) => (
          <BuildingMarker
            key={buildingData.building?.id}
            position={[buildingData.building?.latitude!, buildingData.building?.longitude!]}
            text={buildingData.building?.name!}
            onOpen={() => handleBuildingClick(buildingData)}
          />
        ))}
      </MapContainer>

      {selectedBuilding && isListVisible &&
        <div>
          <Button onClick={closeList}>Close list</Button>
          <Box sx={{ mb: 2, mt: 2 }}>
            <Typography variant="h6" component="h2" mb={1}>{`Building: ${selectedBuilding.building?.name}`}</Typography>
            {/* <Typography variant="body1">{`Address: ${selectedBuilding.building?.address}`}</Typography> */}
            <Typography variant="body1">{`Number of Rooms: ${selectedBuilding.rooms?.length}`}</Typography>
          </Box>
          <List>
            {selectedBuilding.rooms?.map((room) => (
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
        </div>
      }
    </div>
  );
};

export default BuildingWithRoomsMapView;
