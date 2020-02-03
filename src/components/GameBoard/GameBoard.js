import React, { Component } from 'react';

import classes from './GameBoard.module.css';
import PlaceHolder from '../CardPlaceholder/CardPlaceholder';
import Deck from '../CardCollection.json';
import Board from './BoardPosition.json'

class GameBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            triggeredPlaceholder: null,
            scoreRed: 5,
            scoreBlue: 5,
            cardsPlaced: 0,
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

    componentDidUpdate(prevProps, prevState) {
        this.checkAdjacentPlaceholder(this.state.triggeredPlaceholder, this.props.gameResult);

        
        if (this.state.cardsPlaced === 10) {
            this.setState({ cardsPlaced: this.state.cardsPlaced + 1})
            this.props.gameResult( this.state.scoreBlue, this.state.scoreRed)
        }
    }

    updateScoreHandler(owner, scoreValue) {
        let blueScoreTemp = this.state.scoreBlue;
        let redScoreTemp = this.state.scoreRed;
        if (owner === "Blue") {
            this.setState({ scoreBlue: blueScoreTemp + scoreValue, scoreRed: redScoreTemp - scoreValue })
        } else if (owner === "Red") {
            this.setState({ scoreBlue: blueScoreTemp - scoreValue, scoreRed: redScoreTemp + scoreValue })
        }
    }

    handleGameLogic(placeholderId, cardOwner, cardId) {
        let tempState = { ...this.state.boardState };
        tempState[placeholderId].owner = cardOwner;
        tempState[placeholderId].cardValues = Deck[cardId].values;

        this.setState({ boardState: tempState, triggeredPlaceholder: placeholderId, cardsPlaced: this.state.cardsPlaced + 1});
    }

    checkAdjacentPlaceholder(triggered) {
        let scoreUpdate = 0;
        const triggeredOwner = this.state.boardState[triggered].owner;

        Board[triggered].nextTo.forEach(adj => {
            if ((this.state.boardState[adj].owner) && (this.state.boardState[triggered].owner !== this.state.boardState[adj].owner)) {
                const triggeredPos = Board[triggered][adj][0];
                const adjacentPos = Board[triggered][adj][1];
                // const triggeredOwner = this.state.boardState[triggered].owner;

                const triggeredValue = this.state.boardState[triggered].cardValues[triggeredPos];
                const adjacentValue = this.state.boardState[adj].cardValues[adjacentPos];
                if (triggeredValue > adjacentValue) {
                    this.changeOwnerHandler(triggeredOwner, adj);
                    scoreUpdate++;                   
                }
            }
        });

        if (scoreUpdate > 0) {
            this.updateScoreHandler(triggeredOwner, scoreUpdate);
        }

        if (this.state.cardsPlaced === 9){
            this.setState({ cardsPlaced: 10})
        }
    }

    changeOwnerHandler = (newOwner, placeholderId) => {
        let tempState = { ...this.state.boardState };
        tempState[placeholderId].owner = newOwner;
        this.setState({ boardState: tempState });
    }

    render() {

        return (
            <div className={classes.GameBoard}>
                <div className={classes.ScoreBoard}
                     style={{display: (this.state.cardsPlaced === 11) ? 'none' : 'flex'}}
                     >
                    <div className={[classes.Score, classes.ScoreBlue].join(' ')}>{this.state.scoreBlue}</div>
                    <div className={[classes.Score, classes.ScoreRed].join(' ')}>{this.state.scoreRed}</div>
                </div>
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