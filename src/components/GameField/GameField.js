import React, { Component } from 'react';

import classes from './GameField.module.css';
import GameBoard from '../GameBoard/GameBoard';
import PlayerHand from '../PlayerHand/PlayerHand';

class GameField extends Component {

    handleCardPlaced = (cardOwner, handPositionId, placeholderId, cardId) => {

        if (this.refs.hasOwnProperty(cardOwner)) {
            this.refs[cardOwner].triggerHandCardRemove(handPositionId);
            this.refs.Board.handleGameLogic(placeholderId, cardOwner, cardId);
        }
        else {
            console.warn("refs recivied and invalid string");
        }
    }

    render() {
        return (
            <div className={classes.GameField}>
                <PlayerHand ref="Blue" owner={"Blue"} cardIDs={[2, 5, 7, 9, 10]} />
                <GameBoard ref="Board" cardPlaced={this.handleCardPlaced} />
                <PlayerHand ref="Red" owner={"Red"} cardIDs={[4, 6, 8, 12, 20]} />
            </div>
        )
    }
}

export default GameField