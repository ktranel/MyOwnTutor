import React from 'react';
import LoginStyles from './Login.module.css';
import * as Logo from '../shared/Logo/Logo';

const Login = () =>{
    return (
        <div className={`row ${LoginStyles.background}`}>
            <div className={'p-y:4'}><Logo.medium/></div>
            <form className={LoginStyles.login}>
                <div className="form-group">
                    <label className={'white'} htmlFor="username">Username</label>
                    <input type="text" className="form-control" id="username" placeholder="Username"/>
                </div>
                <div className="form-group">
                    <label className={'white'} htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="Password"/>
                </div>
            </form>
        </div>
    )
}

export default Login;