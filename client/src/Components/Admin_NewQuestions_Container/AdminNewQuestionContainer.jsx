import React, {Component} from 'react';
import QuestionForm from '../Add_Question_Form/AddQuestionForm';
import {Modal} from 'react-bootstrap';
import VideoAddItem from '../Video_Add_Item/VideoAddItem';
import styles from './AdminNewQuestionContainer.module.css';
import _ from 'underscore';
import axios from 'axios';

class AdminNewQuestionContainer extends Component{
    constructor(props){
        super(props);
        this.state = {
            //state related to answer fields
            title: '',
            answer: '',
            option_id:0, // increments to allow page to create unique objects
            options: [],
            type: null,

            //state related to modal fields
            show:false,
            videos:[],
            // error states
            errors:{},
        }
    }

    changeTitle = (title) => {
        this.setState({ title });
    };
    changeType = (event) =>{
        const errors = this.state.errors;
        errors.answer = null;
        this.setState({type: event.target.value, options:[], errors, answer: ''});
    };

    addOption = () =>{
        const new_option = {
            id: this.state.option_id,
            option:'',
            answer:false
        };
        this.setState({options : [...this.state.options, new_option], option_id: this.state.option_id +1})
    };

    alterOption = (altered_option) =>{
        const answer = [];
        const altered = this.state.options.map(option=>{
            if (option.answer) answer.push(option.option);
            if(option.id === altered_option.id){
                //this is the one we want to change
                return altered_option;
            }else{
                //return these unchanged
                return option;
            }
        });
        this.setState({ options: altered, answer });
    };

    removeOption = (id) =>{
      const answer = [];
      const removed = this.state.options.filter((option) => {
          if (option.answer) answer.push(option.option);
          return option.id !==id
      });
      this.setState({ options: removed, answer });
    };

    alterAnswer = (answer) => {
        answer = [answer];
        this.setState({ answer });
    };

    //open modal for adding a video
    showModal = () =>{
        this.setState({show: true});
    };

    //close modal for adding a video
    handleClose = () =>{
        this.setState({show:false});
    };

    alterSelectedVideo = (selected) =>{
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

    // handle submission of the general questions
    handleSubmit = (e) => {
        e.preventDefault();
        const {title, answer, options, type, } = this.state;
        // error handling
        const errors = {};
        if (!title) errors.title = true;
        if (!type) errors.type = true;
        if(type === 'text'){
            if (!answer.length < 1 || String(answer[0]).trim() === '') errors.answer = true;
        } else if (type === 'multiple choice'){
            if (options.length < 2) errors.optionLength = true;
            options.forEach((option) => {
                if (option.option.trim() === '') errors.emptyOption = true;
            });
            if (answer.length < 1) errors.answer = true;
        }
        this.setState({ errors });
        if (!_.isEmpty(errors)) return;
        axios.post('/content/question', {title, answer, type, responses: options })
            .then(() => {
                this.props.history.push('/questions')
            })
            .catch((e) =>{
                if (e.response.data) this.setState({ errors: { general: true} });
            });
    };

    render(){
        const mockVideos = {videos:[]};
        return(
            <div>
                <h3 className="lgtBlue">Add Question</h3>
                <div className="row">
                    <div className="col-12 col-md-6">
                        <QuestionForm
                            title={this.state.title}
                            changeTitle={this.changeTitle}
                            changeType={this.changeType}
                            addOption={this.addOption}
                            alterOption={this.alterOption}
                            alterAnswer={this.alterAnswer}
                            removeOption={this.removeOption}
                            type={this.state.type}
                            answer={this.state.answer}
                            options={this.state.options}
                            errors={this.state.errors}/>

                        <hr/>
                        <div><h6 className={`red ${styles.add_video}`} onClick={this.showModal}>Add Videos +</h6></div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="row">
                            <div className="col-12">
                                <h5 className={`lgtBlue`}>Video List</h5>
                                {this.state.videos.map(item=>{
                                    return (
                                        <div>
                                            <h6 className={styles.video_listing}>{item.title}</h6>
                                        </div>
                                    )
                                })}
                                <hr/>
                            </div>
                            <div className="col-12">
                                Lesson Association
                                [ Coming Soon ]
                            </div>
                        </div>
                    </div>
                </div>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            {mockVideos.videos.map((video, i)=>{
                                //determine if video was already selected by user
                                let selected = this.state.videos.filter(item=>video.id === item.id).length;
                                return (
                                    <VideoAddItem
                                        key={i}
                                        item={video}
                                        selected={selected}
                                        alterSelected={this.alterSelectedVideo}/>
                                )
                            })}
                        </form>
                    </Modal.Body>
                </Modal>

                <div className="row">
                    <div className="col-12">
                        <button onClick={this.handleSubmit} className="btn lgtBlueBG white f-w:700">Save Changes</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default AdminNewQuestionContainer