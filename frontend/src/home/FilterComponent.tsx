import React, { useState, ChangeEvent } from 'react';
import { RoomControllerApi, RoomFilterRequest, RoomFilterRequestRoomTypeEnum } from '../services/openapi';
import { TextField, FormControl, InputLabel, Select, MenuItem, Checkbox, FormControlLabel, Button } from '@mui/material';

interface FilterComponentProps {
    onFormSubmit: (values: RoomFilterRequest) => void;
}

// The initial state of the form
const initialState: RoomFilterRequest = {};

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

const resettingState: RoomFilterRequest = {
    from: undefined,
    to: undefined,
    buildingName: undefined,
    roomType: undefined,
    isProjector: undefined,
    minPlaces: undefined,
    maxPlaces: undefined,
};

export const FilterComponent: React.FC<FilterComponentProps> = ({ onFormSubmit }) => {
    const { formValues, setFormValues, handleInputChange, handleSelectChange, handleCheckboxChange } = useFormFields(initialState);

    const handleSubmit = (event: any) => {
        event.preventDefault();
        onFormSubmit(formValues);
    };

    const handleReset = () => {
        setFormValues({...resettingState});
        setFormValues(initialState);

        console.log(formValues)
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
                        <MenuItem onClick={() => setFormValues(prevState => ({
                            ...(Object.fromEntries(
                                Object.entries(prevState).filter(([key]) => key !== "roomType")
                            ))}))}>None</MenuItem>
                        <MenuItem value={RoomFilterRequestRoomTypeEnum.ComputersRoom}>Computer Room</MenuItem>
                        <MenuItem value={RoomFilterRequestRoomTypeEnum.Office}>Office</MenuItem>
                        <MenuItem value={RoomFilterRequestRoomTypeEnum.Workshop}>Workshop</MenuItem>
                        <MenuItem value={RoomFilterRequestRoomTypeEnum.ChemistryLaboratory}>Chemistry Lab</MenuItem>
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
                <Button type="button" variant="contained" color="secondary" onClick={handleReset}>
                Reset
            </Button>
            </form>
        </div>
    );
};

export default FilterComponent;