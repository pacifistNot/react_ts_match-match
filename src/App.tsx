import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Divider, Space, Button } from "antd";
import HomePage from "./components/HomePage";
import GamePage from "./components/GamePage";

const App: React.FC = () => {
  return (
    <Router>
      <Space split={<Divider type="vertical" />}>
        <Button type="link">
          <Link to="/">Главная</Link>
        </Button>
        <Button type="link">
          <Link to="/game">Новая игра</Link>
        </Button>
      </Space>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/game" element={<GamePage />} />
      </Routes>
    </Router>
  );
};

export default App;
