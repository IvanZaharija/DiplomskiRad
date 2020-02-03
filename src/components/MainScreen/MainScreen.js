import React, { Component } from 'react';

import classes from './MainScreen.module.css';
import Deck from '../CardCollection.json';
import CardDisplay from './CardDisplay/CardDisplay';

class GameField extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: Deck,
            deckSize: null
        };
    }

    componentDidMount() {
        this.setState({ deckSize: Object.keys(this.state.cards).length })
    }

    componentDidUpdate() {
        console.log(Object.keys(this.state.cards).length);
    }

    generateCard() {
        // const Card = Object.keys(this.state.cards).map((key, i) => (
        //         <td className={classes.CardCase}>
        //             <label> {Deck[key].name} </label>
        //             <CardDisplay cardPicture={Deck[key].picture} cardClass={Deck[key].class} cardValues={Deck[key].values} />
        //         </td>
        //         ));

        let row = [];
        for (let i = 1; i < this.state.deckSize; i++) {
            let column = [];
            for (let j = 0; j < 4; j++) {
                let pomak = 4*i -3 + j;
                if (pomak > this.state.deckSize) break;
                // console.log(pomak);
                column.push(
                    <td className={classes.CardCase} >
                        <label> {Deck[pomak].name} </label>
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
            <table>
                <tbody className={classes.DisplayCase}>
                    {this.generateCard()}
                </tbody>
            </table>
            
        )
    }
}

export default GameField