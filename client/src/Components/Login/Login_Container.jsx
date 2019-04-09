import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import Login from './Login'

class Login_Container extends Component{
    render(){
        return (
            <Login/>
        )
    }
}

export default withRouter(Login_Container);