import React, { useState } from "react";
import { Button, Typography } from "@mui/material";
import FilterComponent from "./FilterComponent";
import BuildingsList from "../components/BuildingList";
import RoomsList from "../components/RoomList";
import { FilterRequest, Room, RoomControllerApi, RoomFilterRequest } from "../services/openapi";
import RoomListView from "../views/RoomListView";

const modes = {
    ROOMS: "rooms",
    FILTERED_ROOMS: "filteredRoomsMode",
    ALL_ROOMS: "allRooms",
    BUILDINGS_WITH_ROOMS: "buildingsWithRooms",
    BUILDINGS_ONLY: "buildingsOnly"
}


const Home = () => {


    const roomApi = new RoomControllerApi();
    const [displayMode, setDisplayMode] = useState(modes.ROOMS)
    const [displayedRoomsList , setDisplayedRoomsList] = useState<Room[]>([])

    // Instantiate the API

    const handleFormSubmit = (values: RoomFilterRequest) => {
        // Use the values from the form to make the API request

        const requestParameters: FilterRequest = {
            roomFilterRequest: values,
        };
        console.log("przekazano")
        console.log(requestParameters)
        roomApi.filter(requestParameters)
            .then(response => {
                // Handle the response here
                setDisplayedRoomsList(response)
                console.log(response);
            })
            .catch(error => {
                // Handle the error here
                console.error(error);
            });
    };
    return (
        <div>
            <header>
                <Typography variant="h4">Nasz Serwis</Typography>
                <Button variant="contained" color="primary">
                    Zaloguj
                </Button>
            </header>

            <FilterComponent onFormSubmit={handleFormSubmit} />

            <RoomListView
                rooms={displayedRoomsList}
                onRoomSelect={(room) => {
                    console.log("You selected room number: ", room.number);
                }}
            />
            <BuildingsList />
            <RoomsList />

        </div>

    );
};

export default Home;
