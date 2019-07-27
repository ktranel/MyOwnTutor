import React, {Component} from 'react';
import { withRouter } from "react-router";
import styles from './QuestionListItem.module.css'


class QuestionListItem extends Component{
    constructor(props){
        super(props);
        this.state={
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
        const {question} = this.props;
        return(
            <div className={`${styles.question_listing} row`} onClick={()=>this.props.history.push(`questions/id/${question.id}`)}>
                <div className="col-12 col-md-8">{question.title}</div>
                <div className="col-12 col-md-2">{question.type}</div>
                <div className="col-12 col-md-2">{question.category}</div>
            </div>
        )
    }
}

export default withRouter(QuestionListItem);