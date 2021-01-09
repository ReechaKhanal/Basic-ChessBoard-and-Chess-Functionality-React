import React, {Component} from "react";
import './chessBoard.css';
import ChessSquare from "./Square";
import { getLegalMovesPawn } from "./legalMoves/getLegalMovesPawn.js";
//  4D4E4F

class ChessBoard extends Component{

    constructor(props) {
        super(props);
        this.state = {
            board: [[null, null, null, null, null, null, null, null, null, null],
                    [null, 6, 5, 4, 8, 7, 4, 5, 6, null],
                    [null, 1, 1, 1, 1, 1, 1, 1, 1, null],
                    [null, 0, 0, 0, 0, 0, 0, 0, 0, null],
                    [null, 0, 0, 0, 0, 0, 0, 0, 0, null],
                    [null, 0, 0, 0, 0, 0, 0, 0, 0, null],
                    [null, 0, 0, 0, 0, 0, 0, 0, 0, null],
                    [null,-1,-1,-1,-1,-1,-1,-1,-1, null],
                    [null,-6,-5,-4,-8,-7,-4,-5,-6, null],
                    [null, null, null, null, null, null, null, null, null, null]],
                        
            stateBoard: this.renderStateBoard(),
        };
    }

    renderSquare(type, color, row, col){
        return(
            <ChessSquare
                value = {type}
                color = {color}
                onClick={()=>this.handleClick(type, row, col)}
            />
        )
    }

    renderStateBoard(){

        var white = "#eeeed2";
        var black = "#769656";

        var stateBoard = [[(0, white) , (0, white), (0, white), (0, white), (0, white), (0, white), (0, white), (0, white)],
                          [(1, black), (1, black), (1, black), (1, black), (1, black), (1, black), (1, black), (1, black)],
                          [(0, white), (0, white), (0, white), (0, white), (0, white), (0, white), (0, white), (0, white)],
                          [(1, black), (1, black), (1, black), (1, black), (1, black), (1, black), (1, black), (1, black)],
                          [(1, black), (1, black), (1, black), (1, black), (1, black), (1, black), (1, black), (1, black)],
                          [(0, white), (0, white), (0, white), (0, white), (0, white), (0, white), (0, white), (0, white)],
                          [(1, black), (1, black), (1, black), (1, black), (1, black), (1, black), (1, black), (1, black)],
                          [(0, white), (0, white), (0, white), (0, white), (0, white), (0, white), (0, white), (0, white)]];
                    
        var tempBoard = [[null, null, null, null, null, null, null, null, null, null],
                        [null, 6, 5, 4, 8, 7, 4, 5, 6, null],
                        [null, 1, 1, 1, 1, 1, 1, 1, 1, null],
                        [null, 0, 0, 0, 0, 0, 0, 0, 0, null],
                        [null, 0, 0, 0, 0, 0, 0, 0, 0, null],
                        [null, 0, 0, 0, 0, 0, 0, 0, 0, null],
                        [null, 0, 0, 0, 0, 0, 0, 0, 0, null],
                        [null,-1,-1,-1,-1,-1,-1,-1,-1, null],
                        [null,-6,-5,-4,-8,-7,-4,-5,-6, null],
                        [null, null, null, null, null, null, null, null, null, null]];

        for (var i=0; i< tempBoard.length; i++){
                
            var row = tempBoard[i];
            var value = 0;
            var piece = "";
            var color = white;
                
            for (var j=0; j<row.length; j++){

                value = tempBoard[i][j];
                if (value == null){
                    // do nothing
                }else{
                    // only if the value is not null
                    piece = value;
                    if (value === 0){
                        // nothing still
                        piece="";
                    }
                    
                    if (i%2 !== 0){
                        color = white;
                        if (j%2 === 0){
                            color = black;
                        }
                    }else{
                        color = black;
                        if (j%2 === 0){
                            color = white;
                        }
                    }
                    stateBoard[i-1][j-1] = [piece, color, i-1, j-1]
                }
            }
        }
        return(stateBoard);
    };
    
    handleClick(piece, row, col){

        var brown = "#964B00";
        // if the selected square has a piece in it
        // highlight the available moves
        var legalMoves = [];
        var board = this.state.board.slice();
        var color = "black";
        if(piece > 0){
            color = "white";
        }
        legalMoves = getLegalMovesPawn(board, [row+1, col+1], color);

        // highlight legalMoves
        var tempStateBoard = this.state.stateBoard.slice()
        for (var k = 0; k<legalMoves.length; k++){
            var r = legalMoves[k][0] - 1;
            var c = legalMoves[k][1] - 1;
            tempStateBoard[r][c] = [tempStateBoard[r][c][0], brown,tempStateBoard[r][c][1], tempStateBoard[r][c][2]];
        }
        this.setState({stateBoard: tempStateBoard});

    }

    render(){
        var stateBoard1 = this.state.stateBoard.slice()
        return(
            <div>
                {stateBoard1.map((rows, index) => {
                    return(
                        <div>
                        {rows.map((value, vIndex) => {
                            return <>{this.renderSquare(value[0], value[1], value[2], value[3])}</>
                        })}
                        </div>
                    );
                })}
                <br></br>
                <br></br>
            </div>
        );
    }
}
export default ChessBoard;