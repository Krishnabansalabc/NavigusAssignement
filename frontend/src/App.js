import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';
import Navbar from './components/Navbar'
import Landing from './components/Landing'
import Login from './components/Login'
import Register from './components/signup';

function App() {
  return (

    <Router>
      <div className="App">
        <Navbar />
        <Route exact path='/' component={Landing} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />

      </div>
    </Router>


  );
}

export default App;
