import React from 'react';

const Header = () => {
    const [userID, serUserID] = React.useState(null);

    return(
        <div className="header" style={{backgroundColor:'lightblue'}}>
            <div className="header__logo">
                <a href="/"><img alt="logo" /></a>
            </div>
            {userID? <div><Login /></div>:<div><Register /> <Login /> </div> }
        </div>
    );
}

const Register = () => {
    return(
        <div className="header__register"><a href="/register">register</a></div>
    );
}

const Login = () => {
    return(
        <div className="header__login"><a href="/login">login</a></div>
    );
}

const Logout = () => {
    return(
        <div className="header__logout"><a href="/logout">logout</a></div>
    );
}

export default Header;