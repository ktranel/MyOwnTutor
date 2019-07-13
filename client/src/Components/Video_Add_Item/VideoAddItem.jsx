import React, {Component} from 'react';
import styles from './VideoAddItem.module.css';

class VideoAddItem extends Component{
    constructor(props){
        super(props);
        this.state={
            selected:this.props.selected
        }
    }

    flipSelected = () =>{
        this.setState({selected: !this.state.selected});
    };
    render(){
        return(
            <div>
                <label
                    className={`${styles.list_item} ${this.state.selected ? styles.selected : null}`}
                    onClick={()=>{
                        this.flipSelected();
                        this.props.alterSelected(this.props.item)
                    }}
                >{this.props.item.title}</label>
            </div>
        )
    }
}

export default VideoAddItem;