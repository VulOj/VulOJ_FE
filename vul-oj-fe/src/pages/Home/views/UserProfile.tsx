import { Avatar, Col, Menu, Row } from "antd";
import React from "react";

import styles from '../styles/UserProfile.module.scss'

import avatar from 'src/commons/images/avatar.jpg';
import userCover from 'src/commons/images/user_cover.jpeg';

interface IUserProfileState {
  current: string
}

interface IUserProfileProp {

}

class UserProfile extends React.Component<IUserProfileProp, IUserProfileState> {
  constructor(props: IUserProfileProp) {
    super(props);

    const locationHash = window.location.hash;
    if (locationHash === '') {
      window.location.hash = 'home';
      this.state = {
        current: 'home'
      }
    } else {
      this.state = {
        current: locationHash.substring(1)
      }
    }
  }

  handleTabClick = (e: any) => {
    window.location.hash = '#' + e.key;
  }

  render() {
    const { current } = this.state;

    return (
      <div className={styles['content_large']}>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <div className={styles['card']}>
              <div className={styles['user_cover_wrapper']}>
                <div className={styles['user_cover']}>
                  <img src={userCover} alt="user_cover" />
                </div>
              </div>
              <div className={styles['user_profile_wrapper']}>

                <div className={styles['user_avatar_wrapper']}>
                  <div className={styles['user_avatar']}>
                    <Avatar src={avatar} size={160} />
                  </div>
                </div>
                <div className={styles['user_profile']}>
                  <div>
                    <span className={styles['user_name']}>沈博宇</span>
                  </div>
                  <div className={styles['user_email']}>
                    <span>shouxindehai@outlook.com</span>
                  </div>
                </div>
              </div>
              <div className={styles['user_profile_tab_wrapper']}>
                <Menu
                  onClick={this.handleTabClick}
                  defaultSelectedKeys={[current]}
                  mode='horizontal'
                >
                  <Menu.Item key='home'>
                    主页
                  </Menu.Item>
                  <Menu.Item key='blog'>
                    博客
                  </Menu.Item>
                  <Menu.Item key='practice'>
                    练习
                  </Menu.Item>
                  <Menu.Item key='collect'>
                    收藏
                  </Menu.Item>
                  <Menu.Item key='team'>
                    团队
                  </Menu.Item>

                </Menu>
              </div>
            </div>
          </Col>
        </Row>

        <div>
          <UserHome />
        </div>
      </div>
    );
  }
}

export default UserProfile;

function UserHome() {
  return (
    <Row gutter={[16, 16]}>
      <Col span={16}>
        <div className={styles['card']}>

        </div>
      </Col>
      <Col span={16}>
      </Col>
    </Row>
  );
}

function UserBlog() {

}

function UserPractice() {

}

function UserCollect() {

}

function UserTeam() {

}