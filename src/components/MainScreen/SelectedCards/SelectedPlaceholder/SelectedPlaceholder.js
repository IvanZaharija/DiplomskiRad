import React, { Component } from 'react';
import classes from './SelectedPlaceholder.module.css';

import Deck from '../../../CardCollection.json';

import speed from '../../../../images/icons/speed.png';
import food from '../../../../images/icons/food.png';
import weight from '../../../../images/icons/weight.png';
import life from '../../../../images/icons/life.png';

class Selectedlaceholder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            placeholderCssClasses: [classes.CardPlaceholder],
            cardId: 1,
            cardValues: [1, 1, 1, 1],
            isCardPlaced: false
        };
    }

    cardPlacedHander = (id) => {
        let onwerClasses = (this.props.owner === "Blue") ? classes.BlueControl : classes.RedControl;
        this.setState({
            isCardPlaced: true,
            cardId: id,
            cardValues: Deck[id].values,
            placeholderCssClasses: [classes.placeholderCssClasses, classes.CardFace, onwerClasses].join(' '),
        })
    }

    dropHandler = (e) => {
        e.preventDefault();
        const recievedCardId = JSON.parse(e.dataTransfer.getData('selectedCardId'));
        if (this.props.cardPlaced(recievedCardId, this.props.placeholderId)) {
            this.cardPlacedHander(recievedCardId);
        }
    }

    dragOverHanlder = (e) => {
        e.preventDefault();
    }

    render() {
        if (this.state.isCardPlaced) {
            return (
                <div className={this.state.placeholderCssClasses}
                    id={this.state.cardId}
                    onDragOver={(e) => this.dragOverHanlder(e)}
                    onDrop={(e) => this.dropHandler(e)}
                >
                    <div className={classes.CardPicture}>
                        <img src={require(`../../../../images/animals/${this.state.cardId}.jpg`)} alt={Deck[this.state.cardId].name} />
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
        } else {
            return (
                <div className={classes.CardPrototype}
                    onDragOver={(e) => this.dragOverHanlder(e)}
                    onDrop={(e) => this.dropHandler(e)}>
                    <img className={classes.SpeedIcon} src={speed} alt="speed" />
                    <img className={classes.FoodIcon} src={food} alt="food" />
                    <img className={classes.WeightIcon} src={weight} alt="wight" />
                    <img className={classes.LifeIcon} src={life} alt="life" />
                </div>
            )
        }
    }
}

export default Selectedlaceholder