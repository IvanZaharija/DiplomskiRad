import React from 'react';
import classes from './CardDisplay.module.css';
// import aa from ''

function CardDisplay(props) {
    // console.log(props.CardClass);
    return <div className={classes.CardFace} >
            <div className={classes.CardPicture}>
                    <img src={require(`../../../images/animals/${props.id}.jpg`)}/>
            </div>
            <div className={classes.ValuesContainer}>
                <div className={classes.TopAndBottom}>
                    <div className={classes.Top}> {props.cardValues[0]} </div>
                    <div className={classes.Bot}> {props.cardValues[1]} </div>
                </div>
                <div className={classes.LeftAndRight}>
                    <div className={classes.Left}> {props.cardValues[2]} </div>
                    <div className={classes.Right}> {props.cardValues[3]} </div>
                </div>
            </div>
    </div>;
}

export default CardDisplay;