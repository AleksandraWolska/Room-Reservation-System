import { Button, Typography, Dialog, DialogTitle, DialogActions, Grid, Radio, RadioGroup, FormControlLabel, FormControl, Container, Box, DialogContentText, DialogContent } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { BuildingControllerApi, FilterRequest, Reservation, ReservationControllerApi, Room, RoomControllerApi, RoomFilterRequest } from '../services/openapi';

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

type DialogArray = [string, Reservation?, any?];

const Home: React.FC<HomeProps> = ({ userId }) => {
  const roomApi = new RoomControllerApi();
  const reservationApi = new ReservationControllerApi();
  const api = new BuildingControllerApi();
  const [displayMode, setDisplayMode] = useState(ViewMode.Rooms);
  const [displayedRoomsList, setDisplayedRoomsList] = useState<Room[]>([]);
  const [buildings, setBuildings] = useState<BuildingWithRoomsResponse[]>([]);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState<DialogArray>(['', undefined, undefined]); // to hold either "successful" or "conflict"
  const [chosenRoom, setChosenRoom] = useState<Room | undefined>();
  const [showReservationView, setShowReservationView] = useState(false); // New state
  const [view, setView] = useState(ViewMode.BuildingsWithRoomsMap);


  useEffect(() => {
    const fetchBuildings = async () => {

      const buildingsData = await api.allWithRooms();
      setBuildings(buildingsData);
    }
    fetchBuildings();
    handleFormSubmit({})
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
      setDialogContent(["successful", response, undefined]);
      setShowDialog(true);
      console.log(dialogContent)
    } catch (error: any) {
      if (error.response && error.response.status === 409) {
        setDialogContent(["conflict", undefined, error.response]);
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
    const commonProps = {
      onRoomSelect: (room: any) => {
        setChosenRoom(room);
        setShowReservationView(true); // set showReservationView to true when a room is selected
      }
    };
    switch (view) {
      case ViewMode.BuildingsWithRoomsMap: return <BuildingWithRoomsMapView {...commonProps} buildings={buildings} />;
      case ViewMode.BuildingsWithRoomsList: return <BuildingWithRoomsListView {...commonProps} buildings={buildings} />;
      case ViewMode.Rooms: return <RoomListView {...commonProps} rooms={displayedRoomsList} />;
      default: return null;
    }
  })();


  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button variant="contained" color="primary" onClick={() => setView(ViewMode.BuildingsWithRoomsMap)}>Widok budynków</Button>
            <Button variant="contained" color="primary" onClick={() => setView(ViewMode.Rooms)}>Widok pokoi</Button>
            {view.includes("buildings") && (
              <FormControl component="fieldset">
                <RadioGroup aria-label="view" name="view" value={view} onChange={handleChange}>
                  <FormControlLabel value={ViewMode.BuildingsWithRoomsMap} control={<Radio />} label="Map View" />
                  <FormControlLabel value={ViewMode.BuildingsWithRoomsList} control={<Radio />} label="List View" />
                </RadioGroup>
              </FormControl>
            )}
            {view === ViewMode.Rooms && <FilterComponent onFormSubmit={handleFormSubmit} />}
          </Box>
        </Grid>
        <Grid item xs={12} md={9}>
          {showReservationView && chosenRoom && <ReservationView room={chosenRoom} onReservation={handleReservation} />}
          <Dialog
            open={showDialog}
            onClose={() => {
              setShowDialog(false);
              setShowReservationView(false); // hide ReservationView when the dialog is closed
            }}
          >
            <DialogTitle>{dialogContent[0] == 'successful' ? 'Reservation Successful' : 'Reservation Conflict'}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                {dialogContent[0] == 'successful'
                  ? `Your reservation has been successfully made from ${dialogContent[1]?.reservedFrom?.toLocaleDateString()} to ${dialogContent[1]?.reservedTo?.toLocaleDateString()}`
                  : `There was a conflict with your reservation. Please choose a different date or room. Error code: ${dialogContent[2]?.status}`
                }
              </DialogContentText>

            </DialogContent>
            <DialogActions>
              <Button onClick={() => {
                setShowDialog(false);
                setShowReservationView(false); // hide ReservationView when the dialog is closed
              }} color="primary">OK</Button>
            </DialogActions>
          </Dialog>
          {RightComponent}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;