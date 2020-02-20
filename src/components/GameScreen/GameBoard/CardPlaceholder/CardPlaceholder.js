import React, { Component } from 'react';
import classes from './CardPlaceholder.module.css';
import Deck from '../../../CardCollection.json';

class CardPlaceholder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            placeholderCssClasses: [classes.CardPlaceholder],
            handPositionId: null,
            cardOwner: null,
            cardId: 1,
            cardValues: [1, 1, 1, 1],
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.cardOwner !== this.state.cardOwner) {
            this.props.cardPlaced(this.state.cardOwner, this.state.handPositionId, this.props.placeholderId, this.state.cardId);
            this.cardPlacedHander(this.state.cardOwner);
            console.log("Prvi");
        }

        if ((prevProps.hasOwner !== this.props.hasOwner) && prevProps.hasOwner) {
            this.cardPlacedHander(this.props.hasOwner, true);
            console.log("Drugi");
        }
    }

    cardPlacedHander = (owner, changedOwner) => {
        let onwerClasses = (owner === "Blue") ? classes.BlueControl : classes.RedControl;
        let animationClass = (changedOwner) ? classes.Animate : classes.NoAnimation;
        this.setState({
            placeholderCssClasses: [classes.placeholderCssClasses, classes.CardFace, onwerClasses].join(' ')
        },
            () => {   
                if (changedOwner) {
                    setTimeout(() => {
                        this.setState({ placeholderCssClasses:
                            [classes.placeholderCssClasses,
                                classes.CardFace, onwerClasses, animationClass].join(' ') })
                    }, 0);
                }
            })
    }

    dropHanlder = (e) => {
        if (!this.props.hasOwner) {
            e.preventDefault();
            const recievedData = JSON.parse(e.dataTransfer.getData('sendCardInfo'));
            this.transfromValuesHandler(recievedData);
        }
    }

    transfromValuesHandler = (data) => {
        this.setState({ cardId: data.cardId, handPositionId: data.handPositionId, cardOwner: data.cardOwner, cardValues: Deck[data.cardId].values });
    }

    dragOverHandler = (e) => {
        e.preventDefault();
    }

    render() {
        return (
            <div className={this.state.placeholderCssClasses}
                id={this.props.id}
                onDragOver={(e) => this.dragOverHandler(e)}
                onDrop={(e) => this.dropHanlder(e)}
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
    }
}

export default CardPlaceholder