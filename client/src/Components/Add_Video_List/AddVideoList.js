import React, { Component } from 'react';
import { connect } from "react-redux";
import { getAdminVideoList } from "../../Actions/Video_Actions";
import {Modal} from "react-bootstrap";
import VideoAddItem from "../Video_Add_Item/VideoAddItem";
 class List extends Component{
     componentDidMount() {
         this.props.getAdminVideoList(1);
     }

     render(){
         return (
             <Modal show={this.props.show} onHide={this.props.close}>
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
                     <button onClick={(e)=>changePage(e, 'prev')}><i className="fas fa-arrow-left"> </i></button>
                     <button onClick={(e)=>changePage(e, 'next')}><i className="fas fa-arrow-right"> </i></button>
                 </Modal.Footer>
             </Modal>
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