import React, { useState, useEffect } from "react";
import { Button } from "antd";
import GameBoard from "../components/GameBoard";
import Card from "../components/Card";

interface CardData {
  id: number;
  value: string;
  isOpen: boolean;
  isMatched: boolean;
}

const GamePage: React.FC = () => {
  const [cards, setCards] = useState<CardData[]>([]);
  const [time, setTime] = useState(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [openCards, setOpenCards] = useState<CardData[]>([]);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    generateCards();
  }, []);

  useEffect(() => {
    if (cards.every((card) => card.isMatched)) {
      clearInterval(intervalId!);
    }
  }, [cards, intervalId]);

  const generateCards = () => {
    const values = ["A", "B", "C", "D", "E", "F", "G", "H"];
    const initialCards: CardData[] = [];

    for (let i = 0; i < 4; i++) {
      initialCards.push({
        id: i * 2,
        value: values[i],
        isOpen: false,
        isMatched: false,
      });
      initialCards.push({
        id: i * 2 + 1,
        value: values[i],
        isOpen: false,
        isMatched: false,
      });
    }

    const shuffledCards = initialCards.sort(() => Math.random() - 0.5);

    setCards(shuffledCards);
  };

  const handleCardClick = (card: CardData) => {
    if (isPaused) {
      return;
    }
    if (!card.isOpen && !card.isMatched && openCards.length < 2) {
      const updatedCards = cards.map((c) =>
        c.id === card.id ? { ...c, isOpen: true } : c
      );
      setCards(updatedCards);

      setOpenCards([...openCards, card]);

      if (openCards.length === 1) {
        if (card.value === openCards[0].value) {
          setTimeout(() => {
            const updatedCards = cards.map((c) =>
              c.id === card.id || c.id === openCards[0].id
                ? { ...c, isOpen: false, isMatched: true }
                : c
            );
            setCards(updatedCards);
            setOpenCards([]);
          }, 500);
        } else {
          setTimeout(() => {
            const updatedCards = cards.map((c) =>
              c.id === card.id || c.id === openCards[0].id
                ? { ...c, isOpen: false }
                : c
            );
            setCards(updatedCards);
            setOpenCards([]);
          }, 1500);
        }
      }
    }
  };

  useEffect(() => {
    const id: NodeJS.Timeout = setInterval(() => {
      if (!isPaused) {
        setTime((time) => time + 1);
      }
    }, 1000);

    setIntervalId(id);

    return () => {
      clearInterval(id);
    };
  }, [isPaused]);

  const handlePausedGame = () => {
    setIsPaused(!isPaused);
  };

  return (
    <div className="game">
      <div className="game__header">
        <div className="game__time">Time: {time} sec</div>
      </div>
      <GameBoard>
        {cards.map((card) => (
          <Card
            key={card.id}
            value={card.value}
            isOpen={card.isOpen}
            isMatched={card.isMatched}
            onClick={() => handleCardClick(card)}
          />
        ))}
      </GameBoard>
      <Button type="primary" onClick={handlePausedGame}>
        {isPaused ? "Продолжить" : "Пауза"}
      </Button>
    </div>
  );
};

export default GamePage;
