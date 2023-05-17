import { Button, List, ListItem, ListItemText, Typography } from "@mui/material";
import { Room } from "../services/openapi";

interface RoomListProps {
  rooms: Room[];
  onRoomSelect: (room: Room) => void;
}

const RoomListView: React.FC<RoomListProps> = ({ rooms, onRoomSelect }) => {
  return (
    <List>
      {rooms.map((room) => (
        <ListItem key={room.id} divider>
          <ListItemText
            primary={
              <>
                <Typography variant="h6">{`Room Number: ${room.number}`}</Typography>
                <Typography variant="subtitle1">{`Floor: ${room.floor}`}</Typography>
                <Typography variant="subtitle1">{`Building: ${room.building?.name}`}</Typography>
                <Typography variant="subtitle1">{`Places: ${room.places}`}</Typography>
                <Typography variant="subtitle1">{`Type: ${room.roomType}`}</Typography>
                <Typography variant="subtitle1">{`Projector: ${room.projector ? "Yes" : "No"}`}</Typography>
              </>
            }
          />
          <Button variant="outlined" color="primary" onClick={() => onRoomSelect(room)}>
            Select
          </Button>
        </ListItem>
      ))}
    </List>
  );
};

export default RoomListView;
