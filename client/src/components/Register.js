import React, { useState, useRef, useEffect, Context } from 'react';
import axios from 'axios';
import AuthService from '../middlewares/AuthService';

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
            <form className='register' onSubmit={sendData}>
                <h1>SIGN UP</h1>
                <h2>{message.msgBody}</h2>
                <label htmlFor="userNameForm">User Name</label>
                <input 
                    onChange={getUserInfo}
                    value={user.name}
                    id="userNameForm"
                    name="name"
                    type="text" 
                    required/>
                <label htmlFor="userEmailForm value={userNameForm}">Email</label>
                <input 
                    onChange={getUserInfo}
                    value={user.email}
                    id="userEmailForm"
                    type="email" 
                    name="email"
                    required />
                <label htmlFor="userPasswordForm">Password</label>
                <input 
                    onChange={getUserInfo}
                    value={user.password}
                    id="userPasswordForm"
                    type="password" 
                    name="password" 
                    required/>
                <label htmlFor="userConfirmPasswordForm">Confirm Password</label>
                <input 
                    onChange={getUserInfo}
                    value={user.confirmPassword}
                    id="userConfirmPasswordForm"
                    type="password" 
                    name="confirmPassword" 
                    required/>
                <label htmlFor="userRoleForm">Role</label>
                <input
                    onChange={getUserInfo}
                    value={user.role}
                    id="userRoleForm"
                    name="role"
                    placeholder="Enter role (admin/user)" 
                    required/>
                <button 
                    className="btn btn-lg btn-primary btn-block" type="submit"
                    >Register</button>
            </form>
        </div>
    )
}

export default Register;
