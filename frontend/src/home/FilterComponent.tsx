import React, { useState, ChangeEvent } from 'react';
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Button,
} from '@mui/material';

interface FilterValues {
  from: string;
  to: string;
  buildingName: string;
  roomType: string;
  isProjector: boolean;
  minPlaces: number;
  maxPlaces: number;
}

export const FilterComponent: React.FC<{}> = () => {
  const [formValues, setFormValues] = useState<FilterValues>({
    from: '',
    to: '',
    buildingName: '',
    roomType: '',
    isProjector: false,
    minPlaces: 0,
    maxPlaces: 0,
  });

  const handleChange = (event: ChangeEvent<{ value: unknown; name?: string }>) => {
    const { name, value } = event.target;

    setFormValues((prevValues) => ({
      ...prevValues,
      [name as string]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formValues);
    // Here, send request to API with form values
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
          >
            <MenuItem value="LECTURE_ROOM">Sala wykładowa</MenuItem>
            {/* to add */}
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
