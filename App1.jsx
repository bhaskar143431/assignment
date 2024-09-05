import React, { useState } from 'react';
import WelcomeScreen from './WelcomeScreen';
import Survey from './Survey';
import './Survey.css';

const App1 = () => {
  const [surveyStarted, setSurveyStarted] = useState(false);
  const [surveyCompleted, setSurveyCompleted] = useState(false);

  const startSurvey = () => {
    setSurveyStarted(true);
  };

  const completeSurvey = () => {
    if (window.confirm('Do you want to submit the survey?')) {
      localStorage.setItem('surveyStatus', 'COMPLETED');
      setSurveyCompleted(true);
      setTimeout(() => {
        setSurveyCompleted(false);
        setSurveyStarted(false);
      }, 5000);
    }
  };

  return (
    <div className="app-container">
      {surveyCompleted ? (
        <div className="thank-you-screen">
          <h1>Thank you for your time!</h1>
        </div>
      ) : surveyStarted ? (
        <Survey onComplete={completeSurvey} />
      ) : (
        <WelcomeScreen startSurvey={startSurvey} />
      )}
    </div>
  );
};

export default App1;
