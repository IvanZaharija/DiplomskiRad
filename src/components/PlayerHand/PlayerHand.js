import React, { Component } from 'react';

import classes from './PlayerHand.module.css'
import Card from '../Card/Card';



class PlayerHand extends Component {

    triggerHandCardRemove = (cardNumber) => {

        if (this.refs.hasOwnProperty(cardNumber)) {
            this.refs[cardNumber].triggerRemoveCard()
        }
        else {
            console.warn("refs recivied and invalid string");
        }
    }

    render() {
        return (
            <div className={classes.PlayerHand}
            >
                <Card ref="1" id={"1"} onBoard={false} cardOwner={this.props.owner} draggable={"true"} cardID={this.props.cardIDs[0]} />
                <Card ref="2" id={"2"} onBoard={false} cardOwner={this.props.owner} draggable={"true"} cardID={this.props.cardIDs[1]} />
                <Card ref="3" id={"3"} onBoard={false} cardOwner={this.props.owner} draggable={"true"} cardID={this.props.cardIDs[2]} />
                <Card ref="4" id={"4"} onBoard={false} cardOwner={this.props.owner} draggable={"true"} cardID={this.props.cardIDs[3]} />
                <Card ref="5" id={"5"} onBoard={false} cardOwner={this.props.owner} draggable={"true"} cardID={this.props.cardIDs[4]} />
            </div>

        )
    }
}

export default PlayerHand