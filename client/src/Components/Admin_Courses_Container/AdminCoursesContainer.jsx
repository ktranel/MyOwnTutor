import React, { Component } from 'react';
import AdminCourseList from '../Admin_Course_List/AdminCourseList';
import { adminCourses, adminCoursesClear} from "../../Actions/Course_Actions";
import { connect } from "react-redux";

class ContainerCourses extends Component{
    componentDidMount() {
        this.props.adminCourses({});
    }

    componentWillUnmount() {
        this.props.adminCoursesClear();
    }

    render(){
        return(
            <div>
                <h4 className={`lgtBlue`}>Courses <i className="red fas fa-plus-circle"> </i></h4>
                <AdminCourseList courses={this.props.adminCourseList}/>
            </div>
        )
    }
};
const mapStateToProps = ({ adminCourseList }) =>{
    return {
        adminCourseList
    }
}
export default connect(mapStateToProps, { adminCourses, adminCoursesClear })(ContainerCourses);