import React from "react";
import { Button, Typography } from "@mui/material";
import FilterComponent from "./FilterComponent";
import BuildingsList from "../components/BuildingList";
import RoomsList from "../components/RoomList";
import { FilterRequest, RoomControllerApi, RoomFilterRequest } from "../services/openapi";

const Home = () => {


    
    // Instantiate the API
  const roomApi = new RoomControllerApi();

  const handleFormSubmit = (values: RoomFilterRequest) => {
    // Use the values from the form to make the API request

    const requestParameters: FilterRequest = {
        request: values,
      };
    console.log("przekazano")
    console.log(requestParameters)
    roomApi.filter(requestParameters)
      .then(response => {
        // Handle the response here
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

    <FilterComponent onFormSubmit={handleFormSubmit}/>
<BuildingsList />
<RoomsList />

    </div>

  );
};

export default Home;
