import React from 'react';
import classes from './CardCollectionDisplay.module.css';
import CardDisplay from './CardDisplay/CardDisplay';
import Deck from '../../CardCollection.json';

const DECKSIZE = Object.keys(Deck).length;
const ROWSIZE = 4;

function CardCollectionDisplay() {

    function generateCards() {

        let rows = [];
        for (let i = 1; i <= DECKSIZE / ROWSIZE; i++) {
            let columns = [];
            for (let j = 0; j < ROWSIZE; j++) {
                let offset = 4 * i - 3 + j;
                if (offset > DECKSIZE) break;
                columns.push(
                    <td key={offset} className={classes.CardCase} >
                        <label className={classes.CardName}> {Deck[offset].name} </label>
                        <CardDisplay
                            id={offset}
                            cardPicture={Deck[offset].picture}
                            cardClass={Deck[offset].class}
                            cardValues={Deck[offset].values} />
                    </td>
                )
            }
            rows.push(<tr className={classes.Row} key={i}>{columns}</tr>)
        }
        return rows
    }

    return (
        <table className={classes.CardCollection}>
            <tbody className={classes.DisplayCase}>
                {generateCards()}
            </tbody>
        </table>
    )
}

export default CardCollectionDisplay;