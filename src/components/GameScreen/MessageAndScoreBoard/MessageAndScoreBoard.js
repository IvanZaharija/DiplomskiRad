import React, { Component } from 'react';

import classes from './MessageAndScoreBoard.module.css';
import HowToTake from '../../../images/instructions/howToTake.png'
import HowToPlace from '../../../images/instructions/howToPlace.png'

class MessageAndScoreBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            howToPlaceText: "Drag and drop cards to place them on the board.",
            howToTakeText: "Place a card with an adjacent value higher than the opponents to take over his card."
        };
    }

    restartHandler () {
        window.location.reload(false);
    }

    render() {
        if (this.props.showIntro) {
            return (
                <div className={[classes.Screen, classes.Intro].join(' ')}>
                    <div className={classes.Title}> How to play </div>
                    <div className={classes.Instructions}>
                        <div className={classes.HowToPlace}>
                            <p className={classes.Text} > {this.state.howToPlaceText} </p>
                            <img className={classes.ImagePlace} src={HowToPlace} alt="How to place cards" />
                        </div>
                        <div className={classes.HowToTake}>
                            <p className={classes.Text}> {this.state.howToTakeText} </p>
                            <img className={classes.ImageTake} src={HowToTake} alt="How to take cards" />
                        </div>
                    </div>
                    <button
                        className={[classes.Button, classes.Close].join(' ')}
                        onClick={this.props.introController}>
                        Close
                    </button>
                </div>
            )
        } else if (this.props.showResult) {
            return (
                <div className={[classes.Screen, classes.Result].join(' ')}
                    style={{ transform: this.props.showResult ? 'translateY(0)' : 'translateY(-100vh)' }}
                >
                    <div className={classes.Title}>  {this.props.resultMessage}  </div>
                    <div className={classes.Winner}> {this.props.winner} </div>
                    <div className={classes.ResultValues}>
                        <div className={[classes.Score, classes.Blue].join(' ')}> {this.props.blueScore} </div>
                        <div className={classes.ScoreDash}> - </div>
                        <div className={[classes.Score, classes.Red].join(' ')}> {this.props.redScore} </div>
                    </div>
                    <button
                        className={[classes.Button, classes.Restart].join(' ')}
                        onClick={this.restartHandler}>
                        Restart
                    </button>
                </div>
            )
        } else
            return null
    }
}

export default MessageAndScoreBoard