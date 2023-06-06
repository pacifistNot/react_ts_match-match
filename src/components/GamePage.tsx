import React, { useState, useEffect, useRef } from "react";
import { Button, Space, Row, Col } from "antd";
import GameBoard from "../components/GameBoard";
import Card from "../components/Card";

interface CardData {
  id: number;
  value: string;
  isOpen: boolean;
  isMatched: boolean;
}

interface GamePageProps {
  difficulty: string;
}

const GamePage: React.FC<GamePageProps> = ({ difficulty }) => {
  const [cards, setCards] = useState<CardData[]>([]);
  const [time, setTime] = useState(0);
  const [openCards, setOpenCards] = useState<CardData[]>([]);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimer = () => {
    setTime(0);
  };

  useEffect(() => {
    generateCards();
    resetTimer();
  }, [difficulty]);

  useEffect(() => {
    if (cards.every((card) => card.isMatched)) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  }, [cards]);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (!isPaused) {
        setTime((time) => time + 1);
      }
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPaused]);

  const generateCards = () => {
    let pairCount = 0;

    if (difficulty === "Easy") {
      pairCount = 4;
    } else if (difficulty === "Medium") {
      pairCount = 6;
    } else if (difficulty === "Hard") {
      pairCount = 8;
    }

    const values = ["A", "B", "C", "D", "E", "F", "G", "H"];
    const initialCards: CardData[] = [];

    for (let i = 0; i < pairCount; i++) {
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
          }, 1000);
        }
      }
    }
  };

  const handlePausedGame = () => {
    setIsPaused(!isPaused);
  };

  // const handleNewGame = () => {
  //   resetTimer();
  //   generateCards();
  // };

  return (
    <div className="game">
      <div className="game__header">
        <div className="game__time">Time: {time} sec</div>
      </div>
      <GameBoard>
        <Space size="small" wrap>
          <Row gutter={[24, 24]}>
            {cards.map((card) => (
              <Col span={6} key={card.id}>
                <Card
                  key={card.id}
                  value={
                    card.value === "A"
                      ? require("../img/A.png")
                      : card.value === "B"
                      ? require("../img/B.png")
                      : card.value === "C"
                      ? require("../img/C.png")
                      : card.value === "D"
                      ? require("../img/D.png")
                      : card.value === "E"
                      ? require("../img/E.png")
                      : card.value === "F"
                      ? require("../img/F.png")
                      : card.value === "G"
                      ? require("../img/G.png")
                      : card.value === "H"
                      ? require("../img/H.png")
                      : card.value
                  }
                  isOpen={card.isOpen}
                  isMatched={card.isMatched}
                  onClick={() => handleCardClick(card)}
                />
              </Col>
            ))}
          </Row>
        </Space>
      </GameBoard>
      <Button type="primary" onClick={handlePausedGame}>
        {isPaused ? "Продолжить" : "Пауза"}
      </Button>
      {/* <Button onClick={handleNewGame}>Новая игра</Button> */}
    </div>
  );
};

export default GamePage;
