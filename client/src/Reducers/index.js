import {combineReducers} from 'redux';
import {User_Reducer} from "./User_Reducer";
import {Courses_Reducer} from "./Courses_Reducer";

export default combineReducers({
    //the current user of the app and all their profile details
    user : User_Reducer,

    //a list of courses either belonging to a user or general courses
    courses : Courses_Reducer,
})