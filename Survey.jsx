import React, { useState, useEffect } from 'react';
import './Survey.css';

const questions = [
  { id: 1, text: 'How satisfied are you with our products?' },
  { id: 2, text: 'How likely are you to recommend our products to others?' },
  { id: 3, text: 'How cost do you excepting?' },
  { id: 4, text: 'How like to buy our product?' },
  { id: 5, text: 'How give our product rate 1:5?' }
  // Add more questions here
];

const Survey = ({ onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [sessionId, setSessionId] = useState(null);

  useEffect(() => {
    const savedAnswers = JSON.parse(localStorage.getItem('surveyAnswers')) || {};
    setAnswers(savedAnswers);
    const savedSessionId = localStorage.getItem('sessionId') || generateSessionId();
    setSessionId(savedSessionId);
  }, []);

  const generateSessionId = () => {
    const id = `session-${Date.now()}`;
    localStorage.setItem('sessionId', id);
    return id;
  };

  const handleAnswer = (questionId, answer) => {
    const updatedAnswers = { ...answers, [questionId]: answer };
    setAnswers(updatedAnswers);
    localStorage.setItem('surveyAnswers', JSON.stringify(updatedAnswers));
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      onComplete();
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const skipQuestion = () => {
    nextQuestion();
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="survey-container">
      <div className="survey-header">
        Customer Survey
        <span className="survey-page-number">{currentQuestionIndex + 1}/{questions.length}</span>
      </div>
      <div className="survey-question">
        {currentQuestion.text}
      </div>
      <div className="rating-options">
        {[1, 2, 3, 4, 5].map((number) => (
          <button
            key={number}
            className={`rating-button ${answers[currentQuestion.id] === number ? 'selected' : ''}`}
            onClick={() => handleAnswer(currentQuestion.id, number)}
          >
            {number}
          </button>
        ))}
      </div>
      <div className="navigation-buttons">
        <button className="prev" onClick={prevQuestion} disabled={currentQuestionIndex === 0}>Prev</button>
        &nbsp; &nbsp; &nbsp; &nbsp;
        <button onClick={skipQuestion}>Skip</button>
        &nbsp; &nbsp; &nbsp; &nbsp;
        <button className="next" onClick={nextQuestion} disabled={currentQuestionIndex === questions.length +1}>Next</button>
      </div>
    </div>
  );
};

export default Survey;