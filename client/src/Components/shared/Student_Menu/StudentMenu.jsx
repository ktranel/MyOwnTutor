import React from 'react';
import styles from './StudentMenu.module.css';
import {Link} from 'react-router-dom';

const StudentMenu = () =>{
    return(
        <div className={`lgtBlueBG white ${styles.container}`}>
                <div className={`${styles.menu_item}`}>
                    <Link to={'/home'}>
                        <i className={`fas fa-home ${styles.icon}`}></i>
                        <span className={styles.link_text}>Home</span>
                    </Link>
                </div>
                <div className={`${styles.menu_item}`}>
                    <Link to={'/courses'}>
                        <i className={`fas fa-book ${styles.icon}`}></i>
                        <span className={styles.link_text}>Courses</span>
                    </Link>
                </div>
                <div className={`${styles.menu_item}`}>
                    <Link to={'/enroll'}>
                        <i className={`fas fa-school ${styles.icon}`}></i>
                        <span className={styles.link_text}>Enroll</span>
                    </Link>
                </div>
                <div className={`${styles.menu_item}`}>
                    <Link to={'/profile'}>
                        <i className={`fas fa-user ${styles.icon}`}></i>
                        <span className={styles.link_text}>Profile</span>
                    </Link>
                </div>

        </div>
    )
};

export default StudentMenu;