import React, { useState, useEffect } from 'react';
import PlayNumber from './PlayNumber';
import StarsDisplay from './StarsDisplay';
import PlayAgain from './PlayAgain';
import utils from './utils';
import logo from './logo.svg';
import './App.css';
import { statSync } from 'fs';

function App() {

  const [stars, setStars] = useState(utils.random(1, 9));
  const [availableNums, setAvailableNums] = useState(utils.range(1, 9));
  const [candidateNums, setCandidateNums] = useState([]);
  const [secondsLeft, setSecondsLeft] = useState(10);

  useEffect(() => {
    if (secondsLeft > 0 && availableNums.length > 0) {
      const timerId = setTimeout(() => {
        setSecondsLeft(secondsLeft - 1);
      }, 1000);

      return () => { clearTimeout(timerId) }
    }
  });

  const candidatesAreWrong = utils.sum(candidateNums) > stars;
  // const gameIsDone = availableNums.length === 0;
  // const gameIsLost = secondsLeft == 0;

  const gameStatus = availableNums.length === 0 ? 'won' : secondsLeft === 0 ? 'lost' : 'active';

  const resetGame = () => {
    setStars(utils.random(1, 9));
    setAvailableNums(utils.range(1, 9));
    setCandidateNums([]);
  }

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

  const onNumberClick = (number, currentStatus) => {

    if (gameStatus !== 'active' || currentStatus == 'used') {
      return;
    }

    //candidateNums
    const newCandidateNums = currentStatus == 'available' ? candidateNums.concat(number) : candidateNums.filter(cn => cn !== number);

    if (utils.sum(newCandidateNums) !== stars) {
      setCandidateNums(newCandidateNums);
    } else {
      const newAvailableNums = availableNums.filter(n => !newCandidateNums.includes(n));
      setStars(utils.randomSumIn(newAvailableNums, 9));
      setAvailableNums(newAvailableNums);
      setCandidateNums([]);
    }
  }

  return (
    <div className="game">
      <div className="help">
        Pick 1 or more numbers that sum to the number of stars
      </div>
      <div className="body">

        <div className="left">

          {
            gameStatus !== 'active' ? (<PlayAgain onClick={resetGame} gameStatus={gameStatus} />) : (<StarsDisplay count={stars} />)
          }

        </div>

        <div className="right">
          {utils.range(1, 9).map(number =>

            <PlayNumber
              key={number}
              status={numberStatus(number)}
              number={number}
              onClick={onNumberClick} />

          )}
        </div>

      </div>
      <div className="timer">Time Remaining: {secondsLeft}</div>
    </div>
  );
}




export default App;
