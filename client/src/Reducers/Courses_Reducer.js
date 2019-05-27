import {STUDENT_COURSES} from "../Actions/Course_Actions";

export const Courses_Reducer = (state=null, action) =>{
    switch (action.type){
        case STUDENT_COURSES:
            return action.payload;

        default:
            return state;

    }
};