import { getLegalMovesPawn } from "./getLegalMovesPawn.js"
import { getLegalMovesBishop } from "./getLegalMovesBishop.js"
import { getLegalMovesKnight } from "./getLegalMovesKnight.js"
import { getLegalMovesRook } from "./getLegalMovesRook.js"
import { getLegalMovesQueen } from "./getLegalMovesQueen.js"
import { getLegalMovesKing } from "./getLegalMovesKing.js"

export function getLegalMoves(board, currentPosition, pieceColor){
    var row = currentPosition[0]
    var col = currentPosition[1]

    // Pawn
    if ((board[row][col] === 1) || (board[row][col] === -1)){
        return getLegalMovesPawn(board, currentPosition, pieceColor);
    }
    // Bishop
    else if((board[row][col] === 4) || (board[row][col] === -4)){
        return getLegalMovesBishop(board, currentPosition, pieceColor);
    }
    // Knight
    else if((board[row][col] === 5) || (board[row][col] === -5)){
        return getLegalMovesKnight(board, currentPosition, pieceColor);
    }
    // Rook
    else if((board[row][col] === 6) || (board[row][col] === -6)){
        return getLegalMovesRook(board, currentPosition, pieceColor);
    }
    // Queen
    else if((board[row][col] === 7) || (board[row][col] === -7)){
        return getLegalMovesQueen(board, currentPosition, pieceColor);
    }
    // King
    else if((board[row][col] === 8) || (board[row][col] === -8)){
        return getLegalMovesKing(board, currentPosition, pieceColor);
    }
}