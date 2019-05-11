import React, {Component} from 'react';
import { VideoListItem } from "../Video_List_Item/VideoListItem";

class AdminCourseList extends Component{
    constructor(props){
        super(props);
        this.state = {
            max_height: 0,
            display: 'none'
        }
    }

    flipHeight=()=>{
        this.setState({
            max_height: this.state.max_height === 0 ? 10000 : 0,
            display: this.state.display === 'none' ? 'block' : 'none'
        });
    }

    render(){
        return(
            <div>
                <ul>
                    <li>
                        {this.props.videos.map(video=>{
                            return(
                                <VideoListItem video={video}/>
                            )
                        })}
                    </li>
                </ul>
            </div>
        )
    }
};

export default AdminCourseList;