import React from 'react';
import { RoomControllerApi, RoomFilterRequest, RoomFilterRequestRoomTypeEnum } from '../services/openapi';
import { Field, Form, Formik } from 'formik';
import { Button, Checkbox, FormControl, FormControlLabel, FormHelperText, Grid, InputLabel, MenuItem } from '@mui/material';
import { TextField, Select } from 'formik-material-ui';

interface FilterComponentProps {
    onFormSubmit: (values: RoomFilterRequest) => void;
}

export const FilterComponent: React.FC<FilterComponentProps> = ({ onFormSubmit }) => {
    return (
        <div>
            <h1>Filter</h1>
            <Formik
                initialValues={{
                    from: '',
                    to: '',
                    buildingName: '',
                    roomType: '',
                    isProjector: false,
                    minPlaces: '',
                    maxPlaces: '',
                }}
                onSubmit={(values) => {

                    let modifiedValues: RoomFilterRequest = {}


                    if (values["from"] !== '') modifiedValues = { ...modifiedValues, from: new Date(values["from"]) }
                    if (values["to"] !== '') modifiedValues = { ...modifiedValues, to: new Date(values["to"]) }
                    if (values["buildingName"] !== '') modifiedValues = { ...modifiedValues, buildingName: values["buildingName"] }
                    //@ts-ignore
                    if (values["roomType"] !== '') modifiedValues = { ...modifiedValues, roomType: values["roomType"] }
                    if (values["isProjector"]) modifiedValues = { ...modifiedValues, isProjector: true }
                    if (values["maxPlaces"] !== '') modifiedValues = { ...modifiedValues, maxPlaces: parseInt(values["maxPlaces"]) }
                    if (values["minPlaces"] !== '') modifiedValues = { ...modifiedValues, minPlaces: parseInt(values["minPlaces"]) }

                    onFormSubmit(modifiedValues);
                }}
            >

                <Form>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Field
                                component={TextField}
                                fullWidth
                                id="from"
                                name="from"
                                label="From"
                                type="datetime-local"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Field
                                component={TextField}
                                fullWidth
                                id="to"
                                name="to"
                                label="To"
                                type="datetime-local"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Field
                                component={TextField}
                                fullWidth
                                id="buildingName"
                                name="buildingName"
                                label="Building Name"
                            />
                        </Grid>


                        <Grid item xs={12}>
                            <Field
                                component={Select}
                                fullWidth
                                id="roomType"
                                name="roomType"
                                label="Room Type"
                            >
                                <MenuItem value={RoomFilterRequestRoomTypeEnum.ComputersRoom}>Computer Room</MenuItem>
                                <MenuItem value={RoomFilterRequestRoomTypeEnum.Office}>Office</MenuItem>
                                <MenuItem value={RoomFilterRequestRoomTypeEnum.Workshop}>Workshop</MenuItem>
                                <MenuItem value={RoomFilterRequestRoomTypeEnum.ChemistryLaboratory}>Chemistry Lab</MenuItem>
                            </Field>
                        </Grid>
                        <Grid item xs={12}>
                            <Field
                                name="isProjector"
                                type="checkbox"
                                as={FormControlLabel}
                                control={<Checkbox />}
                                label="Is Projector"
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Field
                                component={TextField}
                                fullWidth
                                id="minPlaces"
                                name="minPlaces"
                                label="Minimum Places"
                                type="number"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Field
                                component={TextField}
                                fullWidth
                                id="maxPlaces"
                                name="maxPlaces"
                                label="Maximum Places"
                                type="number"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button fullWidth type="submit" variant="contained" color="primary">
                                Szukaj
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button fullWidth type="reset" variant="contained" color="secondary">
                                Reset
                            </Button>
                        </Grid>
                    </Grid>
                </Form>
            </Formik>
        </div>
    );
};

export default FilterComponent;
