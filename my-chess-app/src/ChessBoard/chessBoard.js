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
            turn: true,
            takenBlackPieces: [],
            takenWhitePieces: []
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
        var turn = this.state.turn;
        var legalMoves = [];
        
        // No Preselection
        if (selectedPiece.length === 0){
            if ( ((turn === true) && (piece>0)) || ((turn === false) && (piece<0))){
                var output = noPreSelection(selectedPiece, legalMoves, tempStateBoard, piece, row, col)
                this.setState({stateBoard: output[0],
                    selectedPiece: output[1]});
            } // end inner if
        }else{
            var takenBlackPieces = this.state.takenBlackPieces.slice();
            var takenWhitePieces = this.state.takenWhitePieces.slice();
            // some piece is pre-selected
            if ( ((turn === true) && (selectedPiece[0][0]>0)) || ((turn === false) && (selectedPiece[0][0]<0))){
                var output1 = withPreSelection(selectedPiece, legalMoves, tempStateBoard, piece, row, col, turn)    
                this.setOriginalBoardColor()
                
                // If a piece has been taken
                if(output1[3] != null){
                    
                    if (output1[3] < 0){
                        takenBlackPieces.push(output1[3])
                    } else if (output1[3] > 0){
                        takenWhitePieces.push(output1[3])
                    }
                }
                this.setState({stateBoard: output1[0],
                    selectedPiece: [],
                    turn: output1[2],
                    takenBlackPieces: takenBlackPieces,
                    takenWhitePieces: takenWhitePieces});
            } // end inner if
        }  
    } // end handleClick Function

    render(){
        var stateBoard1 = this.state.stateBoard.slice();
        var turn = this.state.turn;
        var turnText = "White's Turn";
        if (turn === false){
            turnText = "Black's Turn";
        }
        var takenBlackPieces = this.state.takenBlackPieces;
        var takenWhitePieces = this.state.takenWhitePieces;

        var takenBlack = takenBlackPieces.map((piece, idx) => {
            return <li key={idx}>{piece}</li> 
        });
        
        var takenWhite = takenWhitePieces.map((piece, idx) => {
            return <li key={idx}>{piece}</li> 
        });
        return(
            <>
            <div className = "test">
                <div className = "card">
                    <h2 className = "playerText"> Player 1 : White Pieces </h2>
                    {turnText}
                    <div className = "pieceTaken">
                        <h3 className = "takenText"> Pieces Taken </h3>
                        {takenWhite}
                    </div>
                </div>
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
                <div className = "card">
                <h2 className = "playerText"> Player 2 : Black Pieces </h2>
                    {turnText}
                    <div className = "pieceTaken">
                        <h3 className = "takenText"> Pieces Taken </h3>
                        {takenBlack}
                    </div>
                </div>
            </div>
            </>
        );
    }
}
export default ChessBoard;