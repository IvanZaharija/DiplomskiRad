import React from 'react';

import classes from './MessageAndScoreBoard.module.css';
import HowToTake from '../../../images/instructions/howToTake.png';
import HowToPlace from '../../../images/instructions/howToPlace.png';

const HowToPlaceGuide = "Drag and drop cards to place them on the board."
const HowToTakeGuide = "Place a card with an adjacent value higher than the opponents to take over his card."

function MessageAndScoreBoard (props) {

    function restartHandler () {
        window.location.reload(false);
    };

        if (props.showIntro) {
            return (
                <div className={[classes.Screen, classes.Intro].join(' ')}>
                    <div className={classes.Title}> How to play </div>
                    <div className={classes.Instructions}>
                        <div className={classes.HowToPlace}>
                            <p className={classes.Text} > {HowToPlaceGuide} </p>
                            <img className={classes.ImagePlace} src={HowToPlace} alt="How to place cards" />
                        </div>
                        <div className={classes.HowToTake}>
                            <p className={classes.Text}> {HowToTakeGuide} </p>
                            <img className={classes.ImageTake} src={HowToTake} alt="How to take cards" />
                        </div>
                    </div>
                    <button
                        className={[classes.Button, classes.Close].join(' ')}
                        onClick={props.introController}>
                        Close
                    </button>
                </div>
            )
        } else if (props.showResult) {
            return (
                <div className={[classes.Screen, classes.Result].join(' ')}
                    style={{ transform: props.showResult ? 'translateY(0)' : 'translateY(-100vh)' }}
                >
                    <div className={classes.Title}>  {props.resultMessage}  </div>
                    <div className={classes.Winner}> {props.winner} </div>
                    <div className={classes.ResultValues}>
                        <div className={[classes.Score, classes.Blue].join(' ')}> {props.blueScore} </div>
                        <div className={classes.ScoreDash}> - </div>
                        <div className={[classes.Score, classes.Red].join(' ')}> {props.redScore} </div>
                    </div>
                    <button
                        className={[classes.Button, classes.Restart].join(' ')}
                        onClick={restartHandler}>
                        Restart
                    </button>
                </div>
            )
        } else
            return null
    }

export default MessageAndScoreBoard