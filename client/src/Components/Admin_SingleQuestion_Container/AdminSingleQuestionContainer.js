import React, { Component } from 'react';
import { connect } from "react-redux";
import { getAdminQuestion, clearAdminQuestion, getAdminQuestionVideos } from "../../Actions/Question_Actions";
import _ from 'lodash';
import Response from '../Single_Question_Response/SingleQuestionResponse';
import styles from './SingleQuestionContainer.module.css'
import VideoList from '../Add_Video_List/AddVideoList';

class AdminSingleQuestionContainer extends Component{
    state = {
        title: '',
        type: '',
        category: '',
        answer: '',
        responses: [],
        videos: [],
        show: false,
        errors: {
            title: null,
            answer: null,
            responseLength: null,
            responseAnswer: null,
            blankResponse: null,
        }
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
            this.setState({
                title: this.props.question.title,
                type: this.props.question.type,
                category: this.props.question.category,
                answer: this.props.question.answers?  this.props.question.answers.answer : null,
                responses: this.props.question.responses
            });
        }

        if (!_.isEqual(prevProps.videos, this.props.videos)){
            this.setState({ videos: this.props.videos });
        }
    }
    //open modal for adding a video
    handleShow = () =>{
        this.setState({show: true});
    };

    //close modal for adding a video
    handleClose = () =>{
        this.setState({show:false});
    };

    // handle the selection of a video from a video list
    selectVideo = (selected) => {
        let altered = [];
        //check if id is already in selected videos
        const check = this.state.videos.filter(item=>item.id === selected.id).length;

        //remove video if present
        if(check > 0){
            altered = this.state.videos.filter(item=>item.id !== selected.id);
        }else{
            //add video to list
            altered = [...this.state.videos, selected];
        }

        this.setState({videos: altered});
    };

    renderTextAnswer = () => {
        if (this.state.type !== 'text') return;
        return (
            <div>
                <label className="drkBlue">Answer</label>
                {this.state.errors.answer ? <span className="red">An answer must be entered</span> : null}
                <input
                    type="text"
                    value={this.state.answer}
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
                <label className='drkBlue'>Responses</label>
                {this.state.errors.responseLength ? <span className="red">There must be at least 2 responses to a multiple choice question<br/></span> : null}
                {this.state.errors.responseAnswer ? <span className="red">At least 1 response must be selected as an answer<br/></span> : null}
                {this.state.errors.blankResponse ? <span className="red">Responses must not be blank <br/></span> : null}
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
                <div className={`${styles.video} white yellowBG m-b:.5`}>{video.title}</div>
            )
        });
    };

    submit = (e) => {
        e.preventDefault();
        console.log(this.state);
        const { title, type,  category, answer, responses, videos } = this.state;
        const errors = {};
        if (title.trim().length === 0) errors.title = true;
        if (type === 'text'){
            if (answer.trim().length === 0) errors.answer = true;
        }else if (type === 'multiple choice'){
            if (responses.length < 2) errors.responseLength = true;
            responses.forEach(item => {
                if (item.response.trim().length === 0) errors.blankResponse = true;
            });
            const answerList = responses.filter(item => item.answer);
            if (answerList.length === 0) errors.responseAnswer = true;
        }
        this.setState({ errors });


    }

    render(){
        return(
            <div className='row'>
                <div className="col-12 col-md-6">
                    <form onSubmit={this.submit}>
                        <div className="form-group">
                            <label className='drkBlue'>Title</label>
                            {this.state.errors.title ? <span className="red">A title must be entered</span> : null}
                            <input
                                type="text"
                                value={this.state.title}
                                onChange={e => this.changeTitle(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label className="drkBlue">Type</label>
                            <input type="text" disabled value={this.props.question.type}/>
                        </div>
                        <div className="form-group">
                            <label className='drkBlue'>Category</label>
                            <select value={this.state.category} onChange={e=>this.changeCategory(e.target.value)}>
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
                    <label className='drkBlue'>Videos</label>
                    {this.renderVideos()}
                    <div className={styles.add} onClick={this.handleShow}>Add Video</div>
                </div>
                <VideoList
                    selected={this.state.videos}
                    selectVideo={this.selectVideo}
                    show={this.state.show}
                    handleClose={this.handleClose}
                />
                <div className="col-12"><button className={`lgtBlueBG white ${styles.submit}`} onClick={this.submit}>Save Changes</button></div>
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