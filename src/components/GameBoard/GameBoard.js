import React, { Component } from 'react';

import classes from './GameBoard.module.css';
import PlaceHolder from '../CardPlaceholder/CardPlaceholder';
import Deck from '../CardCollection.json';
import Card from '../Card/Card';

const board = {
    "1": {
        "nextTo": [2, 4],
        "2": [1, 3],
        "4": [2, 0]
    },
    "2": {
        "nextTo": [1, 3, 5],
        "1": [3, 1],
        "3": [1, 3],
        "5": [2, 0]
    },
    "3": {
        "nextTo": [2, 6],
        "2": [3, 1],
        "6": [2, 0]
    },
    "4": {
        "nextTo": [1, 5, 7],
        "1": [0, 2],
        "5": [1, 3],
        "7": [2, 0]
    },
    "5": {
        "nextTo": [2, 4, 6, 8],
        "2": [0, 2],
        "4": [3, 1],
        "6": [1, 3],
        "8": [2, 0]
    },
    "6": {
        "nextTo": [3, 5, 9],
        "3": [0, 2],
        "5": [3, 1],
        "9": [2, 0]
    },
    "7": {
        "nextTo": [4, 8],
        "4": [0, 2],
        "8": [1, 3],
    },
    "8": {
        "nextTo": [5, 7, 9],
        "5": [0, 2],
        "7": [3, 1],
        "9": [1, 3],
    },
    "9": {
        "nextTo": [6, 8],
        "6": [0, 2],
        "8": [3, 1],
    }
}

class GameBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            triggeredPlaceholder: null,
            boardState: {
                "1": {
                    "owner": false,
                    "cardValues": [0, 0, 0, 0]
                },
                "2": {
                    "owner": false,
                    "cardValues": [0, 0, 0, 0]
                },
                "3": {
                    "owner": false,
                    "cardValues": [0, 0, 0, 0]
                },
                "4": {
                    "owner": false,
                    "cardValues": [0, 0, 0, 0]
                },
                "5": {
                    "owner": false,
                    "cardValues": [0, 0, 0, 0]
                },
                "6": {
                    "owner": false,
                    "cardValues": [0, 0, 0, 0]
                },
                "7": {
                    "owner": false,
                    "cardValues": [0, 0, 0, 0]
                },
                "8": {
                    "owner": false,
                    "cardValues": [0, 0, 0, 0]
                },
                "9": {
                    "owner": false,
                    "cardValues": [0, 0, 0, 0]
                },
            }

        };
    }

    componentDidUpdate() {
        this.checkAdjacentPlaceholder(this.state.triggeredPlaceholder);
    }

    handleGameLogic(placeholderId, cardOwner, cardId) {
        let tempState = { ...this.state.boardState };
        tempState[placeholderId].owner = cardOwner;
        tempState[placeholderId].cardValues = Deck[cardId].values;
        this.setState({ boardState: tempState, triggeredPlaceholder: placeholderId })
    }

    checkAdjacentPlaceholder(triggered) {
        //TODO PREABACIT BOARD U NEKI ODVOJENI JSON FILE

        board[triggered].nextTo.forEach(adj => {
            if ((this.state.boardState[adj].owner) && (this.state.boardState[triggered].owner !== this.state.boardState[adj].owner)) {
                const triggeredPos = board[triggered][adj][0];
                const adjacentPos = board[triggered][adj][1];
                const triggeredOwner = this.state.boardState[triggered].owner;

                const triggeredValue = this.state.boardState[triggered].cardValues[triggeredPos];
                const adjacentValue = this.state.boardState[adj].cardValues[adjacentPos];
                if (triggeredValue > adjacentValue) {
                    this.changeOwnerHandler( triggeredOwner, adj)
                }
                else {
                    console.log("Manji sam");
                }
            }
        });
    }

    changeOwnerHandler = ( newOwner, placeholderId) => {
        let tempState = { ...this.state.boardState };
        tempState[placeholderId].owner = newOwner;
        this.setState({ boardState: tempState});
    }

    render() {

        return (
            <div className={classes.GameBoard}>
                <div className={classes.Row}>
                    <PlaceHolder placeholderId={1} onBoard={this.state.boardState[1].owner} cardPlaced={this.props.cardPlaced} />
                    <PlaceHolder placeholderId={2} onBoard={this.state.boardState[2].owner} cardPlaced={this.props.cardPlaced} />
                    <PlaceHolder placeholderId={3} onBoard={this.state.boardState[3].owner} cardPlaced={this.props.cardPlaced} />
                </div>
                <div className={classes.Row}>
                    <PlaceHolder placeholderId={4} onBoard={this.state.boardState[4].owner} cardPlaced={this.props.cardPlaced} />
                    <PlaceHolder placeholderId={5} onBoard={this.state.boardState[5].owner} cardPlaced={this.props.cardPlaced} />
                    <PlaceHolder placeholderId={6} onBoard={this.state.boardState[6].owner} cardPlaced={this.props.cardPlaced} />
                </div>
                <div className={classes.Row}>
                    <PlaceHolder placeholderId={7} onBoard={this.state.boardState[7].owner} cardPlaced={this.props.cardPlaced} />
                    <PlaceHolder placeholderId={8} onBoard={this.state.boardState[8].owner} cardPlaced={this.props.cardPlaced} />
                    <PlaceHolder placeholderId={9} onBoard={this.state.boardState[9].owner} cardPlaced={this.props.cardPlaced} />
                </div>
            </div>

        )
    }
}

export default GameBoard