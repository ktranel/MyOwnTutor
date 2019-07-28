import React, {Component} from 'react';
import { VideoListItem } from "../Video_List_Item/VideoListItem";

class AdminVideoList extends Component{
    render(){
        return(
            <div>
                <ul>
                    <li>
                        {this.props.videos.map(video=>{
                            return(
                                <VideoListItem key={video.id} video={video}/>
                            )
                        })}
                    </li>
                </ul>
            </div>
        )
    }
}

export default AdminVideoList;