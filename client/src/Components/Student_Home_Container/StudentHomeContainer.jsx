import React, {Component} from 'react';
import {GetCourses} from "../../Actions/Course_Actions";
import {connect} from 'react-redux';
import StudentMenu from '../shared/Student_Menu/StudentMenu';

class StudentHomeContainer extends Component{
    componentDidMount(){
        this.props.GetCourses(this.props.user.username);
    }

    render(){
        if(this.props.courses) console.log(this.props.courses);
        return(
            <div>
                <StudentMenu/>
            </div>
        )
    }
}

const mapStateToProps = ({user, courses}) =>{
  return {
      user,
      courses
  }
};

export default connect(mapStateToProps, {GetCourses})(StudentHomeContainer);