import React, { Component } from 'react';

import classes from './GameField.module.css';
import GameBoard from '../GameBoard/GameBoard';
import PlayerHand from '../PlayerHand/PlayerHand';

class GameField extends Component {  
    constructor(props) {
        super(props);
        this.state = {
            playerTurn : "Blue"
        };
    }  

    componentDidUpdate() {
        console.log(this.state.playerTurn);
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
      (owner === "Blue") ? this.setState ({playerTurn: "Red"}) : this.setState ({playerTurn: "Blue"})
    }

    render() {
        return (
            <div className={classes.GameField}>
                <PlayerHand ref="Blue" owner={"Blue"} cardIDs={[2, 5, 7, 9, 10]} playerTurn={(this.state.playerTurn === "Blue") ? true : false} />
                <GameBoard ref="Board" cardPlaced={this.handleCardPlaced} />
                <PlayerHand ref="Red" owner={"Red"} cardIDs={[4, 6, 8, 12, 20]} playerTurn={(this.state.playerTurn === "Red") ? true : false} />
            </div>
        )
    }
}

export default GameField