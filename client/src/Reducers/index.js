import {combineReducers} from 'redux';
import {User_Reducer} from "./User_Reducer";
import {Courses_Reducer, AdminCourseReducer} from "./Courses_Reducer";
import { Videos_Reducer } from "./Video_Reducer";
import { Question_Reducer, singleQuestion, questionVideos } from "./Question_Reducer";

export default combineReducers({
    //the current user of the app and all their profile details
    user : User_Reducer,
    //a list of courses either belonging to a user or general courses
    studentCourses : Courses_Reducer,
    // a list of courses for admin area
    adminCourseList: AdminCourseReducer,
    // a list of videos for admin area
    adminVideoList: Videos_Reducer,
    // a list of questions for admin area
    adminQuestionList: Question_Reducer,
    // an individual question
    singleQuestion,
    // videos for a question
    questionVideos,

});