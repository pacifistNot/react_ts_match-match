import React from "react";

interface CardProps {
  value: string;
  isOpen: boolean;
  isMatched: boolean;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ value, isOpen, isMatched, onClick }) => {
  const cardClass = `card ${isOpen ? "open" : ""} ${
    isMatched ? "matched" : ""
  }`;

  return (
    <div className={cardClass} onClick={onClick}>
      {isOpen || isMatched ? value : "?"}
    </div>
  );
};

export default Card;
