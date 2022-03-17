import { Avatar, Button, Col, Menu, Row } from "antd";
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
    this.setState({
      current: e.key
    });
  }

  render() {
    const { current } = this.state;

    let userProfileContent = <></>;
    switch (current) {
      case 'home':
        userProfileContent = <UserHome />;
        break;
      case 'blog':
        userProfileContent = <UserBlog />;
        break;
      case 'practice':
        userProfileContent = <UserPractice />;
        break;
      case 'collect':
        userProfileContent = <UserCollect />;
        break;
      case 'team':
        userProfileContent = <UserTeam />;
        break;
      default:
        userProfileContent = <h1>No such part</h1>;
        break;
    }

    return (
      <div className={styles['content_large']}>
        <div className={styles['user_profile_header']}>
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
                    <div className={styles['user_name']}>
                      <span>沈博宇</span>
                    </div>
                    <div className={styles['user_email']}>
                      <span>shouxindehai@outlook.com</span>
                      <Button size='small' type="primary" ghost>编辑资料</Button>
                    </div>
                  </div>
                </div>
                <div className={styles['user_profile_tab_wrapper']}>
                  <Menu
                    onClick={this.handleTabClick}
                    defaultSelectedKeys={[current]}
                    mode='horizontal'
                    style={{
                      borderBottom: 'none',
                      marginBottom: '1px'
                    }}
                  >
                    <Menu.Item key='home'>
                      <a href="#home">主页</a>
                    </Menu.Item>
                    <Menu.Item key='blog'>
                      <a href="#blog">博客</a>
                    </Menu.Item>
                    <Menu.Item key='practice'>
                      <a href="#practice">练习</a>
                    </Menu.Item>
                    <Menu.Item key='collect'>
                      <a href="#collect">收藏</a>
                    </Menu.Item>
                    <Menu.Item key='team'>
                      <a href="#team">团队</a>
                    </Menu.Item>
                  </Menu>
                </div>
              </div>
            </Col>
          </Row>
        </div>

        <div>
          {userProfileContent}
        </div>
      </div>
    );
  }
}

export default UserProfile;

function UserHome() {
  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={17}>
          <div className={styles['card']}>
            <div className={styles['self_description']}>
              <div className={styles['self_description_title']}>
                <span>个人简介</span>
                <Button size="small">
                  编辑
                </Button>
              </div>
              <div className={styles['self_description_content']}>
                <p>
                  这个人很懒，什么都没有写。
                </p>
              </div>
            </div>
          </div>
        </Col>
        <Col span={7}>
          <div className={styles['card']}>
            <div className={styles['user_info']}>
              <div>
                <span className={styles['user_info_header']}>用户类别</span>
                <span className={styles['user_info_content']}>普通用户</span>
              </div>
              <div>
                <span className={styles['user_info_header']}>用户编号</span>
                <span className={styles['user_info_content']}>U1</span>
              </div>
              <div>
                <span className={styles['user_info_header']}>加入时间</span>
                <span className={styles['user_info_content']}>2022.3.15</span>
              </div>
              <div>
                <span className={styles['user_info_header']}>用户排名</span>
                <span className={styles['user_info_content']}>13.1k</span>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

function UserBlog() {
  return (
    <div>

    </div>
  )
}

function UserPractice() {
  return (
    <div>

    </div>
  )
}

function UserCollect() {
  return (
    <div>

    </div>
  )
}

function UserTeam() {
  return (
    <div>

    </div>
  )
}