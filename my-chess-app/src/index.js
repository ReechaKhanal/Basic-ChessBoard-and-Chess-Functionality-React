import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ChessBoard from "./ChessBoard/chessBoard";

ReactDOM.render(
  <div class = "chess">
    <h1>Reecha's Chess Board</h1>
    <ChessBoard/>
  </div>,
  document.getElementById('root')
);