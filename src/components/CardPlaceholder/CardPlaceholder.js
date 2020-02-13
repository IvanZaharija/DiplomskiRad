import React, { Component } from 'react';
import classes from './CardPlaceholder.module.css';

import Deck from '../CardCollection.json';

class CardPlaceholder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            placeholderCssClasses: [classes.CardPlaceholder],
            owned: null,
            handPositionId: null,
            cardOwner: null,
            cardId: 1,
            cardValues: [1, 1, 1, 1],
            animated: false,
        };
    }

    componentDidUpdate(prevProps, prevState) {
            if ((prevState.cardOwner !== this.state.cardOwner) && !this.props.onBoard) {
                this.props.cardPlaced(this.state.cardOwner, this.state.handPositionId, this.props.placeholderId, this.state.cardId);
                this.handleCardPlacment(this.state.cardOwner);
            }


        if ((prevProps.onBoard !== this.props.onBoard) && (prevProps.onBoard !== false)) {
            this.handleCardPlacment(this.props.onBoard, false);
        }
    }

    handleCardPlacment = (owner, changedOwner) => {
        let onwerClasses = (owner === "Blue") ? classes.BlueControl : classes.RedControl;
        let animationClass = (changedOwner === false) ? classes.Animate : classes.Nesto;
        this.setState({
            placeholderCssClasses: [classes.placeholderCssClasses, classes.CardFace, onwerClasses, animationClass].join(' ')
        },
            () => {
                setTimeout(() => {
                    this.setState({ placeholderCssClasses: [classes.placeholderCssClasses, classes.CardFace, onwerClasses].join(' ') })
                }, 500);
            })
    }

    drop = (e) => {
        if (!this.props.onBoard) {
            e.preventDefault();
            const recievedData = JSON.parse(e.dataTransfer.getData('sendCardInfo'));
            this.transfromValuesHandler(recievedData);
        }
    }

    transfromValuesHandler = (data) => {
        this.setState({ cardId: data.cardId, handPositionId: data.handPositionId, cardOwner: data.cardOwner, cardValues: Deck[data.cardId].values });
    }

    dragOver = (e) => {
        e.preventDefault();
    }

    render() {
        return (
            <div className={this.state.placeholderCssClasses}
                id={this.props.id}
                onDragOver={(e) => this.dragOver(e)}
                onDrop={(e) => this.drop(e)}
            >
                <div className={classes.CardPicture}>
                    <img src={require(`../../images/animals/${this.state.cardId}.jpg`)} alt={Deck[this.state.cardId].name} />
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

export default CardPlaceholder