import React from 'react';
import buttonColors from './constansts'

function PlayNumber(props) {

    return (
        <button
            className='number'
            onClick={() => console.log("number", props.number)}
            style={{ backgroundColor: buttonColors[props.status] }} >
            {props.number}
        </button>
    );

}

export default PlayNumber;