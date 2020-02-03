import React, { Component } from 'react';

import classes from './GameField.module.css';
import GameBoard from '../GameBoard/GameBoard';
import PlayerHand from '../PlayerHand/PlayerHand';
import ScoreBoard from './ScoreBoard/ScoreBoard';


class GameField extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playerTurn: "Blue",
            cardsRed: [4, 6, 24, 13, 15],
            cardsBlue: [5, 15, 22, 30, 19],
            blueScore: 0,
            redScore: 0,
            show : false,
            winner: "?",
            resultMessage: "?"
        };
    }

    getScoreHandler = (scoreBlue, scoreRed) => {
        this.resultMessageHandler( scoreBlue, scoreRed);
        this.setState({ blueScore: scoreBlue, redScore: scoreRed, show: true });
    }

    resultMessageHandler (scoreBlue, scoreRed) {
        let message =  "The Winner is";
        let winner;
        if (scoreBlue > scoreRed) {
            winner = "Blue"
        }else if ( scoreBlue < scoreRed) {
            winner = "Red"
        }
        else {
            message = " "
            winner = "Draw!"
        }
        this.setState({ resultMessage: message, winner: winner})
    }

    handleCardPlaced = (cardOwner, handPositionId, placeholderId, cardId) => {

        if (this.refs.hasOwnProperty(cardOwner)) {
            this.refs[cardOwner].triggerHandCardRemove(handPositionId);
            this.refs.Board.handleGameLogic(placeholderId, cardOwner, cardId);
            this.playerTurnHandler(cardOwner);
        }
        else {
            console.warn("refs recivied and invalid string");
        }
    }

    playerTurnHandler = (owner) => {
        (owner === "Blue") ? this.setState({ playerTurn: "Red" }) : this.setState({ playerTurn: "Blue" })
    }

    render() {
        return (
            <div className={classes.GameField}>
                <ScoreBoard  show={this.state.show} blueScore={this.state.blueScore} redScore={this.state.redScore} winner={this.state.winner} resultMessage={this.state.resultMessage} />
                <PlayerHand ref="Blue" owner={"Blue"} cardIDs={this.state.cardsBlue} playerTurn={(this.state.playerTurn === "Blue") ? true : false} />
                <GameBoard ref="Board" cardPlaced={this.handleCardPlaced} gameResult={this.getScoreHandler} />
                <PlayerHand ref="Red" owner={"Red"} cardIDs={this.state.cardsRed} playerTurn={(this.state.playerTurn === "Red") ? true : false} />
            </div>
        )
    }
}

export default GameField