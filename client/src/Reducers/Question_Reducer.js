import { ADMIN_QUESTION_LIST } from "../Actions/Question_Actions";

export const Question_Reducer = (state={}, action) =>{
    switch (action.type){
        case ADMIN_QUESTION_LIST:
            return action.payload;

        default:
            return state;

    }
};