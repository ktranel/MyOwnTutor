import React, {Component} from 'react';
import style from './AdminSection.module.css';

class AdminSection extends Component{
    constructor(props){
        super(props);
        this.state = {
            maxHeight:0,
        }
    }

    flipHeight = () =>{
        this.setState({maxHeight: this.state.maxHeight === 0 ? 1000 : 0});
    };
    render(){
        let height={maxHeight: this.state.maxHeight};
        return(
            <div>
                <h5 onClick={this.flipHeight} className={`${style.section_title} red`}>{this.props.title}</h5>
                <div style={height} className={`${style.listing}`}>
                    som text
                </div>
            </div>
        )
    }
}

export default AdminSection;