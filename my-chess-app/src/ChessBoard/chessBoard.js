import React, {Component} from "react";
import './chessBoard.css';
import ChessSquare from "./Square";
import { getOriginalBoardColor, getInitialBoard } from "./getOriginalBoardProperties.js";
import { noPreSelection, withPreSelection } from "./moveSimulation.js";

import pawn from './Images/pawn.png';
import blackPawn from './Images/black_pawn.png';
import rook from './Images/rook.png';
import blackRook from './Images/black_rook.png';
import knight from './Images/knight.png';
import blackKnight from './Images/black_knight.png';
import bishop from './Images/bishop.png';
import blackBishop from './Images/black_bishop.png';
import queen from './Images/queen.png';
import blackQueen from './Images/black_queen.png';
import king from './Images/king.png';
import blackKing from './Images/black_king.png';
import empty from './Images/empty.svg';

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

    getImageType(value){
        var dict = {
            1: pawn,
            4: bishop,
            5: knight,
            6: rook,
            7: queen,
            8: king,
        };
        var src1 = blackPawn;
        if (value === -4){
            src1 = blackBishop;
        } else if (value === -5){
            src1 = blackKnight;
        } else if (value === -6){
            src1 = blackRook;
        } else if (value === -7){
            src1 = blackQueen;
        } else if (value === -8){
            src1 = blackKing;
        } else if (value === 0){
            src1 = empty;
        } else if (value === -1){
            src1 = blackPawn;
        } else {
            src1 = dict[value]
        }
        return src1
    }

    renderSquare(type, color, row, col){
        
        return(
            <ChessSquare
                value = {type}
                color = {color}
                source = {this.getImageType(type)}
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
            return <><img className = "takenPiecePic" alt="" src = {this.getImageType(piece)}/></> 
        });
        
        var takenWhite = takenWhitePieces.map((piece, idx) => {
            return <><img className = "takenPiecePic" alt="" src = {this.getImageType(piece)}/></> 
            
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