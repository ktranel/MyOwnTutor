import React, {Component} from 'react';
import QuestionForm from '../Add_Question_Form/AddQuestionForm';
import {Modal} from 'react-bootstrap';
import VideoAddItem from '../Video_Add_Item/VideoAddItem';
import styles from './AdminNewQuestionContainer.module.css';

const mock_videos = {
    videos : [
        {
            id: 10001,
            title: "video 1",
        },
        {
            id: 10002,
            title: "video 2",
        },
        {
            id: 10003,
            title: "video 3",
        }
    ],
    page:1,
    pages:10
};

class AdminNewQuestionContainer extends Component{
    constructor(props){
        super(props);
        this.state = {
            //state related to answer fields
            answer: '',
            option_id:0, // increments to allow page to create unique objects
            options: [],
            type: null,

            //state related to modal fields
            show:false,
            videos:[]
        }
    }

    changeType = (event) =>{
        this.setState({type: event.target.value, options:[]});
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
        const altered = this.state.options.map(option=>{
            if(option.id === altered_option.id){
                //this is the one we want to change
                return altered_option;
            }else{
                //return these unchanged
                return option;
            }
        });
        this.setState({options: altered});
    };

    removeOption = (id) =>{
      const removed = this.state.options.filter(option=> option.id !==id);
      this.setState({options: removed});
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

    render(){
        return(
            <div>
                <h3 className="lgtBlue">Add Question</h3>
                <div className="row">
                    <div className="col-12 col-md-6">
                        <QuestionForm
                            changeType={this.changeType}
                            addOption={this.addOption}
                            alterOption={this.alterOption}
                            removeOption={this.removeOption}
                            type={this.state.type}
                            answer={this.state.answer}
                            options={this.state.options}/>
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
                            {mock_videos.videos.map((video, i)=>{
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
                        <button className="btn lgtBlueBG white f-w:700">Save Changes</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default AdminNewQuestionContainer