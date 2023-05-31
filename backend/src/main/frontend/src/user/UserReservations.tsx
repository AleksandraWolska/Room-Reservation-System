import React, { useEffect, useState } from 'react';
import { Button, Typography, List, ListItem, ListItemText, Divider, Select, MenuItem, SelectChangeEvent, Box } from '@mui/material';
import { ReservationControllerApi, AllByUserIdRequest, Reservation, User } from '../services/openapi';

interface UserReservationsProps {
  user: User | undefined;
}

export const UserReservations: React.FC<UserReservationsProps> = ({ user }) => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [sortType, setSortType] = useState("0");

  const reservationApi = new ReservationControllerApi();


  useEffect(() => {
    const fetchReservations = async () => {
      const request: AllByUserIdRequest = {
        userId: user?.id!
      }
      const reservationsResponse = await reservationApi.allByUserId(request);
      setReservations(reservationsResponse);
    };

    fetchReservations();
  }, [user]);



  const deleteReservation = async (reservationId: number) => {
    try {
      const response = await reservationApi.delete1({ id: reservationId });
      console.log("Deleted reservation", response);
    } catch (error) {
      console.error("Failed to delete reservation", error);
    }
  };


  const sortReservations = () => {
    let sortedReservations;
    switch (sortType) {
      case "1":
        sortedReservations = [...reservations].sort((a, b) => a.room!.building!.name!.localeCompare(b.room!.building!.name!));
        break;
      case "2":
        sortedReservations = [...reservations].sort((a, b) => {
          const buildingComparison = a.room!.building!.name!.localeCompare(b.room!.building!.name!);
          if (buildingComparison === 0) {
            return (a.room?.number || 0) - (b.room?.number || 0);
          }
          return buildingComparison;
        });
        break;
      case "3":
        sortedReservations = [...reservations].sort((a, b) => a.reservedFrom!.getTime() - b.reservedFrom!.getTime());
        break;
      case "4":
      default:
        sortedReservations = [...reservations].sort((a, b) => b.reservedFrom!.getTime() - a.reservedFrom!.getTime());
        break;
    }
    setReservations(sortedReservations);
  };



  const handleSortChange = (event: SelectChangeEvent<string>) => {
    setSortType(event.target.value as string);
    sortReservations()

  };

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      width: '70%',
      alignItems: 'center',
      margin: '0 auto'
    }}>
      <Typography variant="h4" sx={{ textAlign: 'center', mb: 2 }}>{`${user?.firstname || "User"}'s Reservations`}</Typography>

      <Select value={sortType} onChange={handleSortChange} sx={{ alignSelf: 'center', width: '30%' }}>
        <MenuItem value="0" disabled>Select sort type</MenuItem>
        <MenuItem value="1">Building Name</MenuItem>
        <MenuItem value="2">Building Name and Room Number</MenuItem>
        <MenuItem value="3">Reserved From (Ascending)</MenuItem>
        <MenuItem value="4">Reserved From (Descending)</MenuItem>
      </Select>
      <List sx={{ mt: 3 }}>
        {reservations.map(reservation => (
          <Box key={reservation.id} sx={{ mb: 1 }}>
            <ListItem sx={{ bgcolor: 'background.paper', borderRadius: 1 }}>
              <ListItemText
                primary={`Reservation from ${new Date(reservation.reservedFrom || '').toLocaleString()} to ${new Date(reservation.reservedTo || '').toLocaleString()}`}
                secondary={`Room ${reservation.room?.number}, Floor: ${reservation.room?.floor}, Building: ${reservation.room?.building?.name}`}
              />
              {new Date() < new Date(reservation.reservedFrom || '') && (
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => deleteReservation(reservation.id!)}
                  sx={{ ml: 2 }}
                >
                  Delete
                </Button>
              )}
            </ListItem>
            <Divider />
          </Box>
        ))}
      </List>
    </Box>
  );
};
