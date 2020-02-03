import React, { Component } from 'react';

import classes from './ScoreBoard.module.css';


class ScoreBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    render() {
        return (
                <div className={classes.ResultScreen}
                    style={{transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)'}}
                >
                    <div className={classes.ResultTitle}>  {this.props.resultMessage}  </div>
                    <div className={classes.Winner}> {this.props.winner} </div>
                    <div className={classes.ResultValues}>
                        <div className={[classes.Score, classes.Blue].join(' ') }> {this.props.blueScore} </div>
                        <div className={classes.ScoreDash}> - </div>
                        <div className={[classes.Score, classes.Red].join(' ') }> {this.props.redScore} </div>
                    </div>
                </div>
        )
    }
}

export default ScoreBoard