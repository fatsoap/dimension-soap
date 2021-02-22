import React from 'react';

const Login =  () => {
    return(
        <div className="login">
            Login page here
            <div className="login__form">
                <form action="/login" >
                    <input type="text" placeholder="username" />
                    <input type="password" placeholder="password" />
                    <button type="submit">Enter</button>
                </form>
            </div>
        </div>
    );
}

export default Login;