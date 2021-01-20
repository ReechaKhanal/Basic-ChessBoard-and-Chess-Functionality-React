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
} // end function getLegalMoves

export function getAllLegalMoves(board, turn){
    var legalMoves = []
    var output = []
    var i = 0, j = 0, k = 0, value = 0
    if (turn === 1){
        // WHITE'S Turn
        for(i = 0; i < board.length; i++){
            var row = board[i]
            for (j= 0; j < row.length; j++){
                
                value = row[j]
                if ((value == null) || (value <= 0)){
                    // do nothing
                }else{
                    output = getLegalMoves(board, [i, j], "white")
                }
                for(k = 0; k < output.length; k++){
                    legalMoves.push(output[i])
                } // end the inner for loop 
            }// end first for loop
        } // end second for loop

    }else{
        for(i = 0; i < board.length; i++){
            row = board[i]
            for (j= 0; j < row.length; j++){
                
                value = row[j]
                if ((value == null) || (value >= 0)){
                    // do nothing
                }else{
                    output = getLegalMoves(board, [i, j], "black")
                }
                for(k = 0; k < output.length; k++){
                    legalMoves.push(output[i])
                } // end the inner for loop 
            }// end first for loop
        } // end second for loop
    }
    
    return legalMoves
    
} // end function getAllLegalMoves(board, turn )