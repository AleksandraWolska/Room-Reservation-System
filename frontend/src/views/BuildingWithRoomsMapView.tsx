import React, { useState } from 'react';
import { BuildingWithRoomsResponse } from '../services/openapi';
import { List, ListItem, ListItemText } from '@mui/material';
import { MapContainer, TileLayer } from 'react-leaflet';
import BuildingMarker from './BuildingMarker';

interface BuildingListProps {
  buildings: BuildingWithRoomsResponse[];
}

const BuildingWithRoomsMapView: React.FC<BuildingListProps> = ({ buildings }) => {
  const [selectedBuilding, setSelectedBuilding] = useState<BuildingWithRoomsResponse | null>(null);
   if (!buildings.length) {
    return <p>Loading...</p>; // Or return a spinner or some other loading indicator
  }
  const center = {
    lat: buildings[0].building?.latitude!,
    lng: buildings[0].building?.longitude!
  };

 

  const handleBuildingClick = (building: BuildingWithRoomsResponse) => {
    setSelectedBuilding(building);
    console.log()
    
  };

  return (
    <div >

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
            onClick={() => handleBuildingClick(buildingData)}
          />
        ))}
      </MapContainer>

      {selectedBuilding && 
        <List>
          {selectedBuilding.rooms?.map((room) => (
            <ListItem key={`${selectedBuilding.building?.id}-${room.id}`}>
              <ListItemText primary={`Room: ${room.number} - Type: ${room.roomType} - Places: ${room.places} - Floor: ${room.floor}`} />
            </ListItem>
          ))}
        </List>
      }
    </div>
  );
};

export default BuildingWithRoomsMapView;






