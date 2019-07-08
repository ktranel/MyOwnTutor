import React from 'react';
import styles from './styles.module.css';

const ContentItem = ({ content }) => {
    return (
        <div className={`row`}>
            <div className={styles.contentItem}>
                <div className={styles.icon}>
                    { content.format === 'video' ?
                        <i className="fas fa-video"> </i> :
                        <i className="fas fa-question-circle"> </i> }
                </div>
                <div className={styles.text}>{content.title}</div>
            </div>
        </div>
    )
};

export default ContentItem;