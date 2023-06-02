import React from "react";

interface GameBoardProps {
  children: React.ReactNode;
}

const GameBoard: React.FC<GameBoardProps> = ({ children }) => {
  return <div className="game-board">{children}</div>;
};

export default GameBoard;
