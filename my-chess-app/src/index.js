import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ChessBoard from "./ChessBoard/chessBoard";

// This is the starting point of the Chess Application
// Below we render ChessBoard.js File - Which does further work
ReactDOM.render(
  <div class = "chess">
    <h1>Reecha's Chess Board</h1>
    <ChessBoard/>
  </div>,
  document.getElementById('root')
);