/*
This file is used to dispatch any state actions that modify the current user of the app
 */
import axios from 'axios';

//Login request to the api b/e
export const USER_AUTH = 'USER_AUTH';
export const UserAuth = (username, password) =>{
    return async (dispatch)=>{
        const user = await axios.post('/auth/', {username, password});
        if(user.data.user){
            dispatch({type:USER_AUTH, payload: user.data.user});
        }

    }
};

//This action calls the API to see if the user can be
//resolved from any cookies available in the browser
export const GetUser = () =>{
    return async (dispatch)=>{
        const user = await axios.put('/auth/refresh');
        if(user.data.user){
            dispatch({type:USER_AUTH, payload: user.data.user});
        }
    }
};