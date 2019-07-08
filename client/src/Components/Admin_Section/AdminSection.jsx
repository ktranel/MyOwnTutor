import React, {Component} from 'react';
import style from './AdminSection.module.css';
import ContentItem from '../Admin_Content_Item/AdminContentItem';

class AdminSection extends Component{
    constructor(props){
        super(props);
        this.state = {
            maxHeight:0
        }
    }

    flipHeight = () =>{
        this.setState({
            maxHeight: this.state.maxHeight === 0 ? 1000 : 0
        });
    };
    render(){
        const css ={maxHeight: this.state.maxHeight};
        return(
            <div>
                <h5 onClick={this.flipHeight} className={`${style.section_title} red`}>{this.props.title}</h5>
                <div style={css} className={`${style.listing}`}>
                    {
                        this.props.section.content.map(item => <ContentItem content={item} />)
                    }
                </div>
            </div>
        )
    }
}

export default AdminSection;