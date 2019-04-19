import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Admin_Nav.module.css';
import './AdminNav.css';

const Admin_Nav = () =>{
    return(
        <div className={`row ${styles.Admin_Nav} lgtBlueBG admin-nav`}>
            <NavLink className={`white ${styles.link}`} to={'/admin/users'}>Users</NavLink>
            <NavLink className={`white ${styles.link}`} to={'/admin/courses'}>Courses</NavLink>
            <NavLink className={`white ${styles.link}`} to={'/admin/videos'}>Videos</NavLink>
            <NavLink className={`white ${styles.link}`} to={'/admin/questions'}>Questions</NavLink>
        </div>
    )
};

export default Admin_Nav;