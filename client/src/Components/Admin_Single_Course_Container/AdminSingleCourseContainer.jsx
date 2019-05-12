import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Section from '../Admin_Section/AdminSection';

let course_example = {
    title: 'General Chemistry',
    sections:[
        {
            order:1,
            title:'Section 1',
            content:[
                {
                    order:1,
                    type: 'lecture',
                    title:'Lesson 1',
                    vimeo_id:'000',
                    youtube_url: 'someurl.com'
                },
                {
                    order:2,
                    type: 'lecture',
                    title:'Lesson 2',
                    vimeo_id:'000',
                    youtube_url: 'someurl.com'
                },
                {
                    order:3,
                    type: 'question',
                    title:'Question 1',
                    vimeo_id:'000',
                    youtube_url: 'someurl.com'
                },
            ]
        },
        {
            order:2,
            title:'Section 2',
            content:[
                {
                    order:1,
                    type: 'lecture',
                    title:'Lesson 1',
                    vimeo_id:'000',
                    youtube_url: 'someurl.com'
                },
                {
                    order:2,
                    type: 'lecture',
                    title:'Lesson 2',
                    vimeo_id:'000',
                    youtube_url: 'someurl.com'
                },
                {
                    order:3,
                    type: 'question',
                    title:'Question 1',
                    vimeo_id:'000',
                    youtube_url: 'someurl.com'
                },
            ]
        },
        {
            order:3,
            title:'Section 3',
            content:[
                {
                    order:1,
                    type: 'lecture',
                    title:'Lesson 1',
                    vimeo_id:'000',
                    youtube_url: 'someurl.com'
                },
                {
                    order:2,
                    type: 'lecture',
                    title:'Lesson 2',
                    vimeo_id:'000',
                    youtube_url: 'someurl.com'
                },
                {
                    order:3,
                    type: 'question',
                    title:'Question 1',
                    vimeo_id:'000',
                    youtube_url: 'someurl.com'
                },
            ]
        }
    ]

};

class AdminSingleCourseContainer extends Component{
    renderSections=()=>{
        //need to replace with stateful call
        if(course_example){
            return course_example.sections.map(section=>{
                return (
                    <Section title={section.title}/>
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

export default AdminSingleCourseContainer;