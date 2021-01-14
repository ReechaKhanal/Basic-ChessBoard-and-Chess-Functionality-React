import React, {Component} from "react";
import './chessBoard.css';
import ChessSquare from "./Square";
import { getOriginalBoardColor, getInitialBoard } from "./getOriginalBoardProperties.js";
import { noPreSelection, withPreSelection } from "./moveSimulation.js";

class ChessBoard extends Component{

    constructor(props) {
        super(props);
        this.state = {
            stateBoard: getInitialBoard(),
            selectedPiece: [],
            turn: 1,
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

    setOriginalBoardColor(){
        
        var tempStateBoard = this.state.stateBoard.slice();
        tempStateBoard = getOriginalBoardColor(tempStateBoard);
        this.setState({stateBoard: tempStateBoard});
    };
     
    handleClick(piece, row, col){
        var selectedPiece = this.state.selectedPiece.slice()
        var tempStateBoard = this.state.stateBoard.slice();
        var legalMoves = [];
        
        // No Preselection
        if (selectedPiece.length === 0){
            var output = noPreSelection(selectedPiece, legalMoves, tempStateBoard, piece, row, col)
            this.setState({stateBoard: output[0],
                        selectedPiece: output[1]});
        }else{
            // some piece is pre-selected
            var output1 = withPreSelection(selectedPiece, legalMoves, tempStateBoard, piece, row, col)    
            this.setOriginalBoardColor()
            this.setState({stateBoard: output1[0],
                selectedPiece: []});
        }
    }

    render(){
        var stateBoard1 = this.state.stateBoard.slice();
        var turn = this.state.turn;
        var turnText = "White's Turn";
        if (turn === 0){
            turnText = "Black's Turn";
        }
        return(
            <>
            <span>
                {turnText}
            </span>
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
            </div>
            </>
        );
    }
}
export default ChessBoard;