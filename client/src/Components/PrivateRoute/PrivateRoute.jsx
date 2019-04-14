import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {GetUser} from "../../Actions/User_Actions";

const PrivateRoute = ({component : Component, user, GetUser, ...rest}) =>{
    /*check if user has cookie and call backend api for auth*/

        return(
            <Route {...rest} render={(props)=> {
                if(user){
                    return <Component {...props}/>
                }else{
                    return (
                        <Redirect to={{
                            pathname: '/',
                            state: {from: props.location}
                        }}/>
                    )
                }
            }}/>
        )
};

export default connect(state=>state, {GetUser})(PrivateRoute);