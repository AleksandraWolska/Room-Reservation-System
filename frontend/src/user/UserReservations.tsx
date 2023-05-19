import React, { useEffect, useState } from 'react';
import { ReservationControllerApi, AllByUserIdRequest, Reservation } from '../services/openapi';
import { Typography, List, ListItem, ListItemText, Divider } from '@mui/material';

interface UserReservationsProps {
  userID: number;
}

export const UserReservations: React.FC<UserReservationsProps> = ({ userID }) => {
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    const reservationApi = new ReservationControllerApi();
    const fetchReservations = async () => {

        const request : AllByUserIdRequest = {
            userId: userID
        }
      const reservationsResponse = await reservationApi.allByUserId(request);
      setReservations(reservationsResponse);
    };

    fetchReservations();
  }, [userID]);

  return (
    <div>
      <Typography variant="h4">Rezerwacje użytkownika</Typography>
      <List>
        {reservations.map(reservation => (
          <div key={reservation.id}>
            <ListItem>
              <ListItemText
                primary={`Reservation from ${reservation.reservedFrom?.toLocaleDateString()} to ${reservation.reservedTo?.toLocaleDateString()}`}
                secondary={`Room ${reservation.room?.number}, Floor: ${reservation.room?.floor}, Building: ${reservation.room?.building?.name}`}
              />
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
    </div>
  );
};
