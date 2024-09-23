import React, { useState, useEffect } from 'react';
import QuestionBox from './contents/QuestionBox';
import QuestionDetail from './contents/QuestionDetail';
import './App.css';

const App: React.FC = () => {
  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});

  const questions = [
    { 
      id: 1, 
      text: 'What is the capital of France?', 
      choices: ['Paris', 'London', 'Berlin', 'Rome'] 
    },
    { 
      id: 2, 
      text: 'Which planet is closest to the Sun?', 
      choices: ['Earth', 'Venus', 'Mercury', 'Mars'] 
    },
    { 
      id: 3, 
      text: 'What is the largest ocean?', 
      choices: ['Atlantic', 'Indian', 'Arctic', 'Pacific'] 
    },
    { 
      id: 4, 
      text: 'Who wrote "Hamlet"?', 
      choices: ['Shakespeare', 'Dickens', 'Hemingway', 'Tolstoy'] 
    },
    { 
      id: 5, 
      text: 'Which is the fastest land animal?', 
      choices: ['Cheetah', 'Lion', 'Horse', 'Elephant'] 
    },
  ];

  useEffect(() => {
    const savedAnswers = localStorage.getItem('answers');
    if (savedAnswers) {
      setSelectedAnswers(JSON.parse(savedAnswers));

      console.log(savedAnswers)
    }
  }, []);

  const handleQuestionSelect = (id: number) => {
    setSelectedQuestion(id);
  };

  const handleAnswerSelect = (questionId: number, answer: string) => {
    setSelectedAnswers((prev) => {
      const newAnswers = { ...prev, [questionId]: answer };
      localStorage.setItem('answers', JSON.stringify(newAnswers));
      return newAnswers;
    });
  };

  return (
    <div className="app-container">
      <div className="detail-section">
        {selectedQuestion !== null && (
          <QuestionDetail 
            question={questions.find(q => q.id === selectedQuestion)!} 
            selectedAnswer={selectedAnswers[selectedQuestion]}
            onAnswerSelect={handleAnswerSelect}
          />
        )}
      </div>
      <div className="questions-section">
        <h1>Quiz Questions</h1>
        {questions.map((question) => (
          <QuestionBox 
            key={question.id} 
            questionId={question.id} 
            questionText={`Question No. ${question.id}`} 
            onSelect={handleQuestionSelect}
            isActive={selectedQuestion === question.id} // Set active state
          />
        ))}
      </div>
    </div>
  );
};

export default App;
