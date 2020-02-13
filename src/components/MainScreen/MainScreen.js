import React, { Component } from 'react';

import classes from './MainScreen.module.css';
import CardCollectionDisplay from './CardCollectionDisplay/CardCollectionDisplay';
import SelectedCards from './SelectedCards/SelectedCards';
import GameField from '../GameField/GameField';

class MainScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            instructionTextLine_1: "Each player has to drag and drop cards to select them, or replace an already selected card. One player can't have duplicate cards.", 
            instructionTextLine_2: "The values on the card represent the animals characteristic: speed, food (kg eatan per day), weight and life span, as shown by the icons." ,
            instructionTextLine_3: "After all the cards have been selected press Play!" ,
            blueReady: false,
            redReady: false,
            blueCards: [null, null, null, null ,null],
            redCards: [null, null, null, null ,null],
            switchDisplay: true
        };
    }

    componentDidMount() {
        // this.setState({ deckSize: Object.keys(this.state.cards).length })
    }

    componentDidUpdate() {
    }

    checkBlueSelection = (full) => {
        if (full && !this.state.blueReady) {
            this.setState({ blueReady: true })
        }
    }

    checkRedSelection = (full) => {
        if (full && !this.state.redReady) {
            this.setState({ redReady: true })
        }
    }

    sendAllCardIds = () => {
        if( this.state.blueReady && this.state.redReady) {
            this.refs.SelectedBlue.fetchSelectedIds();
            this.refs.SelectedRed.fetchSelectedIds();
            this.setState({ switchDisplay: false})
        }
    }

    returnBlueCardIds = (Ids) => {
        this.setState({ blueCards: Ids})
    }
    returnRedCardIds = (Ids) => {
        this.setState({ redCards: Ids})
    }

    render() {

        if (this.state.switchDisplay) {
            return (
                <div className={classes.MainScreen}>
                    <div className={classes.Selection}>
                        <div className={classes.Instructions}>
                                <div className={classes.InstructionText}> {this.state.instructionTextLine_1} </div>
                                <div className={classes.InstructionText}> {this.state.instructionTextLine_2} </div>
                                <div className={classes.InstructionText}> {this.state.instructionTextLine_3} </div>
                        </div>
                        <div className={classes.PlayerCards}>
                            <SelectedCards ref="SelectedBlue" owner={"Blue"} cardsFull={this.checkBlueSelection} getIds={this.returnBlueCardIds} />
                            <SelectedCards ref="SelectedRed" owner={"Red"} cardsFull={this.checkRedSelection} getIds={this.returnRedCardIds} />
                        </div>
                        <div className={classes.ButtonContainer}>
                            <button className={[classes.PlayButton, (this.state.blueReady && this.state.redReady) ? classes.BtnClickable : classes.BtnNotClickable ].join(' ')}
                                    onClick={() => this.sendAllCardIds()}>
                                        Play!
                            </button>
                        </div>
                    </div>
                    <CardCollectionDisplay />
                </div>
            )
        }else {
            return <GameField blueCards={this.state.blueCards} redCards={this.state.redCards} />
        }
    }
}

export default MainScreen