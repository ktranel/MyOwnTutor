import React from 'react';
import imageStyles from './image.module.css';

export default Image = ({image}) =>{
    return(
        <div className={imageStyles.outer}>
            <div className={imageStyles.inner} style={{backgroundImage:`url(${image})`}}></div>
        </div>
    )
}