import React, { Component } from 'react';

import classes from './PlayerHand.module.css'
import Card from './Card/Card';

class PlayerHand extends Component {

    triggerHandCardRemove = (cardNumber) => {

        if (this.refs.hasOwnProperty(cardNumber)) {
            this.refs[cardNumber].triggerRemoveCard()
        }
        else {
            console.warn("Refs recivied and invalid string");
        }
    }

    render() {
        return (
            <div className={classes.PlayerHand}
            >
                <Card ref="1" id={"1"} cardOwner={this.props.owner} draggable={this.props.playerTurn} cardId={this.props.cardIds[0]} />
                <Card ref="2" id={"2"} cardOwner={this.props.owner} draggable={this.props.playerTurn} cardId={this.props.cardIds[1]} />
                <Card ref="3" id={"3"} cardOwner={this.props.owner} draggable={this.props.playerTurn} cardId={this.props.cardIds[2]} />
                <Card ref="4" id={"4"} cardOwner={this.props.owner} draggable={this.props.playerTurn} cardId={this.props.cardIds[3]} />
                <Card ref="5" id={"5"} cardOwner={this.props.owner} draggable={this.props.playerTurn} cardId={this.props.cardIds[4]} />
            </div>

        )
    }
}

export default PlayerHand