import React, { useState, useRef, useEffect } from 'react';
import AuthService from '../middlewares/AuthService';


const Login = () => {

    const [user, setUser] = useState({
        email: "",
        password: ""
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
        setUser({
            ...user,
            [event.target.name]: event.target.value
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

    const sendData = async (event) => {
        event.preventDefault();
        console.log("Form submitted");

        const body = JSON.stringify({
            userEmailForm: user.email,
            userPasswordForm: user.password
        });

        AuthService.register(body).then(async(data) => {
            const { message } = data;
            setMessage(message);
            resetForm();

            // if(!message.msgError){
            //     timerID = setTimeout(()=>{
            //         props.history.push('/home');
            //     },2000);
            // }
        });
    };

    return (
        <div>
            <form className='login' onSubmit={sendData}>
                <h1>LOGIN</h1>
                {/* <h2>{{message}}</h2> */}
                <label htmlFor="userEmailForm">Email</label>
                <input 
                    id="userEmailForm"
                    type="email" 
                    name="userEmailForm" required />
                <label htmlFor="userPasswordForm">Password</label>
                <input 
                    id="userPasswordForm"
                    type="password" 
                    name="userPasswordForm" required />
                <button 
                    className="btn btn-lg btn-primary btn-block" 
                    type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login;
