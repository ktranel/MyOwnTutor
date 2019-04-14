/*
This file is used to dispatch any state actions that modify the current user of the app
 */
import axios from 'axios';

export const USER_AUTH = 'USER_AUTH';
export const UserAuth = (username, password) =>{
    return async (dispatch)=>{
        const user = await axios.post('/auth/', {username, password});
        console.log(user);
        if(user.data.user){
            dispatch({type:USER_AUTH, payload: user.data.user});
        }

    }
};