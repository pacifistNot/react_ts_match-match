import React from "react";
import backImg from "../img/back.png";

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

  return (
    <div className="card" onClick={onClick}>
      {content}
    </div>
  );
};

export default Card;
