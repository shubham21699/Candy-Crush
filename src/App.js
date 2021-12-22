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
