import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import Login from './Login'
import {UserAuth} from "../../Actions/User_Actions";
import {connect} from 'react-redux';

class Login_Container extends Component{
    SignIn = (username, password) =>{
        this.props.UserAuth(username, password);
    };

    render(){
        return (
            <Login SignIn={this.SignIn}/>
        )
    }
}

export default connect(null, {UserAuth})(Login_Container);