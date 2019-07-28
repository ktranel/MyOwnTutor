import React, { Component } from 'react';
import { connect } from "react-redux";
import { getAdminVideoList } from "../../Actions/Video_Actions";
import {Modal} from "react-bootstrap";
import VideoAddItem from "../Video_Add_Item/VideoAddItem";

/* This component will display a modal of videos.
First it will update the redux state, grabbing a list of videos.
It will expect the following props:
    - show : boolean (determines if the modal is visible)
    - handleClose: function (function to close the modal, should change the show state)
    - selected : array (list of videos already selected)
    - selectVideo: function (function to be executed when a video is selected. It will pass a video as its 1st argument)
 */
 class List extends Component{
     state={page: 1};
     componentDidMount() {
         this.props.getAdminVideoList(1);
     }

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

     render(){
         return (
             <div>
                 <Modal show={this.props.show} onHide={this.props.handleClose}>
                     <Modal.Header closeButton>
                     </Modal.Header>
                     <Modal.Body>
                         <form>
                             {this.props.videos.map((video, i)=>{
                                 //determine if video was already selected by user
                                 let selected = this.props.selected.filter(item=>video.id === item.id).length;
                                 return (
                                     <VideoAddItem
                                         key={i}
                                         item={video}
                                         selected={selected}
                                         alterSelected={this.props.selectVideo}/>
                                 )
                             })}
                         </form>
                     </Modal.Body>
                     <Modal.Footer>
                         <button onClick={(e)=>this.changePage(e, 'prev')}><i className="fas fa-arrow-left"> </i></button>
                         <button onClick={(e)=>this.changePage(e, 'next')}><i className="fas fa-arrow-right"> </i></button>
                     </Modal.Footer>
                 </Modal>
             </div>
         );
     }
 };
 function mapStateToProps({ adminVideoList}) {
     return {
         videos: adminVideoList.videos || [],
         pages: adminVideoList.pages
     };
 }
 export default connect(mapStateToProps, { getAdminVideoList })(List);