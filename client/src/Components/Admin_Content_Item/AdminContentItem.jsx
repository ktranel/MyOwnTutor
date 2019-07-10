import React from 'react';
import styles from './styles.module.css';
import { Draggable } from 'react-beautiful-dnd';

const ContentItem = ({ content, index }) => {
    return (
        <Draggable draggableId={content.id} index={index}>
            {(provided) => (
                <div className={`row`} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                    <div className={styles.contentItem}>
                        <div className={styles.icon}>
                            { content.format === 'video' ?
                                <i className="fas fa-video"> </i> :
                                <i className="fas fa-question-circle"> </i> }
                        </div>
                        <div className={styles.text}>{content.title}</div>
                    </div>
                </div>
            )}
        </Draggable>
    )
};

export default ContentItem;