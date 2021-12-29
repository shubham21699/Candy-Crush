import React, { useState, useEffect } from 'react';
import './App.css'; 
import blankSpace from './images/blank.png';
import blueCandy from './images/blue-candy.png';
import greenCandy from './images/green-candy.png';
import orangeCandy from './images/orange-candy.png';
import purpleCandy from './images/purple-candy.png';
import redCandy from './images/red-candy.png';
import yellowCandy from './images/yellow-candy.png';
import brownCandy from './images/brown-candy.png';
import ScoreBoard from './ScoreBoard';
// import ReactAudioPlayer from 'react-audio-player';


const board_width = 8;
const candy_colors = [
  blueCandy,
  greenCandy,
  orangeCandy,
  purpleCandy,
  redCandy,
  yellowCandy,
  brownCandy
];

function App() {

  // <ReactAudioPlayer
  //   src='src/Music/CandyCrushSagaSong.mp3'
  //   autoPlay
  //   controls
  // />

  const [currentCandyArrangement, setCurrentCandyArrangement] = useState([]);
  const [squareBeingDragged, setSquareBeingDragged] = useState(null)
  const [squareBeingReplaced, setSquareBeingReplaced] = useState(null);
  const [scoreDisplay, setScoreDisplay] = useState(0);

  const checkForColumnOfThree = () => {
    for(let i=0 ; i<=47 ; i++) { // It will loop till 48th block to check for the column of size 3 in vertical direction.
      
      // Here, for example: 0, 8, 16 are the three indexes which form a column of size three at 0th index
      // and it will now check for that column whether it will satisfy the condition.
      const columnOfThree = [i, i+board_width, i+(board_width*2)];

      // It will check the column for the color present at ith index whether all three boxes are of same candy or not.
      const decidedColor = currentCandyArrangement[i];

      // check if blank space appears after a march
      const isBlank = currentCandyArrangement[i] === blankSpace;

      // If all the three elements in the column are of same candy color
      if(columnOfThree.every(square => currentCandyArrangement[square] === decidedColor && !isBlank)) {
        setScoreDisplay((score) => score + 3);
        columnOfThree.forEach(square => currentCandyArrangement[square] = blankSpace);
        return true;
      }

    }
  }

  const checkForColumnOfFour = () => {
    for(let i=0 ; i<=39 ; i++) { // It will loop till 40th block to check for the column of size 4 in vertical direction.
      
      // Here, for example: 0, 8, 16 are the three indexes which form a column of size four at 0th index
      // and it will now check for that column whether it will satisfy the condition.
      const columnOfFour = [i, i+board_width, i+(board_width*2), i+(board_width*3)];

      // It will check the column for the color present at ith index whether all three boxes are of same candy or not.
      const decidedColor = currentCandyArrangement[i];

      // check if blank space appears after a march
      const isBlank = currentCandyArrangement[i] === blankSpace;

      // If all the three elements in the column are of same candy color. 
      if(columnOfFour.every(square => currentCandyArrangement[square] === decidedColor && !isBlank)) {
        setScoreDisplay((score) => score + 4);
        columnOfFour.forEach(square => currentCandyArrangement[square] = blankSpace);
        return true;
      }

    }
  }

  const checkForRowOfThree = () => {
    for(let i=0 ; i<64 ; i++) { // It will loop till 48th block to check for the column of size 3 in vertical direction.
      
      // Here, for example: 0, 1, 1 are the three indexes which form a row of size three at 0th index
      // and it will now check for that row whether it will satisfy the condition.
      const rowOfThree = [i, i+1, i+2];

      // It will check the row for the color present at ith index whether all three boxes are of same candy or not.
      const decidedColor = currentCandyArrangement[i];

      // check if blank space appears after a march
      const isBlank = currentCandyArrangement[i] === blankSpace;

      const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64];

      if(notValid.includes(i)) continue;

      // If all the three elements in therow are of same candy color.
      if(rowOfThree.every(square => currentCandyArrangement[square] === decidedColor && !isBlank)) {
        setScoreDisplay((score) => score + 3);
        rowOfThree.forEach(square => currentCandyArrangement[square] = blankSpace);
        return true;
      }

    }
  }

  const checkForRowOfFour = () => {
    for(let i=0 ; i<64 ; i++) { // It will loop till 48th block to check for the column of size 3 in vertical direction.
      
      // Here, for example: 0, 1, 2, 3 are the four indexes which form a row of size four at 0th index
      // and it will now check for that row whether it will satisfy the condition.
      const rowOfFour = [i, i+1, i+2, i+3];

      // It will check the row for the color present at ith index whether all three boxes are of same candy or not.
      const decidedColor = currentCandyArrangement[i];

      // check if blank space appears after a march
      const isBlank = currentCandyArrangement[i] === blankSpace;

      const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 62, 63, 64];

      if(notValid.includes(i)) continue;

      // If all the three elements in the row are of same candy color.
      if(rowOfFour.every(square => currentCandyArrangement[square] === decidedColor && isBlank)) {
        setScoreDisplay((score) => score + 4);
        rowOfFour.forEach(square => currentCandyArrangement[square] = blankSpace);
        return true;
      }

    }
  }

  const moveIntoSquareBelow = () => {

    for(let i=0 ; i<=55 ; i++) {

      const first_row = [0, 1, 2, 3, 4, 5, 6, 7];
      const is_first_row = first_row.includes(i);

      if(is_first_row && currentCandyArrangement[i] === blankSpace) {
        let random_candy = Math.floor(Math.random() * candy_colors.length);
        currentCandyArrangement[i] = candy_colors[random_candy];
      }

      // If the below of one we are looping for is blank, then we move it down.
      if(currentCandyArrangement[i + board_width] === blankSpace) {
        currentCandyArrangement[i+board_width] = currentCandyArrangement[i];
        currentCandyArrangement[i] = blankSpace;
      }

    }

  } 

  console.log('Score: ', scoreDisplay);

  const dragStart = (e) => {
    console.log(e.target);
    console.log('Drag Start');
    setSquareBeingDragged(e.target);
  }

  const dragDrop = (e) => {
    console.log(e.target);
    console.log('Drag Drop');
    setSquareBeingReplaced(e.target);
  }

  const dragEnd = (e) => {
    // console.log(e.target);
    console.log('Drag End');

    const squareBeingDraggedId = parseInt(squareBeingDragged.getAttribute('data_id'));
    const squareBeingReplacedId = parseInt(squareBeingReplaced.getAttribute('data_id'));

    currentCandyArrangement[squareBeingReplacedId] = squareBeingDragged.getAttribute('src');
    currentCandyArrangement[squareBeingDraggedId] = squareBeingReplaced.getAttribute('src');

    console.log('sqaureBeingDraggedId: ', squareBeingDraggedId);
    console.log('squareBeingReplacedId: ', squareBeingReplacedId);

    // Check if moving 1 position up, down, left or right can form a valid match,
    // only then make it mode otherwise it will remain in its position.
    const validMoves = [
      squareBeingDraggedId - 1,
      squareBeingDraggedId - board_width,
      squareBeingDraggedId + 1,
      squareBeingDraggedId + board_width
    ];

    const validMove = validMoves.includes(squareBeingReplacedId);

    const isColumnOfFour = checkForColumnOfFour();
    const isRowOfFour = checkForRowOfFour();
    const isColumnOfThree = checkForColumnOfThree();
    const isRowOfThree = checkForRowOfThree();

    if(squareBeingReplacedId && validMove && 
      (isColumnOfFour || isRowOfFour || isColumnOfThree || isRowOfThree)) {
        setSquareBeingReplaced(null);
        setSquareBeingDragged(null);
      }
      else {
        currentCandyArrangement[squareBeingReplacedId] = squareBeingReplaced.getAttribute('src');
        currentCandyArrangement[squareBeingDraggedId] = squareBeingDragged.getAttribute('src');
        setCurrentCandyArrangement([...currentCandyArrangement]);
      }

  }


  // board width is 8 so its height is also 8 so we need to create a board of 8x8 = 64 sqaures in which
  // random candies to be appeared.
  const createBoard = () => {
    const randomCandyArrangement = [];

    for(let i=0 ; i<board_width*board_width ; i++) {
      const randomCandy = candy_colors[Math.floor(Math.random() * candy_colors.length)];
      randomCandyArrangement.push(randomCandy);
    }

    setCurrentCandyArrangement(randomCandyArrangement);
    // console.log(randomCandyArrangement); 
  }

  // console.log(currentCandyArrangement);

  useEffect(() => {
    createBoard();
  }, []);

  useEffect(() => {

    const timer = setInterval(() => {

      checkForColumnOfFour();
      checkForColumnOfThree();
      checkForRowOfThree();
      checkForColumnOfFour();
      moveIntoSquareBelow();
      setCurrentCandyArrangement([...currentCandyArrangement]);

    }, 100); // It will run after every 100 millisecond.
    return () => clearInterval(timer);

  }, [checkForColumnOfFour, checkForColumnOfThree, checkForRowOfFour, checkForRowOfThree, moveIntoSquareBelow, currentCandyArrangement]);


  return (
    <div className="App">
      <div className="board">
        {currentCandyArrangement.map((candyColor, index) => (
          <img 
            key={index}
            src={candyColor}
            alt={candyColor}
            data_id={index}
            draggable={true}
            onDragStart={dragStart}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => e.preventDefault()}
            onDragLeave={(e) => e.preventDefault()}
            onDrop={dragDrop}
            onDragEnd={dragEnd}
          />
        ))}
      </div>
       <ScoreBoard score={scoreDisplay}/>
    </div>
  );
}

export default App;
