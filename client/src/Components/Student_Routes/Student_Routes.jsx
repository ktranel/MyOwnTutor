import React from 'react';
import {Route} from 'react-router-dom';
import StudentHome from '../Student_Home_Container/StudentHomeContainer';

const Student_Routes = (props) =>{
    return(
        <div>
            <Route path={props.match.path + '/'} exact component={StudentHome}/>
        </div>
    )
}

export default Student_Routes;