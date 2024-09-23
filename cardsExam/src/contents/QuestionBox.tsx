import React from 'react';
import './QuestionBox.css';

interface QuestionBoxProps {
  questionId: number;
  questionText: string;
  onSelect: (id: number) => void;
  isActive: boolean; // New prop to indicate active state
}

const QuestionBox: React.FC<QuestionBoxProps> = ({ questionId, questionText, onSelect, isActive }) => {
  return (
    <div 
      className={`question-box ${isActive ? 'active' : ''}`} 
      onClick={() => onSelect(questionId)}
    >
      {questionText}
    </div>
  );
};

export default QuestionBox;
