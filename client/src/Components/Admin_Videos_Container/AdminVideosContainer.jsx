import React, {Component} from 'react';
import { DateTime} from 'luxon';
import AdminVideoList from '../Admin_Video_List/AdminVideoList';
import {Button, Modal} from 'react-bootstrap';
import FileInput from '../File_Input/FileInput';
import styles from './AdminVideosContainer.module.css';

const videos = {
    videos:[
        {
            id: 123,
            title: "Atoms and Molecules",
            description: "Gumbo beet greens corn soko endive gumbo gourd. Parsley shallot courgette tatsoi pea sprouts fava bean collard greens dandelion okra wakame tomato. Dandelion cucumber earthnut pea peanut soko zucchini.",
            author: "Kyle Tranel",
            uploaded: DateTime.local().toLocaleString(DateTime.DATETIME_MED),
        },
        {
            id: 2232,
            title: "Stoichiometry and the fun stuff",
            description:'Gumbo beet greens corn soko endive gumbo gourd. Parsley shallot courgette tatsoi pea sprouts fava bean collard greens dandelion okra wakame tomato. Dandelion cucumber earthnut pea peanut soko zucchini.',
            author: "Kyle Tranel",
            uploaded: DateTime.local().toLocaleString(DateTime.DATETIME_MED),
        }
    ],
    page:1,
    pages:10
};

class AdminVideosContainer extends Component{
    constructor(props){
        super(props);
        this.state={
            //decides whether or no modal is showing
            show:false,

            //create new video inputs
            video_title: '',
            vimeo_id: '',
            icon: null
        }
    }

    //open modal for creating a new video
    showModal = () =>{
        this.setState({show: true});
    };

    //close modal for creating a new video
    handleClose = () =>{
        this.setState({show:false});
    };

    //alter title when creating a new video
    handleTitle = (video_title) =>{
        this.setState({video_title});
    };

    //alter vimeo id when creating new video
    handleVimeo = (vimeo_id) =>{
        this.setState({vimeo_id});
    };

    //handle icon alteration when creating new video
    handleIcon = (file) =>{
        this.setState({icon : file.currentTarget.files[0]});
    };

    render(){
        return (
            <div>
                <h3 className={`lgtBlue`}>Videos <i onClick={this.showModal} className="red fas fa-plus-circle"></i></h3>
                <AdminVideoList videos={videos.videos}/>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create New Video</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <div className="form-group">
                                <label>Video Title</label>
                                <input
                                    className={styles.form_input}
                                    type="text"
                                    value={this.state.video_title}
                                    onChange={(e)=>this.handleTitle(e.target.value)}/>
                            </div>
                            <div className="form-group">
                                <label>Vimeo ID</label>
                                <input
                                    className={styles.form_input}
                                    type="text"
                                    value={this.state.vimeo_id}
                                    onChange={(e)=>this.handleVimeo(e.target.value)}/>
                            </div>
                            <div className="form-group">
                                <FileInput onChange={this.handleIcon} label={'+ Icon'}/>
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.handleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
};

export default AdminVideosContainer;