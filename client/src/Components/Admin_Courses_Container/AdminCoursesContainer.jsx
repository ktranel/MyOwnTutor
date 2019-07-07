import React, { Component } from 'react';
import AdminCourseList from '../Admin_Course_List/AdminCourseList';
import { adminCourses} from "../../Actions/Course_Actions";
import { connect } from "react-redux";

const courseMock = {
    courses: [
        {
            id:1,
            title: 'General Chemistry 1',
            description: 'A general review of chemistry. Geared towards first year chemistry students',
            status: 'published',
            author: 'Kyle Tranel',
            last_edited: '01/01/2018'
        },
        {
            id:2,
            title: 'General Chemistry 2',
            description: 'A general review of chemistry. Geared towards first year chemistry students',
            status: 'published',
            author: 'Kyle Tranel',
            last_edited: '01/01/2018'
        },
        {
            id:3,
            title: 'Anatomy & Physiology',
            description: 'A general review of A&P. Geared towards first year med students',
            status: 'draft',
            author: 'Kyle Tranel',
            last_edited: '01/01/2018'
        },
    ],
    pages: 3,
    page:1
};


class ContainerCourses extends Component{
    componentDidMount() {
        this.props.adminCourses();
    }

    render(){
        return(
            <div>
                <h3 className={`lgtBlue`}>Courses <i className="red fas fa-plus-circle"> </i></h3>
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
export default connect(mapStateToProps, {adminCourses})(ContainerCourses);