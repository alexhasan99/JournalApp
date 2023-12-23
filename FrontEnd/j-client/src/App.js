// App.js
import React from 'react';
import {Routes, Route} from 'react-router-dom';
import './App.css';
import Home from './Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import ObservationView from './components/observation/ObservationView';
import Login from './Login';

function App () {
  return (
    
      <div className="App">
        <Routes>
          <Route path="/" element ={<Home/>} />
          <Route path="/observation" element={<ObservationView/>} />
          <Route path="/login" element={<Login/>} />
        </Routes>
      </div>
  );
};

export default App;
