import React from 'react';
import {Link} from 'react-router-dom';
import styles from './AdminCourseList.module.css';

const AdminCourseList = ({courses}) =>{
    return(
        <div>
            <ul>
                <li>
                    {courses.map(course=>{
                        const status = course.status !== 'published' ? styles.unpublished : '';
                        return(
                            <div className={`${styles["course-listing"]} ${status} row`}>
                                <div className="col-12 col-md-6">
                                    <Link className={'red'}>{course.title}</Link>
                                    <p>{course.description}</p>
                                </div>
                                <div className={`${styles.course_meta} col-12 col-md-6`}>
                                    <div>Last Edit: {course.last_edited}</div>
                                    <div>Status: {course.status}</div>
                                </div>
                            </div>
                        )
                    })}
                </li>
            </ul>
        </div>
    )
};

export default AdminCourseList;