import React from 'react';

const ScoreBoard = ({ score }) => {
    return (
        <div className='score_board' style={{backgoundColor: 'red'}}>
            <h2>Score: {score}</h2>
        </div>
    )
}

export default ScoreBoard;
