import React, { useState, useRef, useEffect, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Logo from '../images/logo-white.png';

const Top10 = (props) => {

    const [quizzes, setQuizzes] = useState({quizzesBackend: null});

    const [showUsersScore, setShowUsersScore] = useState(false);

    const [message, setMessage] = useState({
        msgBody: "",
        msgError: ""
    });

    useEffect(() => {
        getUsersInfo();
    }, []);


    const getUsersInfo = async() => {
        const res = await axios.get('/top10');

        let quizzesBackend = res.data.allUsersArray;
        console.log(quizzesBackend);

        setQuizzes({
            quizzesBackend
        });

        setShowUsersScore(true);
    };

    console.log('Frontend Users Info: ', quizzes);
    let usersScore;
    let allQuizzes = [];
    if(showUsersScore) {

        for(let index in quizzes.quizzesBackend) {
            // console.log('User: ',quizzes.quizzesBackend[index].name);
            // console.log('userQuizzes ---------------', userQuizzes);
            let userQuizzes = quizzes.quizzesBackend[index].quiz;

            for(let quizIndex in userQuizzes) {
                // console.log("Quiz ", quizIndex, ":");
                // console.log("Score: ", userQuizzes[quizIndex].score);
                // console.log("Time: ", userQuizzes[quizIndex].time);

                let quizWithUserInfo = {
                    name: quizzes.quizzesBackend[index].name,
                    score: userQuizzes[quizIndex].score,
                    time: userQuizzes[quizIndex].time
                }
                allQuizzes.push(quizWithUserInfo);
            }

        }

        // console.log(allQuizzes);

        allQuizzes.sort((quiz1, quiz2) => {

            // if score is higher, it comes first
            if(quiz1.score > quiz2.score) return -1;
            if(quiz1.score < quiz2.score) return 1;

            // equal scores, compare time
            // if time is lower, it comes first
            if(quiz1.time < quiz2.time) return -1;
            if(quiz1.time > quiz2.time) return 1;

            return 0; // score and time are equal 
        });

        // console.log(allQuizzes);

        usersScore = allQuizzes.map((quiz, index) => {
            return (
                <div className="quiz">
                    <li key={index} className="top10-score-list">
                        <p>User: {quiz.name}</p>
                        <div>
                            <p>Points: {quiz.score}</p>
                            <p>Time: {quiz.time} seconds</p>
                        </div>
                    </li>
                </div>
            );            
        });
    };    

    return (
        <div className="top10-container">
            <h1 className="top10-header">Top 10 Scores</h1>
            {showUsersScore ? 
            <div className="top10-container-true">
                <div className="header__logo-box">
                    <a href="/home">
                        <img src={Logo} alt="Logo" className="header__logo" />
                    </a>
                </div>
                <ul className="top10-score" >
                    {usersScore}
                </ul>
            </div>
            : 
            null}
        </div>
    )
}

export default withRouter(Top10);
