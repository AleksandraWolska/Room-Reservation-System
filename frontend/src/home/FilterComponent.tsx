import React, { useState, ChangeEvent } from 'react';
import { RoomFilterRequest } from '../services/openapi';
import { RoomFilterRequestRoomTypeEnum } from '../services/openapi';
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Button,
  SelectChangeEvent,
} from '@mui/material';

// interface Room {
//   from: string;
//   to: string;
//   buildingName: string;
//   roomType: string;
//   isProjector: boolean;
//   minPlaces: number;
//   maxPlaces: number;
// }

export const FilterComponent: React.FC<{}> = () => {
  const [formValues, setFormValues] = useState<RoomFilterRequest>({
    from: undefined,
    to: undefined,
    buildingName: undefined,
    roomType: undefined,
    isProjector: false,
    minPlaces: undefined,
    maxPlaces: undefined,
  });

  const handleChange = (event: any) => {
    const { name, value, type, checked } = event.target;

    const fieldValue = type === 'checkbox' ? checked : value;

    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: fieldValue,
    }));
  };


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log(formValues);
    // Here, you can send the form values to an API or perform any other necessary actions

    // Reset the form values if needed
    setFormValues({
        from: undefined,
        to: undefined,
        buildingName: RoomFilterRequestRoomTypeEnum.LectureRoom,
        roomType: undefined,
        isProjector: false,
        minPlaces: undefined,
        maxPlaces: undefined,
    });
  };

  return (
    <div>
      <h1>Filter</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          id="from"
          name="from"
          label="From"
          type="datetime-local"
          value={formValues.from}
          onChange={handleChange}
        />
        <TextField
          id="to"
          name="to"
          label="To"
          type="datetime-local"
          value={formValues.to}
          onChange={handleChange}
        />
        <TextField
          id="buildingName"
          name="buildingName"
          label="Building Name"
          value={formValues.buildingName}
          onChange={handleChange}
        />

        <FormControl>
          <InputLabel id="roomType-label">Room Type</InputLabel>
          <Select
            id="roomType"
            name="roomType"
            labelId="roomType-label"
            value={formValues.roomType}
            onChange={handleChange}
          >
            <MenuItem value={RoomFilterRequestRoomTypeEnum.LectureRoom}>Sala wykładowa</MenuItem>
            {/* Add more options if there are other types of rooms */}
          </Select>
        </FormControl>

        <FormControlLabel
          control={
            <Checkbox
              id="isProjector"
              name="isProjector"
              checked={formValues.isProjector}
              onChange={handleChange}
            />
          }
          label="Is Projector"
        />

        <TextField
          id="minPlaces"
          name="minPlaces"
          label="Minimum Places"
          type="number"
          value={formValues.minPlaces}
          onChange={handleChange}
        />
        <TextField
          id="maxPlaces"
          name="maxPlaces"
          label="Maximum Places"
          type="number"
          value={formValues.maxPlaces}
          onChange={handleChange}
        />

        <Button type="submit" variant="contained" color="primary">
          Szukaj
        </Button>
      </form>
    </div>
  );
};

export default FilterComponent;
