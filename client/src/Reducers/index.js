import {combineReducers} from 'redux';
import {User_Reducer} from "./User_Reducer";

export default combineReducers({
    //the current user of the app and all their profile details
    user : User_Reducer
})