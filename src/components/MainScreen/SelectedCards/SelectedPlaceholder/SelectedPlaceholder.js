import React, { Component } from 'react';
import classes from './SelectedPlaceholder.module.css';

import Deck from '../../../CardCollection.json';

class Selectedlaceholder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            placeholderCssClasses: [classes.CardPlaceholder],
            cardId: 1,
            cardValues: [1, 1, 1, 1],
        };
    }

    cardPlacedHander = (id) => {
        let onwerClasses = (this.props.owner === "Blue") ? classes.BlueControl : classes.RedControl;
        this.setState({
            cardId: id,
            cardValues: Deck[id].values,
            placeholderCssClasses: [classes.placeholderCssClasses, classes.CardFace, onwerClasses].join(' ')
        })
    }

    drop = (e) => {
        e.preventDefault();
        const recievedData = JSON.parse(e.dataTransfer.getData('selectedCardId'));

        if (this.props.cardPlaced(recievedData, this.props.id)){
            this.cardPlacedHander(recievedData);
        }
    }

    dragOver = (e) => {
        e.preventDefault();
    }

    render() {
        return (
            <div className={this.state.placeholderCssClasses}
                id={this.state.id}
                onDragOver={(e) => this.dragOver(e)}
                onDrop={(e) => this.drop(e)}
            >
                <div className={classes.CardPicture}>
                    <img src={require(`../../../../images/animals/${this.state.cardId}.jpg`)} />
                    <div className={classes.CardName}> {Deck[this.state.cardId].name} </div>
                </div>
                <div className={classes.ValuesContainer}>
                    <div className={classes.TopAndBottom}>
                        <div className={classes.Top}> {this.state.cardValues[0]} </div>
                        <div className={classes.Bot}> {this.state.cardValues[2]} </div>
                    </div>
                    <div className={classes.LeftAndRight}>
                        <div className={classes.Left}> {this.state.cardValues[3]} </div>
                        <div className={classes.Right}> {this.state.cardValues[1]} </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default Selectedlaceholder