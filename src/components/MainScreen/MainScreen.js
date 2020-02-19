import React, { Component } from 'react';

import classes from './MainScreen.module.css';
import CardCollectionDisplay from './CardCollectionDisplay/CardCollectionDisplay';
import SelectedCards from './SelectedCards/SelectedCards';
import GameScreen from '../GameScreen/GameScreen';

const InstructionTextLine_1 = "Each player has to drag and drop cards to select them, or replace an already selected card. One player can't have duplicate cards.";
const InstructionTextLine_2 = "The values on the card represent the animals characteristic: speed, food (kg eatan per day), weight and life span, as shown by the icons.";
const InstructionTextLine_3 = "After all the cards have been selected press Play!";

class MainScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isBlueReady: false,
            isRedReady: false,
            blueCards: [null, null, null, null, null],
            redCards: [null, null, null, null, null],
            bothPlayersReady: false
        };
    }

    checkIfBlueReady = (isFull) => {
        if (isFull && !this.state.isBlueReady) {
            this.setState({ isBlueReady: true })
        }
    }

    checkIfRedReady = (isFull) => {
        if (isFull && !this.state.isRedReady) {
            this.setState({ isRedReady: true })
        }
    }

    getSelectedIdsHandler = () => {
        if (this.state.isBlueReady && this.state.isRedReady) {
            this.refs.SelectedBlue.fetchSelectedIds();
            this.refs.SelectedRed.fetchSelectedIds();
            this.setState({ bothPlayersReady: true })
        }
    }

    returnBlueCardIds = (Ids) => {
        this.setState({ blueCards: Ids })
    }
    returnRedCardIds = (Ids) => {
        this.setState({ redCards: Ids })
    }

    render() {

        if (!this.state.bothPlayersReady) {
            return (
                <div className={classes.MainScreen}>
                    <div className={classes.Selection}>
                        <div className={classes.Instructions}>
                            <div className={classes.InstructionText}> {InstructionTextLine_1} </div>
                            <div className={classes.InstructionText}> {InstructionTextLine_2} </div>
                            <div className={classes.InstructionText}> {InstructionTextLine_3} </div>
                        </div>
                        <div className={classes.PlayerCards}>
                            <SelectedCards 
                                ref="SelectedBlue" 
                                owner={"Blue"} 
                                cardsFull={this.checkIfBlueReady} 
                                getCardIds={this.returnBlueCardIds} />
                            <SelectedCards 
                                ref="SelectedRed" 
                                owner={"Red"} 
                                cardsFull={this.checkIfRedReady} 
                                getCardIds={this.returnRedCardIds} />
                        </div>
                        <div className={classes.ButtonContainer}>
                            <button className={[classes.PlayButton, (this.state.isBlueReady && this.state.isRedReady) ? classes.BtnClickable : classes.BtnNotClickable].join(' ')}
                                onClick={() => this.getSelectedIdsHandler()}>
                                Play!
                            </button>
                        </div>
                    </div>
                    <CardCollectionDisplay />
                </div>
            )
        } else {
            return <GameScreen selectedBlueCards={this.state.blueCards} selectedRedCards={this.state.redCards} />
        }
    }
}

export default MainScreen