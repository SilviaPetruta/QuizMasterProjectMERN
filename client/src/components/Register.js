import React, { useState, useRef, useEffect, Context } from 'react';
import axios from 'axios';
import AuthService from '../middlewares/AuthService';
import Logo from '../images/logo-white.png';

const Register = (props) => {

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: ""
    });
    const [message, setMessage] = useState({
        msgBody: "",
        msgError: ""
    });

    let timerID = useRef(null);

    useEffect(()=>{
        return ()=>{
            clearTimeout(timerID);
        }
    },[]);

    const getUserInfo = (event) => {
        console.log(event.target.name + ' ' + event.target.value);

        setUser({
            ...user,
            [event.target.name]: event.target.value
        });
    };

    const sendData = async (event) => {
        event.preventDefault();
        console.log("Form to be submitted");

        const body = JSON.stringify({
            userNameForm: user.name,
            userEmailForm: user.email,
            userPasswordForm: user.password,
            userConfirmPasswordForm: user.confirmPassword,
            userRoleForm: user.role
        });

        // const res = await axios.post('/register', body, config);

        AuthService.register(body).then(async(data) => {
            console.log(data);

            const { message } = data;
            setMessage(message);
            resetForm();

            if(!message.msgError){
                timerID = setTimeout(()=>{
                    props.history.push('/login');
                },2000);
            }
        });  
    };

    const resetForm = ()=>{
        setUser({
            name : "",
            email: "",
            password : "",
            confirmPassword: "",
            role : ""
        });
    }

    return (
        <div className="registerDiv">
            <div className="header__logo-box">
                <a href="/">
                    <img src={Logo} alt="Logo" className="header__logo__login" />
                </a>
            </div>
            <form className='register' onSubmit={sendData}>
                <h1 className="register-header">SIGN UP</h1>
                <h2>{message.msgBody}</h2>
                <label htmlFor="userNameForm">User Name</label>
                <input 
                    className="inputRegister"
                    onChange={getUserInfo}
                    value={user.name}
                    placeholder="Enter your name"
                    id="userNameForm"
                    name="name"
                    type="text" 
                    required/>
                <label htmlFor="userEmailForm value={userNameForm}">Email</label>
                <input 
                    className="inputRegister"
                    onChange={getUserInfo}
                    value={user.email}
                    placeholder="Enter your email"
                    id="userEmailForm"
                    type="email" 
                    name="email"
                    required />
                <label htmlFor="userPasswordForm">Password</label>
                <input 
                    className="inputRegister"
                    onChange={getUserInfo}
                    value={user.password}
                    placeholder="Enter your password"
                    id="userPasswordForm"
                    type="password" 
                    name="password" 
                    required/>
                <label htmlFor="userConfirmPasswordForm">Confirm Password</label>
                <input 
                    className="inputRegister"
                    onChange={getUserInfo}
                    value={user.confirmPassword}
                    placeholder="Enter your confirm password"
                    id="userConfirmPasswordForm"
                    type="password" 
                    name="confirmPassword" 
                    required/>
                <label htmlFor="userRoleForm">Role</label>
                <input
                    className="inputRegister"
                    onChange={getUserInfo}
                    value={user.role}
                    id="userRoleForm"
                    name="role"
                    placeholder="Enter role (admin/user)" 
                    required/>
                <button 
                    className="btn" type="submit"
                    >Register</button>
            </form>
        </div>
    )
}

export default Register;
