import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Button } from "antd";
import GamePage from "./components/GamePage";
import "./scss/style.css";

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <div className="home-page">
          <h1>Welcome to Match-Match Game!</h1>
          <p>Нажми "Старт", чтобы запустить игру</p>
          <Button className="start__btn">
            <Link className="start__link" to="/game">Старт</Link>
          </Button>
        </div>
      </div>
      <Routes>
        <Route path="/game" element={<GamePage />} />
      </Routes>
    </Router>
  );
};

export default App;
