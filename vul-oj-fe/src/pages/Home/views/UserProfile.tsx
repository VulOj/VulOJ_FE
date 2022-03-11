import { Col, Row } from "antd";
import React from "react";

import styles from '../styles/Blog.module.scss'

class UserProfile extends React.Component {
  render() {
    return (
      <div className={styles['content_large']}>
        
        <Row gutter={[16, 16]}>
          <Col span={6}>

          </Col>
          <Col span={18}>
            
          </Col>
        </Row>
      </div>
    );
  }
}

export default UserProfile;