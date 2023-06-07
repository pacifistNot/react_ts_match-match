import React from "react";
import backImg from "../img/back.png";
import "../scss/style.css";

interface CardProps {
  value: string;
  isOpen: boolean;
  isMatched: boolean;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ value, isOpen, isMatched, onClick }) => {
  const imageSource = value === "back" ? backImg : value;
  const content =
    isOpen || isMatched ? (
      <img className="card__img" src={imageSource} alt="" />
    ) : (
      <img className="card__img" src={backImg} alt="" />
    );

  const handleClick = () => {
    if (!isOpen && !isMatched) {
      onClick();
    }
  };

  return (
    <div className={`card ${isOpen ? "open" : ""}`} onClick={handleClick}>
      <div className="card__content">{content}</div>
    </div>
  );
};

export default Card;
