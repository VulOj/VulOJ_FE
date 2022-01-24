import React from 'react'

import styles from '../Styles/Register.module.scss';
import publicStyles from '../Styles/Public.module.scss';

class Register extends React.Component {

    render() {
        return (
        <div className={publicStyles['container']}>
            <div className={publicStyles['content_small']}>
                <h2 className={styles['register_title']}>欢迎注册VulOj</h2>
            </div>
        </div>
        );
    }
}

export default Register;