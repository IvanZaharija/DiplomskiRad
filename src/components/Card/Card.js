import React, { Component } from 'react';
import classes from './Card.module.css';

import Deck from '../CardCollection.json';



class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cardCssClasses: null,
            cardHiddenClasses: [classes.CardBack, classes.InHand].join(' '),
            cardValues: [0, 0, 0, 0],
            target: null
        };
    }

    componentDidMount() {
        this.cardClassesHanlder();
        this.setState({ cardValues: Deck[this.props.cardID].values })
    }

    cardClassesHanlder = () => {
        let cardOwner = this.props.cardOwner;
        let cardColor = (cardOwner === "Blue") ? classes.BlueControl : classes.RedControl;
        let handPosition = (cardOwner === "Blue") ? classes.InLeftHand : classes.InRightHand;

        this.setState({ cardOwner: cardOwner, cardCssClasses: [classes.CardFace, classes.InHand, cardColor, handPosition].join(' ') })
    }

    triggerRemoveCard = () => {
        let targetRemove = this.state.target;
        targetRemove.style.display = "none";
    }

    onDragStart = (e) => {
        const target = e.target;
        let cardInfo = {
            "cardId": this.props.cardID,
            "handPositionId": this.props.id,
            "cardOwner": this.props.cardOwner
        }
        e.dataTransfer.setData('sendCardInfo', JSON.stringify(cardInfo))
        this.setState({ target: target })
    }

    dragOver = (e) => {
        e.preventDefault();
    }

    render() {

        return (
            <div className={ (this.props.draggable) ? this.state.cardCssClasses : this.state.cardHiddenClasses}
                id={this.props.id}
                draggable={this.props.draggable}
                onDragStart={(e) => this.onDragStart(e)}
                onDragOver={(e) => this.dragOver(e)}
            >
                <div className={classes.CardPicture}>
                    <img src={require(`../../images/animals/${this.props.cardID}.jpg`)} alt={Deck[this.props.cardID].name} />
                    <div className={classes.CardName}> {Deck[this.props.cardID].name} </div>
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

export default Card