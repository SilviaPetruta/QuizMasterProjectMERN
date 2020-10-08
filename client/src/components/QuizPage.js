import React, { useState, useRef, useEffect } from 'react';
import AuthService from '../middlewares/AuthService';


const QuizPage = (props) => {

    

    return (
        <div>
            <form className='login' onSubmit={sendData}>
                <h1>LOGIN</h1>
                <h2>{message.msgBody}</h2>
                <label htmlFor="userEmailForm">Email</label>
                <input 
                    onChange={getUserInfo}
                    id="userEmailForm"
                    type="email" 
                    name="email" required />
                <label htmlFor="userPasswordForm">Password</label>
                <input 
                    onChange={getUserInfo}
                    id="userPasswordForm"
                    type="password" 
                    name="password"
                    required />
                <button 
                    className="btn btn-lg btn-primary btn-block" 
                    type="submit">Login</button>
            </form>
        </div>
    )
}

export default QuizPage;
