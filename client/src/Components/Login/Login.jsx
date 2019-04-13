import React from 'react';
import LoginStyles from './Login.module.css';
import * as Logo from '../shared/Logo/Logo';
import Button from '@material-ui/core/Button';

const Login = ({SignIn}) =>{
    let username = '';
    let password = '';

    function submission(e) {
        e.preventDefault();
        SignIn(username, password);
    }
    return (
        <div className={`row ${LoginStyles.background}`}>
            <div className={'p-y:4'}><Logo.medium/></div>
            <form className={LoginStyles.login}>
                <div className="form-group">
                    <label className={'white'} htmlFor="username">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        placeholder="Username"
                        onChange={(event)=>username = event.target.value}
                    />
                </div>
                <div className="form-group">
                    <label className={'white'} htmlFor="password">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Password"
                        onChange={(event)=>password = event.target.value}
                    />
                </div>
                <Button variant="contained" className={'yellow'} onClick={(e)=>submission(e)}>
                    Login
                </Button>
            </form>
        </div>
    )
}

export default Login;