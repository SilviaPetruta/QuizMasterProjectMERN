import React from 'react';

const HomeUser = () => {
    return (
        <div>
            <h1>Welcome to the Quiz master</h1>
            <div>
                <a className="btn-style" href="/quizPage">Quiz</a>
                <a className="btn-style" href="/top10">Top 10 Scores</a>
            </div>
        </div>
    )
}

export default HomeUser;
