import React from 'react';
import classes from './CardDisplay.module.css';

function CardDisplay(props) {

    function onDragStart (e) {
        e.dataTransfer.setData('selectedCardId', props.id)
    }

    function dragOver (e) {
        e.preventDefault();
    }

    return <div className={[classes.CardFace, classes[props.cardClass] ].join(' ')}
                draggable={true}
                onDragStart={(e) => onDragStart(e)}
                onDragOver={(e) => dragOver(e)}> 
        <div className={classes.CardPicture}>
            <img src={require(`../../../../images/animals/${props.id}.jpg`)} alt={props.id + ". Animal"}/>
        </div>
        <div className={classes.ValuesContainer}>
            <div className={classes.TopAndBottom}>
                <div className={classes.Top}> {props.cardValues[0]} </div>
                <div className={classes.Bot}> {props.cardValues[2]} </div>
            </div>
            <div className={classes.LeftAndRight}>
                <div className={classes.Left}> {props.cardValues[3]} </div>
                <div className={classes.Right}> {props.cardValues[1]} </div>
            </div>
        </div>
    </div>;
}

export default CardDisplay;