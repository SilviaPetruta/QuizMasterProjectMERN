import React from 'react';
import Logo from '../images/logo-white.png';

const HomeUser = () => {
    return (
        <div className="homePageUser">
            <div className="header__logo-box">
                <img src={Logo} alt="Logo" className="header__logo" />
            </div>

            <div className="header__text-box">
                <h1>Welcome to the Quiz master</h1>
                <div>
                    <a className="btnHome btn--purple btn--animated btnQ" href="/quizPage">Quiz</a>
                    <a className="btnHome btn--purple btn--animated" href="/top10">Top 10 Scores</a>
                </div>
            </div>            
        </div>
    )
}

export default HomeUser;
