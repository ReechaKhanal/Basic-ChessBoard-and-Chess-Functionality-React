export function getLegalMovesPawn(board, currentPosition, pieceColor){

    // row and column the pawn is currently located at
    var row = currentPosition[0]
    var col = currentPosition[1]

    // output array that holds all possible moves for a pawn
    var legalMoves = []
    var increment = 0

    // White Piece
    if(pieceColor === "white"){
        increment = 1
        // A white pawn can move two steps up straight if its path is not blocked and if it is in row 2 or its starting position
        if((row === 2) && (board[row+1][col] === 0) && (board[row+2][col] === 0)){
            legalMoves.push([row+2, col]);
            legalMoves.push([row+1, col]);
        }
    } // Black Piece
    else{
        increment = -1
        // A black pawn can move two steps down straight if its path is not bloacked and if it is in row 7 or its starting position
        if ((row === 7) && (board[row-1][col] === 0 )&& (board[row-2][col] === 0)){
            legalMoves.push([row-2, col]);
            legalMoves.push([row-1, col]);
        }
    }

    if((board[row+increment][col+increment] !== 0) && (board[row+increment][col+increment] !== null)){
        legalMoves.push([row+increment, col+increment]);
    }

    if((board[row+increment][col-increment] !== 0) && (board[row+increment][col-increment] !== null)){
        legalMoves.push([row+increment, col-increment]);
    }

    return legalMoves;
}