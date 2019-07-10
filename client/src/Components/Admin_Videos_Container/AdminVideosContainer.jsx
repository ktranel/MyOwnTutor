import React, {Component} from 'react';
import AdminVideoList from '../Admin_Video_List/AdminVideoList';
import {Button, Modal} from 'react-bootstrap';
import FileInput from '../File_Input/FileInput';
import styles from './AdminVideosContainer.module.css';
import ReactPaginate from 'react-paginate';
import { connect } from "react-redux";
import { getAdminVideoList } from "../../Actions/Video_Actions";

class AdminVideosContainer extends Component{
    constructor(props){
        super(props);
        this.state={
            //decides whether or no modal is showing
            show:false,
            //create new video inputs
            video_title: '',
            vimeo_id: '',
            icon: null,
            // handle pagination
            page: 1
        }
    }

    componentDidMount() {
        // set off function to add video list to state
        this.props.getAdminVideoList();
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

    // handle form submission
    handleSubmit = (e) => {
        e.preventDefault();
        this.handleClose();
    };

    // handle loading pages of videos
    handlePageClick = data => {
        const page = data.selected + 1;
        this.setState({ page }, () => {
            this.props.getAdminVideoList(this.state.page);
        });
    };
    render(){
        return (
            <div>
                <h3 className={`lgtBlue`}>Videos <i onClick={this.showModal} className="red fas fa-plus-circle"></i></h3>
                <AdminVideoList videos={this.props.videos}/>
                <ReactPaginate
                    previousLabel={<i class="fas fa-arrow-left"></i>}
                    nextLabel={<i class="fas fa-arrow-right"></i>}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    pageCount={this.props.pages}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={3}
                    onPageChange={this.handlePageClick}
                    containerClassName={'pagination'}
                    subContainerClassName={'pages pagination'}
                    activeClassName={'active'}
                />
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create New Video</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={this.handleSubmit}>
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
                        <Button variant="primary" type={"submit"} onClick={this.handleSubmit}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
};

function mapStateToProps({ adminVideoList }){
    return {
        videos: adminVideoList.videos || [],
        pages: adminVideoList.pages || 0,
    };
}
export default connect(mapStateToProps, { getAdminVideoList })(AdminVideosContainer);