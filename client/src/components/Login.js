import React, { useState, useRef, useEffect, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import AuthService from '../middlewares/AuthService';
import {AuthContext} from '../Context/AuthContext.js';


const Login = (props) => {

    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const [message, setMessage] = useState({
        msgBody: "",
        msgError: ""
    });

    const authContext = useContext(AuthContext);

    let timerID = useRef(null);

    useEffect(()=>{
        return ()=>{
            clearTimeout(timerID);
        }
    },[]);

    const getUserInfo = (event) => {
        console.log(event.target.value);
        setUser({
            ...user,
            [event.target.name]: event.target.value
        });
    };

    const resetForm = ()=>{
        setUser({
            email: "",
            password : ""
        });
    }

    const sendData = async (event) => {
        event.preventDefault();
        // console.log("Form to be submitted");

        const body = JSON.stringify({
            userEmailForm: user.email,
            userPasswordForm: user.password
        });

        AuthService.login(body).then(async(data) => {
            const { isAuthenticated, message, user } = data;
            setMessage(message);
            resetForm();

            if(isAuthenticated) {
                authContext.setUser(user);
                authContext.setIsAuthenticated(isAuthenticated);

                if(!message.msgError){
                    timerID = setTimeout(()=>{
                        props.history.push(`/quizPage`);
                    },500);
                }
            }            
        });
    };

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

export default withRouter(Login);
