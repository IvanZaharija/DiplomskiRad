import React, { Component } from 'react';
import classes from './Card.module.css';

import Deck from '../../../CardCollection.json';

class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cardCssClasses: null,
            cardHiddenClasses: [classes.CardBack, classes.InHand].join(' '),
            cardValues: [0, 0, 0, 0],
            draggedTarget: null
        };
    }

    componentDidMount() {
        this.cardClassesHanlder();
        this.setState({ cardValues: Deck[this.props.cardId].values })
    }

    cardClassesHanlder = () => {
        let setCardColor;
        let setHandPosition;

        if (this.props.cardOwner === "Blue") {
            setCardColor = classes.BlueControl;
            setHandPosition = classes.InLeftHand;
        } else if (this.props.cardOwner === "Red") {
            setCardColor = classes.RedControl;
            setHandPosition = classes.InRightHand;
        } else
            return console.error("CardOwnerError");

        this.setState({
            cardOwner: this.props.cardOwner,
            cardCssClasses: [classes.CardFace, classes.InHand, setCardColor, setHandPosition].join(' ')
        })
    }

    triggerRemoveCard = () => {
        let tempState = this.state.draggedTarget
        tempState.style.display = "none";
    }

    onDragStartHandler = (e) => {
        const target = e.target;
        let cardInfo = {
            "cardId": this.props.cardId,
            "handPositionId": this.props.id,
            "cardOwner": this.props.cardOwner
        }
        e.dataTransfer.setData('sendCardInfo', JSON.stringify(cardInfo))
        this.setState({ draggedTarget: target })
    }

    dragOverHandler = (e) => {
        e.preventDefault();
    }

    render() {
        return (
            <div className={(this.props.draggable) ? this.state.cardCssClasses : this.state.cardHiddenClasses}
                id={this.props.id}
                draggable={this.props.draggable}
                onDragStart={(e) => this.onDragStartHandler(e)}
                onDragOver={(e) => this.dragOverHandler(e)}
            >
                <div className={classes.CardPicture}>
                    <img 
                        src={require(`../../../../images/animals/${this.props.cardId}.jpg`)} 
                        alt={Deck[this.props.cardId].name} />
                    <div className={classes.CardName}> {Deck[this.props.cardId].name} </div>
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