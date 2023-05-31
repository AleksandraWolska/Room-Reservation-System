import React, { useEffect, useState } from 'react';
import './App.css';
import Home from './home/Home';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { UserReservations } from './user/UserReservations';
import { User, UserControllerApi } from './services/openapi';
import { RegistrationForm } from './user/RegistrationForm';
import axios from 'axios';


enum View {
    Home,
    Reservations,
    Registration
}

function App() {

    // const templateUser: User = {
    //     id: 1,
    //     firstname: "John",
    //     lastname: "Doe",
    //     email: "johndoe@example.com",
    // };



    const [userData, setUserData] = useState<User | undefined>(undefined)
    const [currentView, setCurrentView] = useState<View>(View.Home)
    const [login, setLogin] = useState<any>()

    const api = new UserControllerApi();

    const handleLogin = async (event: any) => {
        event.preventDefault();

        const response = await axios.get('http://localhost:8080/login')

        setLogin(response.data)
        console.log(response.data);
    };

    const handleLogout = async (event: any) => {
        event.preventDefault();

        const response = await axios.get('http://localhost:8080/logout')

        setUserData(undefined)
        window.location.reload()
    };


    useEffect(() => {
        api.current().then(user => {
            setUserData(user);
        }).catch(error => {
            console.error('Failed to fetch current user', error);
        });
    }, []);


    return (

        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <div className="App">
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} onClick={() => window.location.reload()}>
                            BOOKING SYSTEM
                        </Typography>
                        {userData !== undefined ?
                            <>
                                <Button color="inherit" variant={currentView === View.Home ? "outlined" : "text"} onClick={() => setCurrentView(View.Home)}>Explore</Button>
                                <Button color="inherit" variant={currentView === View.Reservations ? "outlined" : "text"} onClick={() => setCurrentView(View.Reservations)}>My Reservations</Button>
                                <Button color="inherit" onClick={handleLogout}>Log Out</Button>
                            </>
                            :
                            <>
                                <Button color="inherit" variant={currentView === View.Registration ? "outlined" : "text"} onClick={() => setCurrentView(View.Registration)}>Register</Button>
                                <Button color="inherit" onClick={handleLogin}>Log In</Button>
                            </>
                        }
                    </Toolbar>
                </AppBar>
                {currentView === View.Home && <Home userId={userData?.id!} />}
                {currentView === View.Reservations && <UserReservations user={userData} />}
                {currentView === View.Registration && <RegistrationForm />}
            </div>
        </LocalizationProvider>
    );
}

export default App;
