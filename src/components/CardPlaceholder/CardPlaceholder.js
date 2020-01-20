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
            cardId: null,
            cardValues: [1, 1, 1, 1]
        };
    }

    componentDidUpdate(pevProps, prevState) {
        if ((prevState.cardOwner !== this.state.cardOwner) && !this.props.onBoard) {
            // console.log(this.state.cardOwner, this.state.handPositionId, this.props.placeholderId, this.state.cardId);
            this.props.cardPlaced(this.state.cardOwner, this.state.handPositionId, this.props.placeholderId, this.state.cardId);
            this.handleCardPlacment();
        }
    }

    handleCardPlacment = () => {
        let onwerClasses = (this.state.cardOwner === "Blue") ? classes.BlueControl : classes.RedControl;
        this.setState({ placeholderCssClasses: [classes.placeholderCssClasses, classes.CardFace, onwerClasses].join(' ') })
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
                    Picture
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