import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Register = () => {

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: ""
    });

    const getUserInfo = (event) => {
        console.log("Above event.target.value")
        console.log(event.target.value);

        setUser({
            ...user,
            [event.target.name]: event.target.value
            
        });
        console.log(event.target.value);
    };

    const sendData = async (event) => {
        event.preventDefault();
        console.log("Form submitted");

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const body = JSON.stringify({
            userNameForm: user.name,
            userEmailForm: user.email,
            userPasswordForm: user.password,
            userConfirmPasswordForm: user.confirmPassword,
            userRoleForm: user.role
        });

        
        const res = await axios.post('/register', body, config);
        console.log(res);
    };

    

    return (
        <div className="registerDiv">
            <form className='register' onSubmit={sendData}>
                <h1>SIGN UP</h1>
                {/* <h2>{{message}}</h2> */}
                <label htmlFor="userNameForm">User Name</label>
                <input 
                    onChange={getUserInfo}
                    id="userNameForm"
                    name="name"
                    type="text" 
                    required/>
                <label htmlFor="userEmailForm value={userNameForm}">Email</label>
                <input 
                    onChange={getUserInfo}
                    id="userEmailForm"
                    type="email" 
                    name="email"
                    required />
                <label htmlFor="userPasswordForm">Password</label>
                <input 
                    onChange={getUserInfo}
                    id="userPasswordForm"
                    type="password" 
                    name="password" 
                    required/>
                <label htmlFor="userConfirmPasswordForm">Confirm Password</label>
                <input 
                    onChange={getUserInfo}
                    id="userConfirmPasswordForm"
                    type="password" 
                    name="confirmPassword" 
                    required/>
                <label htmlFor="userRoleForm">Role</label>
                <input
                    onChange={getUserInfo}
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
