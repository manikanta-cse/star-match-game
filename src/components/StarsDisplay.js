import React from 'react';
import utils from '../math-utils'; 

function StarsDisplay(props) {

    return (
        <>
            {utils.range(1, props.count).map(starId =>

                <div key={starId} className="star" />

            )}

        </>
    )
}

export default StarsDisplay;