import React, {Component} from 'react';
import QuestionForm from '../Add_Question_Form/AddQuestionForm';
import {Modal, Alert} from 'react-bootstrap';
import VideoAddItem from '../Video_Add_Item/VideoAddItem';
import styles from './AdminNewQuestionContainer.module.css';
import _ from 'underscore';
import axios from 'axios';
import { getAdminVideoList } from "../../Actions/Video_Actions";
import { connect } from "react-redux";

class AdminNewQuestionContainer extends Component{
    constructor(props){
        super(props);
        this.state = {
            //state related to answer fields
            title: '',
            answer: '',
            option_id:0, // increments to allow page to create unique objects
            options: [],
            type: '',
            category: '',

            //state related to modal fields
            show:false,
            videos:[],
            page: 1,
            // error states
            errors:{},
        }
    }

    componentDidMount() {
        this.props.getAdminVideoList(1);
    }

    changeTitle = (title) => {
        this.setState({ title });
    };
    changeType = (event) =>{
        const errors = this.state.errors;
        errors.answer = null;
        this.setState({type: event.target.value, options:[], errors, answer: ''});
    };

    changeCategory = category => this.setState({ category });

    addOption = () =>{
        const new_option = {
            id: this.state.option_id,
            option:'',
            answer:false
        };
        this.setState({options : [...this.state.options, new_option], option_id: this.state.option_id +1})
    };

    alterOption = (alteredOption) =>{
        const answer = [];
        const altered = this.state.options.map(option=>{
            if(option.id === alteredOption.id){
                if (alteredOption.answer) answer.push(option.option);
                //this is the one we want to change
                return alteredOption;
            }else{
                if (option.answer) answer.push(option.option);
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

    // move backwards and forwards in video list
    changePage = (e, direction) => {
        e.preventDefault();
        const { page } = this.state;
        if (page === this.props.pages || page === 1) return;
        if (direction === 'next'){
            this.setState({ page: page + 1 }, () => this.props.getAdminVideoList(this.state.page));
        } else if (direction === 'prev'){
            this.setState({ page: page - 1 }, () => this.props.getAdminVideoList(this.state.page));
        }
    };

    // handle submission of the general questions
    handleSubmit = async (e) => {
        e.preventDefault();
        const {title, answer, options, type, category} = this.state;
        // error handling
        const errors = {};
        if (!title) errors.title = true;
        if (!type) errors.type = true;
        if(type === 'text'){
            if (answer.length < 1 || String(answer[0]).trim() === '') errors.answer = true;
        } else if (type === 'multiple choice'){
            if (options.length < 2) errors.optionLength = true;
            options.forEach((option) => {
                if (option.option.trim() === '') errors.emptyOption = true;
            });
            if (answer.length < 1) errors.answer = true;
        }
        this.setState({ errors });
        if (!_.isEmpty(errors)) return;
        const responses = options.map(option => option.option);
        const question = await axios.post('/content/question', {title, answer, type, responses, category })
            .catch((e) =>{
                if (e.response) this.setState({ errors: { general: e.response.data.error} });

            });
        if (!question) return;
        if (this.state.videos.length > 0){
            const videos = this.state.videos.map(video => video.id);
            await axios.post('/content/question/video/assign', {
                questionId: question.data.question.question.id,
                videoIds: videos
            });
        }
        this.props.history.push('/admin/questions')
    };

    render(){
        return(
            <div>
                <h3 className="lgtBlue">Add Question</h3>
                <div className="row">
                    <div className="col-12 col-md-6">
                        <QuestionForm
                            title={this.state.title}
                            changeTitle={this.changeTitle}
                            changeCategory={this.changeCategory}
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
                                        <div key={item.id}>
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
                            {this.props.videos.map((video, i)=>{
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
                    <Modal.Footer>
                        <button onClick={(e)=>this.changePage(e, 'prev')}><i className="fas fa-arrow-left"></i></button>
                        <button onClick={(e)=>this.changePage(e, 'next')}><i className="fas fa-arrow-right"></i></button>
                    </Modal.Footer>
                </Modal>

                <div className="row">
                    <div className="col-12">
                        {this.state.errors.general ? <Alert variant={'danger'}>{this.state.errors.general}</Alert> : null }
                        <button onClick={this.handleSubmit.bind(this)} className="btn lgtBlueBG white f-w:700">Save Changes</button>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ adminVideoList }){
    return { videos: adminVideoList.videos || [], pages: adminVideoList.pages };
}
export default connect(mapStateToProps, { getAdminVideoList })(AdminNewQuestionContainer);