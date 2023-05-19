import React from 'react';
import logo from './logo.svg';
import './App.css';
import LoginPage from './login/LoginPage';
import ListComponent from './components/ListComponent';
import RoomsList from './components/RoomList';
import BuildingsList from './components/BuildingList';
import FilterComponent from './home/FilterComponent';
import Home from './home/Home';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// date-fns
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';


function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className="App">
        <Home />
      </div>
    </LocalizationProvider>
  );
}

export default App;
