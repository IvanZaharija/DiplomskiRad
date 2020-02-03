import React, { Component } from 'react';

import classes from './GameField.module.css';
import GameBoard from '../GameBoard/GameBoard';
import PlayerHand from '../PlayerHand/PlayerHand';


class GameField extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playerTurn: "Blue",
            cardsRed: [4, 6, 24, 13, 15],
            cardsBlue: [5, 15, 22, 30, 19],
            blueScore: 0,
            redScore: 0,
            show : false
        };
    }

    getScoreHandler = (scoreBlue, scoreRed) => {
        this.setState({ blueScore: scoreBlue, redScore: scoreRed, show: true });
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
                <div className={classes.ResultScreen}
                    style={{transform: this.state.show ? 'translateY(0)' : 'translateY(-100vh)'}}
                >
                    <div className={classes.ResultTitle}>  The Winner is  </div>
                    <div className={classes.Winner}> {this.state.playerTurn} </div>
                    <div className={classes.ResultValues}>
                        <div className={[classes.Score, classes.Blue].join(' ') }> {this.state.blueScore} </div>
                        <div className={classes.ScoreDash}> - </div>
                        <div className={[classes.Score, classes.Red].join(' ') }> {this.state.redScore} </div>
                    </div>
                </div>
                <PlayerHand ref="Blue" owner={"Blue"} cardIDs={this.state.cardsBlue} playerTurn={(this.state.playerTurn === "Blue") ? true : false} />
                <GameBoard ref="Board" cardPlaced={this.handleCardPlaced} gameResult={this.getScoreHandler} />
                <PlayerHand ref="Red" owner={"Red"} cardIDs={this.state.cardsRed} playerTurn={(this.state.playerTurn === "Red") ? true : false} />
            </div>
        )
    }
}

export default GameField