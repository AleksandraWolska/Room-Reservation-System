import React, { useState } from 'react';
import { BuildingWithRoomsResponse } from '../services/openapi';
import { List, ListItem, ListItemText, Button } from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';

interface BuildingListProps {
  buildings: BuildingWithRoomsResponse[];
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

const BuildingWithRoomsMapView: React.FC<BuildingListProps> = ({ buildings }) => {
  const [selectedBuilding, setSelectedBuilding] = useState<BuildingWithRoomsResponse | null>(null);
  const [isListVisible, setListVisible] = useState(false);

  if (!buildings.length) {
    return <p>Loading...</p>; 
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
    setListVisible(false);
  };

  return (
    <div>
      <MapContainer center={center} zoom={9} style={{ height: "300px", width: "400px" }} scrollWheelZoom={true}>
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
          <List>
            {selectedBuilding.rooms?.map((room) => (
              <ListItem key={`${selectedBuilding.building?.id}-${room.id}`}>
                <ListItemText primary={`Room: ${room.number} - Type: ${room.roomType} - Places: ${room.places} - Floor: ${room.floor}`} />
              </ListItem>
            ))}
          </List>
        </div>
      }
    </div>
  );
};

export default BuildingWithRoomsMapView;
