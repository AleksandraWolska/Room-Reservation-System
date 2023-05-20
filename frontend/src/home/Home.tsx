import { Button, Typography, Dialog, DialogTitle, DialogActions, Grid, Radio, RadioGroup, FormControlLabel, FormControl, Container } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { BuildingControllerApi, FilterRequest, ReservationControllerApi, Room, RoomControllerApi, RoomFilterRequest } from '../services/openapi';

import FilterComponent from "./FilterComponent";
import BuildingWithRoomsMapView from '../views/BuildingWithRoomsMapView';
import BuildingWithRoomsListView from "../views/BuildingWithRoomsListView";
import RoomListView from "../views/RoomListView";
import ReservationView from "../views/ReservationView";

import { BuildingWithRoomsResponse } from '../services/openapi/models/BuildingWithRoomsResponse';

enum ViewMode {
  Rooms = "rooms",
  BuildingsWithRoomsMap = "buildingsWithRoomsMap",
  BuildingsWithRoomsList = "buildingsWithRoomsList"
}

interface HomeProps {
  userId: number;
}

const Home: React.FC<HomeProps> = ({ userId }) => {
  const roomApi = new RoomControllerApi();
  const reservationApi = new ReservationControllerApi();
  
  const [displayMode, setDisplayMode] = useState(ViewMode.Rooms);
  const [displayedRoomsList, setDisplayedRoomsList] = useState<Room[]>([]);
  const [buildings, setBuildings] = useState<BuildingWithRoomsResponse[]>([]);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState(''); // to hold either "successful" or "conflict"
  const [chosenRoom, setChosenRoom] = useState<number>()
  const [view, setView] = useState(ViewMode.BuildingsWithRoomsMap);

  useEffect(() => {
    const fetchBuildings = async () => {
      const api = new BuildingControllerApi();
      const buildingsData = await api.allWithRooms();
      setBuildings(buildingsData);
    }
    fetchBuildings();
  }, []);

  const handleFormSubmit = async (values: RoomFilterRequest) => {
    const requestParameters: FilterRequest = { roomFilterRequest: values };
    try {
      const response = await roomApi.filter(requestParameters);
      setDisplayedRoomsList(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleReservation = async (dates: (Date | undefined)[], roomId: number) => {
    const validDates = dates.filter(date => date !== undefined) as Date[]; // Ensure there are no undefined dates in the array.
    try {
      const response = await reservationApi.reserve({ roomId, userId, requestBody: validDates });
      setDialogContent('Successful');
      setShowDialog(true);
    } catch (error: any) {
      if (error.status === 409) {
        setDialogContent('Conflict');
        setShowDialog(true);
      } else {
        console.error(error);
      }
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setView(event.target.value as ViewMode);
  };

  const RightComponent = (() => {
    const commonProps = { onRoomSelect: (room: any) => setChosenRoom(room.number) };
    switch (view) {
      case ViewMode.BuildingsWithRoomsMap: return <BuildingWithRoomsMapView buildings={buildings} />;
      case ViewMode.BuildingsWithRoomsList: return <BuildingWithRoomsListView {...commonProps} buildings={buildings} />;
      case ViewMode.Rooms: return <RoomListView {...commonProps} rooms={displayedRoomsList} />;
      default: return null;
    }
  })();

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <Button onClick={() => setView(ViewMode.BuildingsWithRoomsMap)}>Widok budynków</Button>
          <Button onClick={() => setView(ViewMode.Rooms)}>Widok pokoi</Button>
          {view.includes("buildings") && (
            <FormControl component="fieldset">
              <RadioGroup aria-label="view" name="view" value={view} onChange={handleChange}>
                <FormControlLabel value={ViewMode.BuildingsWithRoomsMap} control={<Radio />} label="Map View" />
                <FormControlLabel value={ViewMode.BuildingsWithRoomsList} control={<Radio />} label="List View" />
              </RadioGroup>
            </FormControl>
          )}
          {view === ViewMode.Rooms && <FilterComponent onFormSubmit={handleFormSubmit} />}
        </Grid>
        <Grid item xs={12} md={9}>
          {chosenRoom && <ReservationView id={chosenRoom} onReservation={handleReservation} />}
          <Dialog open={showDialog} onClose={() => setShowDialog(false)}>
            <DialogTitle>{dialogContent}</DialogTitle>
            <DialogActions>
              <Button onClick={() => setShowDialog(false)} color="primary">OK</Button>
            </DialogActions>
          </Dialog>
          {RightComponent}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
