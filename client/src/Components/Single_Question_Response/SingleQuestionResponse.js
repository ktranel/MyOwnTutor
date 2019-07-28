import React from 'react';
import styles from './SingleQuestionResponse.module.css';

const Response = ({response, changeAnswer, changeResponse, deleteResponse }) => {
    return (
        <div className={`clearfix ${styles.response} m-b:1`}>
            <i className={`fas fa-trash-alt red ${styles.trash}`} onClick={()=>deleteResponse(response.id)}> </i>
            <textarea value={response.response} className={`${styles.input}`} onChange={(e)=>changeResponse(response.id, e.target.value)}/>
            <input type="checkbox" checked={response.answer} className={`${styles.check}`} onChange={()=>changeAnswer(response.id)}/>
        </div>
    )
};

export default Response;