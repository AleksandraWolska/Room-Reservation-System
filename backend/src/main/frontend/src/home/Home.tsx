
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
  const [dialogContent, setDialogContent] = useState<DialogArray>(['', undefined, undefined]);
  const [chosenRoom, setChosenRoom] = useState<Room | undefined>();
  const [showReservationView, setShowReservationView] = useState(false);
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
    const validDates = dates.filter(date => date !== undefined) as Date[];
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
        setShowReservationView(true);
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
            <Button variant={view == ViewMode.BuildingsWithRoomsMap ? "outlined" : "contained"} color="primary" onClick={() => setView(ViewMode.BuildingsWithRoomsMap)}>Widok mapy</Button>
            <Button variant={view == ViewMode.BuildingsWithRoomsList ? "outlined" : "contained"} color="primary" onClick={() => setView(ViewMode.BuildingsWithRoomsList)}>Widok listy</Button>
            <Button variant={view == ViewMode.Rooms ? "outlined" : "contained"} color="primary" onClick={() => setView(ViewMode.Rooms)}>Szukaj pokoju</Button>
            {view === ViewMode.Rooms && <FilterComponent onFormSubmit={handleFormSubmit} />}
          </Box>
        </Grid>
        <Grid item xs={12} md={9}>
          {showReservationView && chosenRoom && <ReservationView room={chosenRoom} onReservation={handleReservation} />}
          {showDialog && <Dialog
            open={showDialog}
            onClose={() => {
              setShowDialog(false);
              setShowReservationView(false);
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
                setShowReservationView(false);
              }} color="primary">OK</Button>
            </DialogActions>
          </Dialog>
          }
          {RightComponent}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;