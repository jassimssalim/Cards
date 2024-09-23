import React from 'react';
import './QuestionDetail.css';

interface Question {
  id: number;
  text: string;
  choices: string[];
}

interface QuestionDetailProps {
  question: Question;
  selectedAnswer?: string;
  onAnswerSelect: (questionId: number, answer: string) => void;
}

const QuestionDetail: React.FC<QuestionDetailProps> = ({ question, selectedAnswer, onAnswerSelect }) => {
  return (
    <div className="question-detail">
      <h2>{question.text}</h2>
      <h3>Choices:</h3>
      <ul>
        {question.choices.map((choice) => (
          <li 
            key={choice} 
            onClick={() => onAnswerSelect(question.id, choice)} 
            style={{ 
              cursor: 'pointer', 
              fontWeight: selectedAnswer === choice ? 'bold' : 'normal',
              backgroundColor: selectedAnswer === choice ? '#d1e7dd' : 'transparent',
            }}
          >
            {choice}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionDetail;
