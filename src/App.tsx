import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Divider, Space, Button } from "antd";
import GamePage from "./components/GamePage";
import "./scss/style.css";

enum Difficulty {
  Easy = "Easy",
  Medium = "Medium",
  Hard = "Hard",
}

const App: React.FC = () => {
  const [difficulty, setDifficulty] = useState(Difficulty.Easy);

  const handleDifficultyChange = (selectedDifficulty: Difficulty) => {
    setDifficulty(selectedDifficulty);
  };

  return (
    <Router>
      <Space split={<Divider type="vertical" />}></Space>
      <div>
        <div className="home-page">
          <h1>Welcome to Match-Match Game!</h1>
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
          <p>Нажми "Старт", чтобы запустить игру</p>
          <Button type="link">
            <Link to="/game">Старт</Link>
          </Button>
        </div>
      </div>
      <Routes>
        <Route path="/game" element={<GamePage difficulty={difficulty} />} />
      </Routes>
    </Router>
  );
};

export default App;
