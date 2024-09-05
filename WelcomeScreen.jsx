import React from 'react';
import './Survey.css';

const WelcomeScreen = ({ startSurvey }) => (
  <div className="welcome-screen">
    <h1>Welcome to the Customer Survey</h1>
    <button onClick={startSurvey} style={{"background-color":"red"}}>Start</button>
  </div>
);

export default WelcomeScreen;