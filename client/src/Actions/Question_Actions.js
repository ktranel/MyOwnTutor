/*
This file is used to dispatch any state actions that modify the
current question list of the app as viewed by an admin or curator
 */
import axios from 'axios';

// request for list of questions
export const ADMIN_QUESTION_LIST = 'ADMIN_QUESTION_LIST';
export const getAdminQuestionList = (page) =>{
    return async (dispatch)=>{
        let url = '/content/questions';
        if (page) url = `/content/questions/?page=${page}`;
        const questions = await axios.get(url);
        if(questions.data.questions){
            dispatch({type:ADMIN_QUESTION_LIST, payload: questions.data.questions});
        }

    }
};