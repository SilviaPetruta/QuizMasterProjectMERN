import React from 'react';
import Logo from '../images/logo-white.png';

const Home = () => {
    return (
        <div className="header">
            <div className="header__logo-box">
                <img src={Logo} alt="Logo" className="header__logo" />
            </div>
            
            <div className="header__text-box">
                <h1 className="heading-primary">
                    <span className="heading-primary--main">Welcome to the Quiz master</span>
                    <span className="heading-primary--sub">Log into an existing account or sign up:</span>
                </h1>
                <a className="btnHome btn--white btn--animated btnLeft" href="/login">Login</a>
                <a className="btnHome btn--white btn--animated" href="/register">Register</a>
            </div>
        </div>
    )
}

export default Home;
