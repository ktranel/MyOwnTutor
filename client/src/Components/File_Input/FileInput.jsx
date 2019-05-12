import React from 'react';
import styles from './FileInput.module.css';

const FileInput = (props) => {
    return (
        <div>
            <input {...props} type="file" name="file" id="file" className={styles.inputfile}/>
            <label className={`${styles.label} lgtBlue f-w:700`} htmlFor="file">{props.label ? props.label : 'Choose File'}</label>
        </div>
    )
};

export default FileInput;