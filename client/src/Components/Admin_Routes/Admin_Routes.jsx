import React from 'react';
import {Route} from 'react-router-dom';
import AdminNav from '../shared/Admin_Nav/Admin_Nav';
import ContainerCourses from '../Container_Courses/Container_Courses';

const Admin_Routes = (props) =>{
    return(
        <div>
            <AdminNav/>
            <div className={'p:7'}>
                <Route path={props.match.path + '/users'} render={()=><div>users</div>}/>
                <Route path={props.match.path + '/courses'} component={ContainerCourses}/>
                <Route path={props.match.path + '/videos'} render={()=><div>videos</div>}/>
                <Route path={props.match.path + '/questions'} render={()=><div>questions</div>}/>
            </div>
        </div>
    )
}

export default Admin_Routes;