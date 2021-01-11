export function getLegalMovesRook(board, currentPosition, pieceColor){

    // row and column the Rook is currently located at
    var row = currentPosition[0]
    var col = currentPosition[1]

    // output array that holds all possible moves for a Rook
    var legalMoves = [];
    
    var tempRow = row;
    var tempCol = col+1;
    while ((tempCol > 0) && (tempCol < 9)){
        if (board[tempRow][tempCol] == null){
            break;
        }
        else if (board[tempRow][tempCol] === 0){
            legalMoves.push([tempRow, tempCol])
        }else{
            legalMoves.push([tempRow, tempCol])
            break;
        }
        tempCol = tempCol + 1
    } // end first while

    tempRow = row;
    tempCol = col - 1;
    while ((tempCol > 0) && (tempCol < 9)){

        if (board[tempRow][tempCol] == null){
            break;
        }
        else if (board[tempRow][tempCol] === 0){
            legalMoves.push([tempRow, tempCol])
        }else{
            legalMoves.push([tempRow, tempCol])
            break;
        }
        tempCol = tempCol - 1
    } // end second while

    tempRow = row - 1;
    tempCol = col;     
    while ((tempRow > 0) && (tempRow < 9)){

        if (board[tempRow][tempCol] == null){
            break;
        }
        else if (board[tempRow][tempCol] === 0){
            legalMoves.push([tempRow, tempCol])
        }else{
            legalMoves.push([tempRow, tempCol])
            break;
        }
        tempRow = tempRow - 1
    } // end third while

    tempRow = row + 1;
    tempCol = col;     
    while ((tempRow > 0) && (tempRow < 9)){

        if (board[tempRow][tempCol] == null){
            break;
        }
        else if (board[tempRow][tempCol] === 0){
            legalMoves.push([tempRow, tempCol])
        }else{
            legalMoves.push([tempRow, tempCol])
            break;
        }
        tempRow = tempRow + 1
    } // end Fourth while    
    return legalMoves
} // end function getLegalMovesBishop