import React from 'react';

import './App.css';
import Home from './Home';
import ConditionView from './components/conditions/ConditionView';
function App() {
  return (
    <div className="App">
      <h2>Welcome to our front-end</h2>
     <Home/>
     <ConditionView/>
    </div>
  );
}

export default App;
