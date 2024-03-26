import './App.css';
import DialPad from './components/DialPad/DialPad';
import CallogHistory from './components/CallogHistory/CallogHistory';
import CallSession from './components/CallSession/CallSession';
import NavigationHeader from './components/NavigationHeader/NavigationHeader';

import {BrowserRouter as Router, Route, Redirect, Switch  } from 'react-router-dom'
import { useState } from 'react';

function App() {
  const [phoneNumber, setPhoneNumber] = useState('');
  
  return (
    <Router>
      <NavigationHeader/>

      <Switch>
        <Route path='/' exact>
          <DialPad phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber}/>
        </Route>

        <Route path='/callog-history' exact>
          <CallogHistory />
        </Route>

        <Route path='/call-session' exact>
          <CallSession phoneNumber={phoneNumber}/>
        </Route>

        <Redirect to='/' />
      </Switch>
    </Router>
  );
}

export default App;
