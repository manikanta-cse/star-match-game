import React from 'react';

function PlayNumber(props) {

    return (
        <button className='number' onClick={() => console.log("number", props.number)}>{props.number}</button>
    );

}

export default PlayNumber;