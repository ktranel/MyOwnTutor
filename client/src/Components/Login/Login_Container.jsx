import React, {Component} from 'react';
import Login from './Login';
import Loading_Screen from '../shared/Loading_Screen/Loading_Screen';
import {UserAuth, GetUser} from "../../Actions/User_Actions";
import {connect} from 'react-redux';

class Login_Container extends Component{
    constructor(props){
        super(props);
        this.state = {loading : true}
    }

    componentDidUpdate(prevProps){
        if(this.props.user){
            const {from} = this.props.location.state || {from : null};
            if(from) {
                this.props.history.push(from);
            }else{
                this.RedirectUser(this.props.user.permission_id);
            }
        }
    }

    componentDidMount(){
            this.props.GetUser()
                .then(()=>this.setState({loading: false}))
                .catch(e=>console.log(e));
    }

    SignIn = (username, password) =>{
        const that = this;
        this.props.UserAuth(username, password)
            .then(()=>{
                that.RedirectUser(that.props.user.permission_id);

            })
            .catch(e=>console.log(e));
    };

    RedirectUser = (permission_id) =>{
        switch (permission_id){
            case 1:
                this.props.history.push('/admin');
                break;

            case 2:
                this.props.history.push('/home');
                break;

            case 3:
                this.props.history.push('/curator');
                break;

            default:
                this.props.history.push('/');
        }
    }
    render(){
        return (this.state.loading ? <Loading_Screen type={'spin'} color={'#000'}/> : <Login SignIn={this.SignIn}/>)
    }
}

export default connect(({user})=>{return {user}}, {UserAuth, GetUser})(Login_Container);