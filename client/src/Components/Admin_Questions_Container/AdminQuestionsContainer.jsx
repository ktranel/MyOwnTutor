import React from 'react';
import AdminQuestionList from '../Admin_Question_List/AdminQuestionList';
import {DateTime} from "luxon";

const Question_Mock = {
    questions:[
        {
            id:899879,
            type: 'text',
            category: 'Chemistry',
            title: 'What is the circumference of a circle?',
            author: 'Kyle Tranel',
            edited: DateTime.local().toLocaleString(DateTime.DATETIME_MED)
        },
        {
            id:551,
            type: 'text',
            category: 'Chemistry',
            title: 'What is your name?',
            author: 'Kyle Tranel',
            edited: DateTime.local().toLocaleString(DateTime.DATETIME_MED)
        },
        {
            id:4525,
            type: 'multiple choice',
            category: 'Chemistry',
            title: 'Given the following equation, what is the answer to an anonymous question?',
            author: 'Kyle Tranel',
            edited: DateTime.local().toLocaleString(DateTime.DATETIME_MED)
        }
    ],
    page:1,
    pages:5
};

const AdminQuestionsContainer = () =>{
    return (
        <div className={'row'}>
            <div className="col-12">
                <div className="row">
                    <div className="col-12 col-md-8"><h5>Questions</h5></div>
                    <div className="d-none d-sm-none d-md-block col-md-2"><h5>Type</h5></div>
                    <div className="d-none d-sm-none d-md-block col-md-2"><h5>Category</h5></div>
                </div>
            </div>
            <div className={'col-12'}>
                <AdminQuestionList questions={Question_Mock.questions}/>
            </div>
        </div>
    )
};

export default AdminQuestionsContainer;