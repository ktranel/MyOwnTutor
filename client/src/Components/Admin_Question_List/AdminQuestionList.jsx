import React from 'react';
import QuestionListItem  from "../Question_List_Item/QuestionListItem";

const AdminQuestionList = ({questions}) =>{
    return(
        <div className={'clearfix'}>
            {questions.map(question=>{
                return <QuestionListItem key={question.id} question={question}/>
            })}
        </div>
    )
};

export default AdminQuestionList;