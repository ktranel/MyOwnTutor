import React, { Component } from 'react';
import { connect } from "react-redux";
import { getAdminQuestion, clearAdminQuestion, getAdminQuestionVideos } from "../../Actions/Question_Actions";
import _ from 'lodash';
import Response from '../Single_Question_Response/SingleQuestionResponse';
import styles from './SingleQuestionContainer.module.css'
import {questionVideos} from "../../Reducers/Question_Reducer";

class AdminSingleQuestionContainer extends Component{
    state = {
        title: '',
        type: '',
        category: '',
        answer: '',
        responses: [],
        videos: [],
    };

    componentDidMount() {
        const id =  this.props.location.pathname.replace('/admin/questions/id/', '');
        this.props.getAdminQuestion(id);
        this.props.getAdminQuestionVideos(id);
    }

    componentWillUnmount() {
        this.props.clearAdminQuestion();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(!_.isEqual(prevProps.question, this.props.question)){
            this.setState({ responses: this.props.question.responses });
        }

        if (!_.isEqual(prevProps.videos, this.props.videos)){
            this.setState({ videos: this.props.videos });
        }
    }

    renderTextAnswer = () => {
        if (!this.props.question.answers) return;
        return (
            <div>
                <label className="red">Answer</label>
                <input
                    type="text"
                    value={this.state.answer || this.props.question.answers.answer}
                    onChange={e=>this.changeAnswer(e.target.value)}
                />
            </div>
        )
    };

    renderResponses = () => {
        if (this.props.question.responses){
            if (!this.props.question.responses.length > 0) return;
        }else{
            return;
        }
        const jsx = this.state.responses.map(response => (
                <Response
                    key={response.id}
                    response={response}
                    changeAnswer={this.changeResponseAnswer}
                    changeResponse={this.editResponse}
                    deleteResponse={this.deleteResponse}
                />
        ));

        return (
            <div>
                <label className='red'>Responses</label>
                {jsx}
                <div className={styles.add}><p className='m:0' onClick={this.addResponse}>Add Response</p></div>
            </div>
        )
    };

    changeTitle = (title) => {
        this.setState({ title });
    };

    changeCategory = (category) => {
        this.setState({ category }, ()=>console.log(this.state.category));
    };

    changeAnswer = (answer) => {
        this.setState({ answer });
    };

    editResponse = (id, text) => {
        const responses = this.state.responses.map((item) => {
            if(id === item.id){
                item.response = text;
                return item;
            }else{
                return item;
            }
        });
        this.setState({ responses });
    };

    deleteResponse = (id) => {
        const responses = this.state.responses.filter(item => item.id !== id);
        this.setState({ responses });
    };

    addResponse = () => {
        const newResponse = {
            id: new Date().getTime().toString(),
            response: '',
            answer:false
        };
        this.setState({ responses: [...this.state.responses, newResponse] });
    };

    changeResponseAnswer = (id) => {
        const responses = this.state.responses.map((item) => {
            if (item.id === id){
                item.answer = !item.answer;
                return item;
            }else{
                return item;
            }
        });
        this.setState({ responses });
    }

    renderVideos = () => {
        return this.state.videos.map((video) => {
            return(
                <div>{video.title}</div>
            )
        });
    };

    render(){
        return(
            <div className='row'>
                <div className="col-12 col-md-6">
                    <form>
                        <div className="form-group">
                            <label className='red'>Title</label>
                            <input
                                type="text"
                                value={this.state.title || this.props.question.title}
                                onChange={e => this.changeTitle(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label className="red">Type</label>
                            <input type="text" disabled value={this.props.question.type}/>
                        </div>
                        <div className="form-group">
                            <label className='red'>Category</label>
                            <select value={this.state.category || this.props.question.category} onChange={e=>this.changeCategory(e.target.value)}>
                                <option value="physics">Physics</option>
                                <option value="chemistry">Chemistry</option>
                                <option value="math">Math</option>
                            </select>
                        </div>
                        <div className="form-group">
                            {this.renderTextAnswer()}
                            {this.renderResponses()}
                        </div>
                    </form>
                </div>
                <div className="col-12 col-md-6">
                    <label className='red'>Videos</label>
                    {this.renderVideos()}
                    <div className={styles.add}>Add Video</div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ singleQuestion, questionVideos }){
    return {
        question: singleQuestion,
        videos: questionVideos
    }
}
export default connect(mapStateToProps,
    {
        getAdminQuestion,
        clearAdminQuestion,
        getAdminQuestionVideos
    })(AdminSingleQuestionContainer);