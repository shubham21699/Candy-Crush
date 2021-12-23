import React from 'react';

const ScoreBoard = ({ score }) => {
    return (
        <div className='score_board'>
            <h1>Score: {score}</h1>
        </div>
    )
}

export default ScoreBoard;
