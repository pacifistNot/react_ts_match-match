import React from "react";
import backImg from "../img/back.png";

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
      {isOpen || isMatched ? (
        value
      ) : (
        <img className="card__img" src={backImg} alt="Card Back" />
      )}
    </div>
  );
};

export default Card;
