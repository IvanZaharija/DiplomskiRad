import React, { Component } from 'react';

import classes from './GameScreen.module.css';
import GameBoard from './GameBoard/GameBoard';
import PlayerHand from './PlayerHand/PlayerHand';
import MessageAndScoreBoard from './MessageAndScoreBoard/MessageAndScoreBoard';


class GameScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showIntro: true,
            showResult: false,
            playerTurn: "Blue",
            blueScore: 0,
            redScore: 0,
            winner: "...",
            resultMessage: "..."
        };
    }

    closeIntroHandler = () => {
        this.setState({ showIntro: false });
    }

    getScoreHandler = (blueScore, redScore) => {
        setTimeout(() => {
            this.resultMessageHandler(blueScore, redScore);
            this.setState({ blueScore: blueScore, redScore: redScore, showResult: true });
        }, 500);
    }

    resultMessageHandler(blueScore, redScore) {
        let message = "The Winner is";
        let winner;
        if (blueScore > redScore) {
            winner = "Blue"
        } else if (blueScore < redScore) {
            winner = "Red"
        } else {
            message = " "
            winner = "Draw!"
        }
        this.setState({ resultMessage: message, winner: winner })
    }

    cardPlacedHandler = (cardOwner, handPositionId, placeholderId, cardId) => {

        if (this.refs.hasOwnProperty(cardOwner)) {
            this.refs[cardOwner].triggerHandCardRemove(handPositionId);
            this.refs.Board.gameLogicHandler(placeholderId, cardOwner, cardId);
            this.changePlayerTurnHandler(cardOwner);
        } else {
            console.warn("Refs recivied and invalid string");
        }
    }

    changePlayerTurnHandler = (owner) => {
        if (owner === "Blue") {
            this.setState({ playerTurn: "Red" });
        }
        else if (owner === "Red") {
            this.setState({ playerTurn: "Blue" });
        } else
            return console.error("PlayerTurnError");
    }

    render() {
        return (
            <div className={classes.GameScreen}>
                <MessageAndScoreBoard
                    showResult={this.state.showResult}
                    showIntro={this.state.showIntro}
                    introController={this.closeIntroHandler}
                    blueScore={this.state.blueScore} redScore={this.state.redScore}
                    winner={this.state.winner}
                    resultMessage={this.state.resultMessage} />
                <PlayerHand 
                    ref="Blue" owner={"Blue"} 
                    cardIds={this.props.selectedBlueCards} 
                    playerTurn={(this.state.playerTurn === "Blue" && !this.state.showIntro) ?
                     true : false} />
                <GameBoard 
                    ref="Board" 
                    cardPlaced={this.cardPlacedHandler} 
                    gameResult={this.getScoreHandler} />
                <PlayerHand 
                    ref="Red" owner={"Red"} 
                    cardIds={this.props.selectedRedCards} 
                    playerTurn={(this.state.playerTurn === "Red" && !this.state.showIntro) ?
                     true : false} />
            </div>
        )
    }
}

export default GameScreen