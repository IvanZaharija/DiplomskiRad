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
        this.props.getIds(this.state.selectedCards);
    }

    cardSelectedHanlder = (cardId, placeholderId) => {
        let tempState = [...this.state.selectedCards];

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
                    <SelectedPlaceholder id={0} owner={this.props.owner} cardPlaced={this.cardSelectedHanlder} />
                    <SelectedPlaceholder id={1} owner={this.props.owner} cardPlaced={this.cardSelectedHanlder} />
                    <SelectedPlaceholder id={2} owner={this.props.owner} cardPlaced={this.cardSelectedHanlder} />
                    <SelectedPlaceholder id={3} owner={this.props.owner} cardPlaced={this.cardSelectedHanlder} />
                    <SelectedPlaceholder id={4} owner={this.props.owner} cardPlaced={this.cardSelectedHanlder} />
                </div>
            </div>
        )
    }
}

export default SelectedCards