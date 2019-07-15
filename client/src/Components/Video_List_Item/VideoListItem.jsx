import React, {Component} from 'react';
import { DateTime } from 'luxon';
import styles from './VideoListItem.module.css';

export class VideoListItem extends Component{
    constructor(props){
        super(props);
        this.state = {
            display: 'none',
            max_height: 0
        }
    }

    flipHeight = () =>{
        this.setState({
            display: this.state.display === 'none' ? 'block' : 'none',
            max_height: this.state.max_height === 0 ? 10000 : 0,
        })
    }

    render(){
        const {video} = this.props;
        const display = {maxHeight:this.state.max_height, display:this.state.display}

        return(
            <div onClick={this.flipHeight} key={video.id} className={`${styles["video-listing"]} row`}>
                <div className="col-12 col-md-6">
                    <h5 className="red">{video.title}</h5>
                    <p style={display} className={`description`}>{video.description}</p>
                </div>
                <div className={`${styles.video_meta} col-12 col-md-6`}>
                    <div>Uploaded: {DateTime.local().toLocaleString(video.last_edited)}</div>
                </div>
            </div>
        )
    }
}