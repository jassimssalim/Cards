import React, { useState, useEffect } from 'react';
import './Card.css'; // Import the CSS file

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

const Card: React.FC = () => {
  const questions: Question[] = [
    { id: 1, question: 'What is the capital of France?', options: ['Paris', 'London', 'Berlin', 'Rome'], correctAnswer: 'Paris' },
    { id: 2, question: 'Which planet is closest to the Sun?', options: ['Earth', 'Venus', 'Mercury', 'Mars'], correctAnswer: 'Mercury' },
    { id: 3, question: 'What is the largest ocean?', options: ['Atlantic', 'Indian', 'Arctic', 'Pacific'], correctAnswer: 'Pacific' },
    { id: 4, question: 'Who wrote "Hamlet"?', options: ['Shakespeare', 'Dickens', 'Hemingway', 'Tolstoy'], correctAnswer: 'Shakespeare' },
    { id: 5, question: 'Which is the fastest land animal?', options: ['Cheetah', 'Lion', 'Horse', 'Elephant'], correctAnswer: 'Cheetah' },
  ];

  const [answers, setAnswers] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    const savedAnswers = localStorage.getItem('quizAnswers');
    if (savedAnswers) {
      setAnswers(JSON.parse(savedAnswers));
    }
  }, []);

  const handleAnswerChange = (questionId: number, answer: string) => {
    const newAnswers = { ...answers, [questionId]: answer };
    setAnswers(newAnswers);
    localStorage.setItem('quizAnswers', JSON.stringify(newAnswers));
    console.log(newAnswers)
  };

  return (
    <div className="quiz-container">
      <h1>Quiz</h1>
      {questions.map((question) => (
        <div className="question-container" key={question.id}>
          <h3 className="question">{question.question}</h3>
          <div className="options">
            {question.options.map((option) => (
              <div key={option}>
                <input
                  type="radio"
                  id={`question-${question.id}-${option}`}
                  name={`question-${question.id}`}
                  value={option}
                  checked={answers[question.id] === option}
                  onChange={() => handleAnswerChange(question.id, option)}
                />
                <label htmlFor={`question-${question.id}-${option}`}>{option}</label>
              </div>
            ))}
          </div>
        </div>
      ))}
      <button className="reset-button" onClick={() => { 
        localStorage.clear(); 
        setAnswers({}); 
      }}>Reset Answers</button>
    </div>
  );
};

export default Card;
