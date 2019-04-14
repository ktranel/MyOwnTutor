import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

const PrivateRoute = ({component : Component, user,  ...rest}) =>{
    return(
        <Route {...rest} render={(props)=> user ? <Component {...props}/> : <Redirect to={'/'}/>}/>
    )
};

export default connect(state=>state)(PrivateRoute);