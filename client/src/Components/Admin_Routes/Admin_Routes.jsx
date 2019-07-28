import React from 'react';
import {Route} from 'react-router-dom';
import AdminNav from '../shared/Admin_Nav/Admin_Nav';
import ContainerCourses from '../Admin_Courses_Container/AdminCoursesContainer';
import SingleCourseContainer from '../Admin_Single_Course_Container/AdminSingleCourseContainer';
import ContainerVideos from '../Admin_Videos_Container/AdminVideosContainer';
import ContainerQuestions from '../Admin_Questions_Container/AdminQuestionsContainer';
import NewQuestionContainer from '../Admin_NewQuestions_Container/AdminNewQuestionContainer';
import NewCourseContainer from '../Admin_NewCourse_Container/AdminNewCourseContainer';
import SingleQuestionContainer from '../Admin_SingleQuestion_Container/AdminSingleQuestionContainer';

const Admin_Routes = (props) =>{
    return(
        <div>
            <AdminNav/>
            <div className={'p:7'}>
                <Route path={props.match.path + '/users'} render={()=><div>users</div>}/>
                <Route path={props.match.path + '/courses'} exact component={ContainerCourses}/>
                <Route path={props.match.path + '/courses/new'} exact component={NewCourseContainer}/>
                <Route path={props.match.path + '/courses/:course'} exact
                       render={
                           ()=>{
                               const course_title = props.location.pathname.replace('/admin/courses/', '');
                               return <SingleCourseContainer course_title={course_title}/>
                           }
                       }
                />

                <Route path={props.match.path + '/videos'} exact component={ContainerVideos}/>
                <Route path={props.match.path + '/questions'} exact component={ContainerQuestions}/>
                <Route path={`${props.match.path}/questions/id/:id`} component={SingleQuestionContainer}/>
                <Route path={props.match.path + '/questions/new'} exact component={NewQuestionContainer}/>
            </div>
        </div>
    )
}

export default Admin_Routes;