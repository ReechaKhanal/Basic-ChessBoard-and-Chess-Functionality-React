import { getLegalMoves } from "./legalMoves/getLegalMoves.js";
import { getBoardFromStateBoard } from "./getStateBoard.js";
import { lookForCheck } from "./lookForCheck.js";

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
    selectedPiece.push(legalMoves);
    
    // highlight legalMoves
    for (var k = 0; k<legalMoves.length; k++){
        var r = legalMoves[k][0] - 1;
        var c = legalMoves[k][1] - 1;
        tempStateBoard[r][c] = [tempStateBoard[r][c][0], brown, tempStateBoard[r][c][2], tempStateBoard[r][c][3]];
    }
    // }
    return [tempStateBoard, selectedPiece]
}

export function withPreSelection(selectedPiece, legalMoves, tempStateBoard, piece, row, col, turn){
    var selectedPieceInfo = selectedPiece[0];
    legalMoves = selectedPiece[1];
    var selectedRow = selectedPieceInfo[1];
    var selectedCol = selectedPieceInfo[2];
    var takenPiece = null;
    var check = null;
    
    var opponentColor = "black";
    //alert([piece, selectedPieceInfo[0]])
    if (selectedPieceInfo[0] < 0){
        opponentColor = "white";
    }

    for (var i=0; i< legalMoves.length; i++){
        var r1 = legalMoves[i][0] - 1
        var c1 = legalMoves[i][1] - 1
        if ((r1 === row) && (c1 === col)){
            // the new selected piece is legal and among the legal moves
            tempStateBoard[row][col] = [selectedPieceInfo[0], tempStateBoard[row][col][1], tempStateBoard[row][col][2], tempStateBoard[row][col][3]];
            tempStateBoard[selectedRow][selectedCol] = [0, tempStateBoard[selectedRow][selectedCol][1], tempStateBoard[selectedRow][selectedCol][2], tempStateBoard[selectedRow][selectedCol][3]];
            
            if(piece !== 0){
                takenPiece = piece
            }

            // Look for check
            if (lookForCheck(opponentColor, getBoardFromStateBoard(tempStateBoard))){
                // There is a check
                check = 0;
                if(opponentColor === "white"){
                    check = 1;
                }
            }
            turn = !turn;
            break;
        }
    }
    return [tempStateBoard, [], turn, takenPiece, check]
}