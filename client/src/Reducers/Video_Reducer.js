import { ADMIN_VIDEO_LIST} from "../Actions/Video_Actions";

export const Videos_Reducer = (state={}, action) =>{
    switch (action.type){
        case ADMIN_VIDEO_LIST:
            return action.payload;

        default:
            return state;

    }
};