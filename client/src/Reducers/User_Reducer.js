/*
This reducer is used to set the current user of the app and update any of their details.
It may be called after login to signify a user has successfully logged in
or it may be periodically updated as a user moves through the app or updates profile details
 */
import {USER_AUTH} from "../Actions/User_Actions";

export const User_Reducer = (state=null, action) =>{
    switch (action.type){
        case USER_AUTH:
            return action.payload;

        default:
            return state;

    }
};