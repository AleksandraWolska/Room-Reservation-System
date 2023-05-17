import React, { useState, ChangeEvent } from 'react';
import { RoomControllerApi, RoomFilterRequest, RoomFilterRequestRoomTypeEnum } from '../services/openapi';
import { TextField, FormControl, InputLabel, Select, MenuItem, Checkbox, FormControlLabel, Button } from '@mui/material';

interface FilterComponentProps {
    onFormSubmit: (values: RoomFilterRequest) => void;
}

// The initial state of the form
const initialState: RoomFilterRequest = {
};

const useFormFields = (initialState: RoomFilterRequest) => {
    const [formValues, setFormValues] = useState<RoomFilterRequest>(initialState);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormValues(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSelectChange = (event: any) => {
        const { name, value } = event.target;
        if (name)
            setFormValues(prevState => ({ ...prevState, [name]: value }));
    };

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = event.target;
        setFormValues(prevState => ({ ...prevState, [name]: checked }));
    };

    return { formValues, setFormValues, handleInputChange, handleSelectChange, handleCheckboxChange };
};

export const FilterComponent: React.FC<FilterComponentProps> = ({ onFormSubmit }) => {
    const { formValues, setFormValues, handleInputChange, handleSelectChange, handleCheckboxChange } = useFormFields(initialState);

    const handleSubmit = (event: any) => {
        event.preventDefault();

        // Pass the form values to the parent component
        onFormSubmit(formValues);

        // Reset the form values
        setFormValues(initialState);
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
                    onChange={handleInputChange}
                />
                <TextField
                    id="to"
                    name="to"
                    label="To"
                    type="datetime-local"
                    value={formValues.to}
                    onChange={handleInputChange}
                />
                <TextField
                    id="buildingName"
                    name="buildingName"
                    label="Building Name"
                    value={formValues.buildingName}
                    onChange={handleInputChange}
                />

                <FormControl>
                    <InputLabel id="roomType-label">Room Type</InputLabel>
                    <Select
                        id="roomType"
                        name="roomType"
                        labelId="roomType-label"
                        value={formValues.roomType}
                        onChange={handleSelectChange}
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
                            onChange={handleCheckboxChange}
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
                    onChange={handleInputChange}
                />
                <TextField
                    id="maxPlaces"
                    name="maxPlaces"
                    label="Maximum Places"
                    type="number"
                    value={formValues.maxPlaces}
                    onChange={handleInputChange}
                />

                <Button type="submit" variant="contained" color="primary">
                    Szukaj
                </Button>
            </form>
        </div>
    );
};

export default FilterComponent;