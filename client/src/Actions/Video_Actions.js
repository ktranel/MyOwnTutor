/*
This file is used to dispatch any state actions that modify the
current video list of the app as viewed by an admin or curator
 */
import axios from 'axios';

// request for list of videos
export const ADMIN_VIDEO_LIST = 'ADMIN_VIDEO_LIST';
export const getAdminVideoList = (page) =>{
    return async (dispatch)=>{
        let url = '/content/videos';
        if (page) url = `/content/videos/?page=${page}`;
        const videos = await axios.get(url);
        if(videos.data.videos){
            dispatch({type:ADMIN_VIDEO_LIST, payload: videos.data.videos});
        }

    }
};