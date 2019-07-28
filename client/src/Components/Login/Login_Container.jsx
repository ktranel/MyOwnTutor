import React, {Component} from 'react';
import Login from './Login';
import LoadingScreen from '../shared/Loading_Screen/Loading_Screen';
import {UserAuth, GetUser} from "../../Actions/User_Actions";
import {connect} from 'react-redux';
import styles from './Login.module.css';

class Login_Container extends Component{
    _isMounted = false;
    constructor(props){
        super(props);
        this.state = {
            loading : true,
            _mounted: true
        }
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
        this._isMounted = true;
        this.props.GetUser()
            .then(()=>{
                if(this._isMounted) this.setState({loading: false});
            })
            .catch(e=>console.log(e));
    }

    componentWillUnmount(){
        this._isMounted = false;
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
        return (this.state.loading ? <div className={`${styles.container} row redBG white`}><LoadingScreen type={'cylon'} color={'#fff'}/></div> : <Login SignIn={this.SignIn}/>)
    }
}

export default connect(({user})=>{return {user}}, {UserAuth, GetUser})(Login_Container);