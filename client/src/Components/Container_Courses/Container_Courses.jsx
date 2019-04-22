import React from 'react';
import AdminCourseList from '../Admin_Course_List/AdminCourseList';

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


const ContainerCourses = () =>{
    return(
       <div>
           <h3 className={`lgtBlue`}>Courses <i className="red fas fa-plus-circle"></i></h3>
           <AdminCourseList courses={courseMock.courses}/>
       </div>
    )
};

export default ContainerCourses;