import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { connect } from "react-redux";
import { adminCourses, adminCoursesClear } from "../../Actions/Course_Actions";
import Section from '../Admin_Section/AdminSection';

class AdminSingleCourseContainer extends Component{
    state = {
        columns: {}
    };
    componentDidMount() {
        this.props.adminCourses({ title: this.props.course_title });
    }

    componentWillUnmount() {
        this.props.adminCoursesClear();
    }

    renderSections=()=>{
        const list = this.props.adminCourseList;
        if(list.length){
            const course = list[0];
            return course.sections.map(section=>{
                return (
                    <Section key={section.id} title={section.title} section={section}/>
                );
            })
        }
    };

    render(){
        return(
            <div>
                <h3 className={`lgtBlue`}>{this.props.course_title}</h3>
                <div className="row">
                    <div className="col-12 col-sm-3 col-md-2">
                        <div>
                            <Link to={'/'}><h5 className={`yellow`}>Sections</h5></Link>
                        </div>
                    </div>
                    <div className="col-12 col-sm-9 col-md-10">
                        <div>
                            <h4 className="lgtBlue">Sections</h4>
                            {this.renderSections()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
function mapStateToProps ({ adminCourseList }){
    return { adminCourseList };
}
export default connect(mapStateToProps, { adminCourses, adminCoursesClear })(AdminSingleCourseContainer);