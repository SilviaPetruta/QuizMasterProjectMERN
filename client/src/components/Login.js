import React from 'react';

const Login = () => {
    return (
        <div>
            <form class='login' action="/login" method="POST">
                <h1>LOGIN</h1>
                {/* <h2>{{message}}</h2> */}
                <label for="userEmailForm">Email</label>
                <input 
                    id="userEmailForm"
                    type="email" 
                    name="userEmailForm" required />
                <label for="userPasswordForm">Password</label>
                <input 
                    id="userPasswordForm"
                    type="password" 
                    name="userPasswordForm" required />
                <button class="btn btn-lg btn-primary btn-block" type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login;
