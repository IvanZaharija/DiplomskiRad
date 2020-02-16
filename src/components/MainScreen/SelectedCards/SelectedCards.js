import React, { Component } from 'react';

import classes from './SelectedCards.module.css';
import SelectedPlaceholder from './SelectedPlaceholder/SelectedPlaceholder';

class SelectedCards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedCards: [null, null, null, null, null]
        };
    }

    componentDidUpdate() {
        if (!this.state.selectedCards.includes(null)) {
            this.props.cardsFull(true)
        }
    }

    fetchSelectedIds() {
        this.props.getCardIds(this.state.selectedCards);
    }

    selectedCardHanlder = (cardId, placeholderId) => {
        let tempState = [...this.state.selectedCards];
        console.log(placeholderId);
        if (tempState.includes(cardId)) {
            return false
        }
        else {
            tempState[placeholderId] = cardId
            this.setState({ selectedCards: tempState })
            return true
        }
    }

    render() {
        return (
            <div className={classes.SelectedCards}>
                <label className={[classes.SelectedOwner, (this.props.owner === "Blue") ? classes.BlueOwner : classes.RedOwner].join(' ')}>{this.props.owner}</label>
                <div className={[classes.SelectedPlaceholders, (this.props.owner === "Blue") ? classes.BlueOwner : classes.RedOwner].join(' ')}>
                    <SelectedPlaceholder placeholderId={0} owner={this.props.owner} cardPlaced={this.selectedCardHanlder} />
                    <SelectedPlaceholder placeholderId={1} owner={this.props.owner} cardPlaced={this.selectedCardHanlder} />
                    <SelectedPlaceholder placeholderId={2} owner={this.props.owner} cardPlaced={this.selectedCardHanlder} />
                    <SelectedPlaceholder placeholderId={3} owner={this.props.owner} cardPlaced={this.selectedCardHanlder} />
                    <SelectedPlaceholder placeholderId={4} owner={this.props.owner} cardPlaced={this.selectedCardHanlder} />
                </div>
            </div>
        )
    }
}

export default SelectedCards