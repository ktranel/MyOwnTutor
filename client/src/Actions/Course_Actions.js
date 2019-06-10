/*
This file is used to dispatch any state actions that modify the current user of the app
 */
import axios from 'axios';

export const STUDENT_COURSES = 'STUDENT_COURSES';
export const GetCourses = (user) =>{
    const courses = {
        page: 1,
        pages: 10,
        courses: [
            {
                id:0,
                title: 'Example Course 1',
                description: 'This is great and a really strong point, but the side effect of this is that there are a lot of tools and configurations to consider before you can start building.',
                percent: 25,
                sections:[
                    {
                        id:0,
                        title: 'Section 1',
                        status:'progress',
                        icon: 'http://lorempixel.com/50/50'
                    },
                    {
                        id:11,
                        title: 'Section 2',
                        status:'incomplete',
                        icon: 'http://lorempixel.com/50/50'
                    }
                ]
            }
        ]
    };
    if(user){
        return (dispatch)=>{
            dispatch({type: STUDENT_COURSES, payload: courses})
        }
    }else{

    }
}