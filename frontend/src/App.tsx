import React from 'react';
import logo from './logo.svg';
import './App.css';
import LoginPage from './login/LoginPage';
import ListComponent from './components/ListComponent';
import RoomsList from './components/RoomList';
import BuildingsList from './components/BuildingList';
import FilterComponent from './home/FilterComponent';

function App() {
  return (
    <div className="App">

      {/* <LoginPage /> */}
<FilterComponent />
<BuildingsList />
<RoomsList />
      {/* <ListComponent /> */}
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
