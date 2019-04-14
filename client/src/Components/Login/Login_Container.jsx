import React, {Component} from 'react';
import Login from './Login'
import {UserAuth} from "../../Actions/User_Actions";
import {connect} from 'react-redux';

class Login_Container extends Component{
    SignIn = (username, password) =>{
        const that = this;
        this.props.UserAuth(username, password)
            .then(()=>{
                switch (that.props.user.permission_id){
                    case 1:
                        that.props.history.push('/admin');
                        break;

                    case 2:
                        that.props.history.push('/home');
                        break;
                        
                    case 3:
                        that.props.history.push('/curator');
                        break;

                    default:
                        that.props.history.push('/');
                }

            })
            .catch(e=>console.log(e));
    };

    render(){
        return (
            <Login SignIn={this.SignIn}/>
        )
    }
}

export default connect(({user})=>{return {user}}, {UserAuth})(Login_Container);