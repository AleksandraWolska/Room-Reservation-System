import { Button, Typography, Dialog, DialogTitle, DialogActions, Grid, Radio, RadioGroup, FormControlLabel, FormControl, Container } from '@mui/material';
import FilterComponent from "./FilterComponent";
import BuildingsList from "../components/BuildingList";
import RoomsList from "../components/RoomList";
import { FilterRequest, ReservationControllerApi, Room, RoomControllerApi, RoomFilterRequest } from "../services/openapi";
import RoomListView from "../views/RoomListView";
import React, { useState, useEffect } from 'react';
import { BuildingControllerApi } from '../services/openapi/apis/BuildingControllerApi';
import { BuildingWithRoomsResponse } from '../services/openapi/models/BuildingWithRoomsResponse';
import BuildingWithRoomsListView from "../views/BuildingWithRoomsListView";
import ReservationView from "../views/ReservationView";
import BuildingWithRoomsMapView from '../views/BuildingWithRoomsMapView';

const modes = {
    ROOMS: "rooms",
    BUILDINGS_WITH_ROOMS_MAP: "buildingsWithRoomsMap",
    BUILDINGS_WITH_ROOMS_LIST: "buildingsWithRoomsList"
}

interface HomeProps {
    userId: number;
  }
  
  const Home: React.FC<HomeProps> = ({ userId }) => {
    const roomApi = new RoomControllerApi();
    const reservationApi = new ReservationControllerApi();
    const [displayMode, setDisplayMode] = useState(modes.ROOMS)
    const [displayedRoomsList, setDisplayedRoomsList] = useState<Room[]>([])
    const [buildings, setBuildings] = useState<BuildingWithRoomsResponse[]>([]);


    const [showDialog, setShowDialog] = useState(false);
    const [dialogContent, setDialogContent] = useState(''); // to hold either "successful" or "conflict"


    const [chosenRoom, setChosenRoom] = useState<number>()




    useEffect(() => {
        const fetchBuildings = async () => {
            const api = new BuildingControllerApi();
            const buildingsData = await api.allWithRooms();
            setBuildings(buildingsData);
        }

        fetchBuildings();
    }, []);



    const handleFormSubmit = (values: RoomFilterRequest) => {

        const requestParameters: FilterRequest = {
            roomFilterRequest: values,
        };
        console.log("przekazano")
        console.log(requestParameters)
        roomApi.filter(requestParameters)
            .then(response => {
                setDisplayedRoomsList(response)
                console.log(response);
            })
            .catch(error => {
                console.error(error);
            });
    };


    const handleReservation = async (dates: (Date | undefined)[], roomId: number) => {
        try {
            const validDates = dates.filter(date => date !== undefined) as Date[]; // Ensure there are no undefined dates in the array.

            const response = await reservationApi.reserve({
                roomId: roomId,
                userId: userId,
                requestBody: validDates,
            });

            console.log("odpowiedz po rezerwacji")
            console.log(response); // Log the response for debugging purposes.

            setDialogContent('Successful');
            setShowDialog(true);



        } catch (error: any) {
            if (error.status === 409) {
                setDialogContent('Conflict');
                setShowDialog(true);
            } else {
                // handle other errors
                console.error(error);
            }
        }
    };


    const closeDialog = () => {
        setShowDialog(false);
    }



    const [view, setView] = useState(modes.BUILDINGS_WITH_ROOMS_MAP);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setView((event.target as HTMLInputElement).value);
    };

    // ... your useEffect and handle functions ...

    let RightComponent;
    switch (view) {
        case modes.BUILDINGS_WITH_ROOMS_MAP:
            RightComponent = <BuildingWithRoomsMapView buildings={buildings} />;
            break;
        case modes.BUILDINGS_WITH_ROOMS_LIST:
            RightComponent = <BuildingWithRoomsListView buildings={buildings} onRoomSelect={(room) => {
                console.log("You selected room number: ", room.number);
                setChosenRoom(room.number)
            }} />;
            break;
        case modes.ROOMS:
            RightComponent = <RoomListView rooms={displayedRoomsList} onRoomSelect={(room) => {
                console.log("You selected room number: ", room.number);
                setChosenRoom(room.number)
            }} />;
            break;
        default:
            RightComponent = null;
    }

    return (
        <div>
            
            <Container>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={3}>
                        <Button onClick={() => setView(modes.BUILDINGS_WITH_ROOMS_MAP)}>Widok budynków</Button>
                        <Button onClick={() => setView(modes.ROOMS)}>Widok pokoi</Button>

                        {view.includes("buildings") && (
                            <FormControl component="fieldset">
                                <RadioGroup aria-label="view" name="view" value={view} onChange={handleChange}>
                                    <FormControlLabel value={modes.BUILDINGS_WITH_ROOMS_MAP} control={<Radio />} label="Map View" />
                                    <FormControlLabel value={modes.BUILDINGS_WITH_ROOMS_LIST} control={<Radio />} label="List View" />
                                </RadioGroup>
                            </FormControl>
                        )}

                        {view === modes.ROOMS && <FilterComponent onFormSubmit={handleFormSubmit} />}
                    </Grid>
                    <Grid item xs={12} md={9}>
                        {chosenRoom &&
                            <ReservationView id={chosenRoom} onReservation={handleReservation} />}

                        <Dialog open={showDialog} onClose={closeDialog}>
                            <DialogTitle>{dialogContent}</DialogTitle>
                            <DialogActions>
                                <Button onClick={closeDialog} color="primary">
                                    OK
                                </Button>
                            </DialogActions>
                        </Dialog>
                        {RightComponent}
                    </Grid>
                </Grid>
            </Container>


        </div>
    );
};

export default Home;











