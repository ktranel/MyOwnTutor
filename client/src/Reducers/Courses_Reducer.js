import {
    STUDENT_COURSES,
    ADMIN_COURSES,
    ADMIN_COURSES_CLEAR
} from "../Actions/Course_Actions";

export const Courses_Reducer = (state=null, action) =>{
    switch (action.type){
        case STUDENT_COURSES:
            return action.payload;

        default:
            return state;

    }
};

export const AdminCourseReducer = (state=[], action) => {
    switch (action.type){
        case ADMIN_COURSES:
            return action.payload.data.result;

        case ADMIN_COURSES_CLEAR:
            return action.payload;

        default:
            return state;
    }
}