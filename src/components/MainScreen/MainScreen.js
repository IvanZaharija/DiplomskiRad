import React, { Component } from 'react';

import classes from './MainScreen.module.css';
import Deck from '../CardCollection.json';
import CardDisplay from './CardDisplay/CardDisplay';
import SelectedCards from './SelectedCards/SelectedCards';

class GameField extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: Deck,
            deckSize: null,
            show: false,
            blueReady: false,
            redReady: false
        };
    }

    componentDidMount() {
        this.setState({ deckSize: Object.keys(this.state.cards).length })
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
        console.log("Ovjde idu idevi");
        this.refs.SelectedBlue.fetchSelectedIds();
        this.refs.SelectedRed.fetchSelectedIds();
    }

    returnBlueCardIds = (Ids) => {
        console.log(Ids);
    }
    returnRedCardIds = (Ids) => {
        console.log(Ids);
    }

    generateCard() {

        let row = [];
        for (let i = 1; i <= this.state.deckSize / 4; i++) {
            let column = [];
            for (let j = 0; j < 4; j++) {
                let pomak = 4 * i - 3 + j;
                if (pomak > this.state.deckSize) break;
                column.push(
                    <td key={pomak} className={classes.CardCase} >
                        <label className={classes.CardName}> {Deck[pomak].name} </label>
                        <CardDisplay id={pomak} cardPicture={Deck[pomak].picture} cardClass={Deck[pomak].class} cardValues={Deck[pomak].values} />
                    </td>
                )
            }
            row.push(<tr className={classes.Row} key={i}>{column}</tr>)
        }
        return row
    }

    render() {
        return (
            <div className={classes.MainScreen}>
                <div className={classes.Selection}>
                    <div className={classes.Instructions}> Instruction</div>
                    <div className={classes.PlayerCards}>
                        <SelectedCards ref="SelectedBlue" owner={"Blue"} cardsFull={this.checkBlueSelection} getIds={this.returnBlueCardIds} />
                        <SelectedCards ref="SelectedRed" owner={"Red"} cardsFull={this.checkRedSelection} getIds={this.returnRedCardIds} />
                    </div>
                    <div className={classes.ButtonContainer}>
                        <button style={{ backgroundColor: (this.state.blueReady && this.state.redReady) ? 'green' : 'red' }}
                                onClick={() => this.sendAllCardIds()}>
                            Play!
                        </button>
                    </div>
                </div>
                <table className={classes.CardCollection}>
                    <tbody className={classes.DisplayCase}>
                        {this.generateCard()}
                    </tbody>
                </table>
            </div>


        )
    }
}

export default GameField