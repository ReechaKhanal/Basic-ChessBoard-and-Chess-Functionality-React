export function getLegalMovesBishop(board, currentPosition, pieceColor){

    // row and column the Bishop is currently located at
    var row = currentPosition[0]
    var col = currentPosition[1]

    // output array that holds all possible moves for a Bishop
    var legalMoves = getValidDiagnols(board, row+1, col+1, 1, 1, [])
    legalMoves = getValidDiagnols(board, row+1, col-1, 1, -1, legalMoves)
    legalMoves = getValidDiagnols(board, row-1, col-1, -1, -1, legalMoves)
    legalMoves = getValidDiagnols(board, row-1, col+1, -1, 1, legalMoves)
    return legalMoves
}

function getValidDiagnols(board, r, c, row_increment, col_increment, legalMoves){
    
    while (((r > 0) && (r < 9)) && ((c > 0) && (c < 9))){    
        if (board[r][c] == null){
            break;
        }
        else if (board[r][c] === 0){
            legalMoves.push([r, c])
        }else{
            legalMoves.push([r, c])
            break;
        }
        r = r + row_increment
        c = c + col_increment
    }
    return legalMoves
}