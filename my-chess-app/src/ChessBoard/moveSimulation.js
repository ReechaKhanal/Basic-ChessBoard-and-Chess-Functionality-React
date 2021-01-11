import { getLegalMoves } from "./legalMoves/getLegalMoves.js";
import { getBoardFromStateBoard } from "./getStateBoard.js";

export function noPreSelection(selectedPiece, legalMoves, tempStateBoard, piece, row, col){
    // store current piece info for next time
    selectedPiece = [[piece, row, col]]
    var brown = "#964B00";
    // if the selected square has a piece in it, highlight the available moves
    var board = getBoardFromStateBoard(tempStateBoard);
    var color = "black";
    if(piece > 0){
        color = "white";
    }
    legalMoves = getLegalMoves(board, [row+1, col+1], color);
    //alert(legalMoves)
    selectedPiece.push(legalMoves);
    
    // highlight legalMoves
    for (var k = 0; k<legalMoves.length; k++){
        var r = legalMoves[k][0] - 1;
        var c = legalMoves[k][1] - 1;
        tempStateBoard[r][c] = [tempStateBoard[r][c][0], brown, tempStateBoard[r][c][2], tempStateBoard[r][c][3]];
    }
    return [tempStateBoard, selectedPiece]
    
}

export function withPreSelection(selectedPiece, legalMoves, tempStateBoard, piece, row, col){
    var selectedPieceInfo = selectedPiece[0];
    legalMoves = selectedPiece[1];
    var selectedRow = selectedPieceInfo[1];
    var selectedCol = selectedPieceInfo[2];

    for (var i=0; i< legalMoves.length; i++){
        var r1 = legalMoves[i][0] - 1
        var c1 = legalMoves[i][1] - 1
        if ((r1 === row) && (c1 === col)){
            // the new selected piece is legal and among the legal moves
            tempStateBoard[row][col] = [selectedPieceInfo[0], tempStateBoard[row][col][1], tempStateBoard[row][col][2], tempStateBoard[row][col][3]];
            tempStateBoard[selectedRow][selectedCol] = [piece, tempStateBoard[selectedRow][selectedCol][1], tempStateBoard[selectedRow][selectedCol][2], tempStateBoard[selectedRow][selectedCol][3]];
            break;
        }
    }
    return [tempStateBoard, []]
}