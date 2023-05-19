import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './home/Home';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
// date-fns
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { UserReservations } from './user/UserReservations';
import { User } from './services/openapi';

enum View {
    Home,
    Reservations
}

function App() {

    const templateUser: User = {
        id: 1,
        firstname: "John",
        lastname: "Doe",
        email: "johndoe@example.com",
    };

    const [userId, setUserId] = useState(1)
    const [userData, setUserData] = useState<User>(templateUser)
    const [currentView, setCurrentView] = useState<View>(View.Home)

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <div className="App">
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            BOOKING SYSTEM
                        </Typography>
                        {userData.id ?
                            <>
                                <Button color="inherit" variant={currentView === View.Home ? "outlined" : "text"} onClick={() => setCurrentView(View.Home)}>Explore</Button>
                                <Button color="inherit" variant={currentView === View.Reservations ? "outlined" : "text"} onClick={() => setCurrentView(View.Reservations)}>My Reservations</Button>
                                <Button color="inherit">Log Out</Button>
                            </>
                            :
                            <Button color="inherit">Log In</Button>
                        }
                    </Toolbar>
                </AppBar>
                {currentView === View.Home && <Home userId={userId}/>}
                {currentView === View.Reservations && <UserReservations userID={userId}/>}
            </div>
        </LocalizationProvider>
    );
}

export default App;
