
import { Button, Typography, List, ListItem, ListItemText, TextField, Dialog, DialogTitle, DialogActions } from '@mui/material';
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
    FILTERED_ROOMS: "filteredRoomsMode",
    ALL_ROOMS: "allRooms",
    BUILDINGS_WITH_ROOMS: "buildingsWithRooms",
    BUILDINGS_ONLY: "buildingsOnly"
}


const Home = () => {

    const roomApi = new RoomControllerApi();
    const reservationApi = new ReservationControllerApi();
    const [displayMode, setDisplayMode] = useState(modes.ROOMS)
    const [displayedRoomsList, setDisplayedRoomsList] = useState<Room[]>([])
    const [buildings, setBuildings] = useState<BuildingWithRoomsResponse[]>([]);

    const [showDialog, setShowDialog] = useState(false);
    const [dialogContent, setDialogContent] = useState(''); // to hold either "successful" or "conflict"


    const [userId, setUserId] = useState(1)




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




    return (
        <div>
            <header>
                <Typography variant="h4">Nasz Serwis</Typography>
                <Button variant="contained" color="primary">
                    Zaloguj
                </Button>
            </header>
            <Button onClick={() => setDisplayMode(modes.BUILDINGS_WITH_ROOMS)}>Widok budynków</Button>
            <Button onClick={() => setDisplayMode(modes.ROOMS)}>Widok pokoi</Button>





            <FilterComponent onFormSubmit={handleFormSubmit} />

            <ReservationView id={1} onReservation={handleReservation} />

            <Dialog open={showDialog} onClose={closeDialog}>
                <DialogTitle>{dialogContent}</DialogTitle>
                <DialogActions>
                    <Button onClick={closeDialog} color="primary">
                        OK
                    </Button>
                </DialogActions>
            </Dialog>



            <BuildingWithRoomsMapView  buildings={buildings} />
            <BuildingWithRoomsListView
                buildings={buildings}
                onRoomSelect={(room) => {
                    console.log("You selected room number: ", room.number);
                }} />
            <RoomListView
                rooms={displayedRoomsList}
                onRoomSelect={(room) => {
                    console.log("You selected room number: ", room.number);
                }}
            />


            <RoomsList />

        </div>

    );
};

export default Home;
