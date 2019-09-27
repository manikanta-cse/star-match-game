import React, { useState } from 'react';
import PlayNumber from './PlayNumber';
import StarsDisplay from './StarsDisplay';
import utils from './utils';
import logo from './logo.svg';
import './App.css';
import { statSync } from 'fs';

function App() {

  const [stars, setStars] = useState(utils.random(1, 9));
  const [availableNums, setAvailableNums] = useState(utils.range(1, 9));
  const [candidateNums, setCandidateNums] = useState([]);

  const candidatesAreWrong = utils.sum(candidateNums) > stars;

  //arrow function
  const numberStatus = (number) => {
    if (!availableNums.includes(number)) {
      return 'used';
    }

    if (candidateNums.includes(number)) {
      return candidatesAreWrong ? 'wrong' : 'candidate';
    }

    return 'available';
  }

  return (
    <div className="game">
      <div className="help">
        Pick 1 or more numbers that sum to the number of stars
      </div>
      <div className="body">

        <div className="left">

          <StarsDisplay count={stars} />

        </div>

        <div className="right">
          {utils.range(1, 9).map(number =>

            <PlayNumber
              key={number}
              status={numberStatus(number)}
              number={number} />

          )}
        </div>

      </div>
      <div className="timer">Time Remaining: 10</div>
    </div>
  );
}




export default App;
