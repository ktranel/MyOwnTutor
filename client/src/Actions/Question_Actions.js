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
        if (page) url = `/content/questions?page=${page}`;
        const questions = await axios.get(url);
        if(questions.data.questions){
            dispatch({type:ADMIN_QUESTION_LIST, payload: questions.data.questions});
        }

    }
};

// request a single question
export const ADMIN_QUESTION = 'ADMIN_QUESTION';
export const getAdminQuestion = (id) => {
    return async (dispatch) => {
        const url = `/content/questions?id=${id}`;
        const questions = await axios.get(url);
        if (questions.data.questions){
            dispatch({ type: ADMIN_QUESTION, payload: questions.data.questions });
        }
    }
};

export const clearAdminQuestion = () => {
    return (dispatch) => dispatch({ type: ADMIN_QUESTION, payload: {} });
}

// get list of videos belonging to a question
export const ADMIN_GET_QUESTION_VIDEOS = 'ADMIN_GET_QUESTION_VIDEOS';
export function getAdminQuestionVideos(questionId){
    return async (dispatch) =>{
        const url = `/content/question/videos?questionId=${questionId}`;
        const videos = await axios.get(url);
        dispatch({ type: ADMIN_GET_QUESTION_VIDEOS, payload: videos.data.videos});
    }
}