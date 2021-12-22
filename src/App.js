import React, { useState, useEffect } from 'react';
import './App.css'; 

const board_width = 8;
const candy_colors = [
  'blue',
  'green',
  'orange',
  'purple',
  'red',
  'yellow'
];

function App() {

  const [currentCandyArrangement, setCurrentCandyArrangement] = useState([]);

  const checkForColumnOfThree = () => {
    for(let i=0 ; i<47 ; i++) { // It will loop till 48th block to check for the column of size 3 in vertical direction.
      
      // Here, for example: 0, 8, 16 are the three indexes which form a column of size three at 0th index
      // and it will now check for that column whether it will satisfy the condition.
      const columnOfThree = [i, i+board_width, i+(board_width*2)];

      // It will check the column for the color present at ith index whether all three boxes are of same candy or not.
      const decidedColor = currentCandyArrangement[i];

      // If all the three elements in the column are of same candy color
      if(columnOfThree.every(square => currentCandyArrangement[square] === decidedColor)) {
        columnOfThree.forEach(square => currentCandyArrangement[square] = '');
      }

    }
  }

  const checkForColumnOfFour = () => {
    for(let i=0 ; i<39 ; i++) { // It will loop till 40th block to check for the column of size 4 in vertical direction.
      
      // Here, for example: 0, 8, 16 are the three indexes which form a column of size four at 0th index
      // and it will now check for that column whether it will satisfy the condition.
      const columnOfFour = [i, i+board_width, i+(board_width*2), i+(board_width*3)];

      // It will check the column for the color present at ith index whether all three boxes are of same candy or not.
      const decidedColor = currentCandyArrangement[i];

      // If all the three elements in the column are of same candy color. 
      if(columnOfFour.every(square => currentCandyArrangement[square] === decidedColor)) {
        columnOfFour.forEach(square => currentCandyArrangement[square] = '');
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
      const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64];

      if(notValid.includes(i)) continue;

      // If all the three elements in therow are of same candy color.
      if(rowOfThree.every(square => currentCandyArrangement[square] === decidedColor)) {
        rowOfThree.forEach(square => currentCandyArrangement[square] = '');
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
      const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 62, 63, 64];

      if(notValid.includes(i)) continue;

      // If all the three elements in the row are of same candy color.
      if(rowOfFour.every(square => currentCandyArrangement[square] === decidedColor)) {
        rowOfFour.forEach(square => currentCandyArrangement[square] = '');
      }

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

  console.log(currentCandyArrangement);

  useEffect(() => {
    createBoard();
  }, []);

  useEffect(() => {

    const timer = setInterval(() => {

      checkForColumnOfFour();
      checkForColumnOfThree();
      checkForRowOfThree();
      checkForColumnOfFour();
      setCurrentCandyArrangement([...currentCandyArrangement]);

    }, 100); // It will run after every 100 millisecond.
    return () => clearInterval(timer);

  }, [checkForColumnOfFour, checkForColumnOfThree, checkForRowOfFour, checkForRowOfThree, currentCandyArrangement]);


  return (
    <div className="App">
      <div className="board">
        {currentCandyArrangement.map((candyColor, index) => (
          <img 
            key={index}
            style={{ backgroundColor: candyColor}}
            alt={candyColor}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
