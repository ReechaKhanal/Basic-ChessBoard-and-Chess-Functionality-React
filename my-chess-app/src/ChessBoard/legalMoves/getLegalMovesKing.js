export function getLegalMovesKing(board, currentPosition, pieceColor){
    // row and column the King is currently located at
    var row = currentPosition[0]
    var col = currentPosition[1]

    // output array that holds all possible moves for the King
    var legalMoves = [];

    legalMoves = checkIfValid(board, row + 1, col, legalMoves)
    legalMoves = checkIfValid(board, row - 1, col, legalMoves)
    legalMoves = checkIfValid(board, row, col+1, legalMoves)
    legalMoves = checkIfValid(board, row, col-1, legalMoves)
    
    legalMoves = checkIfValid(board, row+1, col+1, legalMoves)
    legalMoves = checkIfValid(board, row+1, col-1, legalMoves)
    legalMoves = checkIfValid(board, row-1, col+1, legalMoves)
    legalMoves = checkIfValid(board, row-1, col-1, legalMoves)

    return legalMoves
}

function checkIfValid(board, r, c, legalMoves){
    if (board[r][c] === 0){
        legalMoves.push([r, c])
    }
    else if (board[r][c] != null){
        // will need a way to see if the king will be in Check with this move.
        legalMoves.push([r, c])
    }
    return legalMoves
}