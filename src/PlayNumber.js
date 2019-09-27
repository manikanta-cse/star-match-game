import React from 'react';
import buttonColors from './constansts'

function PlayNumber(props) {

    return (
        <button
            className='number'
            onClick={() => props.onClick(props.number, props.status)}
            style={{ backgroundColor: buttonColors[props.status] }} >
            {props.number}
        </button>
    );

}

export default PlayNumber;