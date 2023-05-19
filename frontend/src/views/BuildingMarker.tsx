import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';

interface BuildingMarkerProps {
  position: LatLngExpression;
  onClick: () => void;
  text: string;
}

const BuildingMarker: React.FC<BuildingMarkerProps> = ({ position, onClick, text }) => (
  <Marker position={position} eventHandlers={{ click: onClick }}>
    <Popup>{text}</Popup>
  </Marker>
);

export default BuildingMarker;
