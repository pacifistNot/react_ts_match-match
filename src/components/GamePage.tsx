import React, { useState, useEffect, useRef } from "react";
import { Button, Space, Row, Col, Modal } from "antd";
import GameBoard from "../components/GameBoard";
import Card from "../components/Card";
import AImage from "../img/A.png";
import BImage from "../img/B.png";
import CImage from "../img/C.png";
import DImage from "../img/D.png";
import EImage from "../img/E.png";
import FImage from "../img/F.png";
import GImage from "../img/G.png";
import HImage from "../img/H.png";

enum Difficulty {
  Easy = "Легкая",
  Medium = "Средняя",
  Hard = "Сложная",
}

interface ICard {
  id: number;
  value: string;
  isOpen: boolean;
  isMatched: boolean;
}

const GamePage: React.FC = () => {
  const [cards, setCards] = useState<ICard[]>([]);
  const [time, setTime] = useState(0);
  const [openCards, setOpenCards] = useState<ICard[]>([]);
  const [isPaused, setIsPaused] = useState(false);
  const [isGameFinished, setIsGameFinished] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [difficulty, setDifficulty] = useState(Difficulty.Easy);
  const [isPausedDefault, setIsPausedDefault] = useState(false);

  const imageMap: { [key: string]: string } = {
    A: AImage,
    B: BImage,
    C: CImage,
    D: DImage,
    E: EImage,
    F: FImage,
    G: GImage,
    H: HImage,
  };

  const handleDifficultyChange = (selectedDifficulty: Difficulty) => {
    setDifficulty(selectedDifficulty);
    setIsPaused(isPausedDefault);
  };

  const resetTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setTime(0);
    intervalRef.current = setInterval(() => {
      if (!isPaused) {
        setTime((time) => time + 1);
      }
    }, 1000);
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
      setIsGameFinished(true);
    } else {
      setIsGameFinished(false);
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

    if (difficulty === "Легкая") {
      pairCount = 4;
    } else if (difficulty === "Средняя") {
      pairCount = 6;
    } else if (difficulty === "Сложная") {
      pairCount = 8;
    }

    const values = ["A", "B", "C", "D", "E", "F", "G", "H"];
    const initialCards: ICard[] = [];

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

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const handleCardClick = async (card: ICard) => {
    if (isPaused) {
      return;
    }

    if (!card.isOpen && !card.isMatched && openCards.length < 2) {
      const updatedCards = cards.map((c) =>
        c.id === card.id ? { ...c, isOpen: true } : c
      );
      setCards(updatedCards);

      setOpenCards((prevOpenCards) => [...prevOpenCards, card]);

      if (openCards.length === 1) {
        if (card.value === openCards[0].value) {
          const updatedCards = cards.map((c) =>
            c.id === card.id || c.id === openCards[0].id
              ? { ...c, isOpen: false, isMatched: true }
              : c
          );
          setCards(updatedCards);
          setOpenCards([]);
        } else {
          await delay(700);

          const updatedCards = cards.map((c) =>
            c.id === card.id || c.id === openCards[0].id
              ? { ...c, isOpen: false }
              : c
          );
          setCards(updatedCards);
          setOpenCards([]);
        }
      }
    }
  };

  const handlePause = () => {
    setIsPaused((prevIsPaused) => !prevIsPaused);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const handleNewGame = () => {
    resetTimer();
    generateCards();
    setIsPaused(isPausedDefault);
  };

  return (
    <div className="game">
      <div className="game__header">
        <p>Выбранная сложность: {difficulty}</p>
        <Button
          type="link"
          onClick={() => handleDifficultyChange(Difficulty.Easy)}
        >
          Легко
        </Button>
        <Button
          type="link"
          onClick={() => handleDifficultyChange(Difficulty.Medium)}
        >
          Средне
        </Button>
        <Button
          type="link"
          onClick={() => handleDifficultyChange(Difficulty.Hard)}
        >
          Сложно
        </Button>
        <div className="game__time">Time: {time} sec</div>
      </div>
      <GameBoard>
        <Space wrap>
          <Row gutter={[24, 24]}>
            {cards.map((card) => (
              <Col span={6} key={card.id}>
                <Card
                  key={card.id}
                  value={imageMap[card.value] ?? card.value}
                  isOpen={card.isOpen}
                  isMatched={card.isMatched}
                  onClick={() => handleCardClick(card)}
                />
              </Col>
            ))}
          </Row>
        </Space>
      </GameBoard>
      <Button type="primary" onClick={handlePause}>
        {isPaused ? "Продолжить" : "Пауза"}
      </Button>
      <Button onClick={handleNewGame}>Заново</Button>
      <Modal
        open={isGameFinished}
        title="Поздравляем!"
        onCancel={() => setIsGameFinished(false)}
        footer={[
          <Button key="newGame" onClick={handleNewGame}>
            Начать новую игру
          </Button>,
        ]}
      >
        <p>Вы завершили игру! Хотите начать новую?</p>
      </Modal>
    </div>
  );
};

export default GamePage;
