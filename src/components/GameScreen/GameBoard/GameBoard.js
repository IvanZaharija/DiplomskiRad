import React, { Component } from 'react';

import classes from './GameBoard.module.css';
import PlaceHolder from './CardPlaceholder/CardPlaceholder';
import Deck from '../../CardCollection.json';
import Board from './BoardPosition.json'

class GameBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            triggeredPlaceholder: null,
            redScore: 5,
            blueScore: 5,
            cardsPlaced: 0,
            GameBoardFull: false,
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
        if (this.state.triggeredPlaceholder)
            this.checkAdjacentPlaceholder(this.state.triggeredPlaceholder, this.props.gameResult);

        if (this.state.GameBoardFull) {
            this.setState({ GameBoardFull: false })
            this.props.gameResult(this.state.blueScore, this.state.redScore)
        }
    }

    updateScoreHandler(owner, scoreValue) {
        if (owner === "Blue") {
            this.setState({ blueScore: this.state.blueScore + scoreValue, redScore: this.state.redScore - scoreValue })
        } else if (owner === "Red") {
            this.setState({ blueScore: this.state.blueScore - scoreValue, redScore: this.state.redScore + scoreValue })
        } else
            return console.error("ScoreUpdateError");
    }

    gameLogicHandler(placeholderId, cardOwner, cardId) {
        let tempState = { ...this.state.boardState };
        tempState[placeholderId].owner = cardOwner;
        tempState[placeholderId].cardValues = Deck[cardId].values;

        this.setState({ boardState: tempState, triggeredPlaceholder: placeholderId, cardsPlaced: this.state.cardsPlaced + 1 });
    }

    checkAdjacentPlaceholder(triggered) {
        let scoreChange = 0;
        const triggeredOwner = this.state.boardState[triggered].owner;

        Board[triggered].nextTo.forEach(adjacent => {
            if ((this.state.boardState[adjacent].owner) && (this.state.boardState[triggered].owner !== this.state.boardState[adjacent].owner)) {
                const triggeredPosition = Board[triggered][adjacent][0];
                const adjacentPosition = Board[triggered][adjacent][1];
                const triggeredValue = this.state.boardState[triggered].cardValues[triggeredPosition];
                const adjacentValue = this.state.boardState[adjacent].cardValues[adjacentPosition];

                if (triggeredValue > adjacentValue) {
                    this.changeOwnerHandler(triggeredOwner, adjacent);
                    scoreChange++;
                }
            }
        });

        if (scoreChange > 0) {
            this.updateScoreHandler(triggeredOwner, scoreChange);
        }

        if (this.state.cardsPlaced === 9) {
            this.setState({ GameBoardFull: true, cardsPlaced: false })
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
                    style={{ display: (this.state.cardsPlaced === false) ? 'none' : 'flex' }}
                >
                    <div className={[classes.Score, classes.ScoreBlue].join(' ')}>{this.state.blueScore}</div>
                    <div className={[classes.Score, classes.ScoreRed].join(' ')}>{this.state.redScore}</div>
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