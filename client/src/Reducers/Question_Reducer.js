import {
    ADMIN_QUESTION_LIST,
    ADMIN_QUESTION,
    ADMIN_GET_QUESTION_VIDEOS
} from "../Actions/Question_Actions";

export const Question_Reducer = (state={}, action) =>{
    switch (action.type){
        case ADMIN_QUESTION_LIST:
            return action.payload;

        default:
            return state;

    }
};

export const singleQuestion = (state={}, action) => {
    switch (action.type){
        case ADMIN_QUESTION:
            return action.payload;

        default:
            return state;
    }
};

export const questionVideos = (state={}, action) => {
    switch (action.type){
        case ADMIN_GET_QUESTION_VIDEOS:
            return action.payload;

        default:
            return state;
    }
}