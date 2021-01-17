import { getAllLegalMoves } from "./legalMoves/getLegalMoves";

export function lookForCheck(turn, board){
    
    // we are looking for the black king if white just played and vice versa
    var kingColor = "black";
    if(turn == 0){
        kingColor = "white";
    }
    // get the King's position
    var kingPosition = getKingRowCol(board, kingColor)
    
    // legalMoves we are looking for should be opposite of the King we looked for and vice versa
    var legalMoves =  getAllLegalMoves(board, turn)

    for (var i=0; i< legalMoves.length; i++){
        // if the king Falls in Position of other Player's legal Moves
        if(kingPosition == legalMoves[i]){
            return True
        }
    }
    return False   

} // end function look for check

function getKingRowCol(board, kingColor){
    var kingValue = 8;
    if(kingColor == "black"){
        kingValue = -8
    }

    for (var i =0; i <board.length; i++)
        var row = board[i];
        for (var j=0; j<row.length; j++){
            
            if (row[j] == kingValue){
                return [i, j]
            }// end if
        } // end inner for loop
    } // end outer for loop 
    return [-1, -1]
} // end getKignRowCol Function