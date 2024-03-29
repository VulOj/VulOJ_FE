import React, { CSSProperties } from 'react'

import styles from '../styles/Header.module.scss'

import logo from 'src/commons/images/VULOJ_LOGO.png'
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Menu, message } from 'antd';
import { Link, NavigateFunction } from 'react-router-dom';
import { withRouter } from 'src/commons/utils/withRouter';
import { get, remove } from 'src/commons/utils/utils';

interface IHeaderProp {
  items: Array<{
    name: string,
    link: string
  }>,
  selected: string,
  navigate: NavigateFunction
}

interface IHeaderState {

}

class Header extends React.Component<IHeaderProp, IHeaderState> {
  
  componentDidMount = () => {
    if (get('isFirstOpen') === 'true') {
      message.success('登录成功！');
      remove('isFirstOpen');
    }
  }

  componentDidUpdate = () => {
    if (get('isFirstOpen') === 'true') {
      message.success('登录成功！');
      remove('isFirstOpen');
    }
  }

  render() {
    const { selected } = this.props;

    const menuItemStyle: CSSProperties = {
      height: '100%',
      lineHeight: '64px',
      fontSize: '16px'
    }

    const menuRightLogin = (
      <Menu selectedKeys={[selected]} mode='horizontal'
        style={{ borderBottom: 'none' }}
      >
        <Menu.Item key='register' style={menuItemStyle}>
          <Link to='register'>注册</Link>
        </Menu.Item>
        <Menu.Item key='login' style={menuItemStyle}>
          <Link to='login'>登陆</Link>
        </Menu.Item>
      </Menu>
    );

    const userName = get('email');

    const menuRightUserName = (
      <span className={styles['header_tab_username']}>{userName}</span>
    )

    return (
      <header className={styles['header']}>
        <div className={styles['header_wrapper']}>
          <div className={styles['header_logo']}>
            <Link to='.'>
              <img src={logo} alt="vuloj_logo" />
            </Link>
          </div>

          <div className={styles['header_tab_left']}>
            <Menu selectedKeys={[selected]} mode='horizontal'
              style={{ borderBottom: 'none' }}
            >
              {
                this.props.items.map((value, _) => {
                  return (
                    <Menu.Item key={value.link} style={menuItemStyle}
                    >
                      <Link to={value.link}>
                        {value.name}
                      </Link>
                    </Menu.Item>
                  )
                })
              }
            </Menu>
          </div>

          <div className={styles['header_tab_user']}>
            <Link to='profile'>
              <Avatar size='large' icon={<UserOutlined />} style={{ margin: 'auto auto' }} />
            </Link>
          </div>

          <div className={styles['header_tab_right']}>
            {userName === null ? menuRightLogin : menuRightUserName}
          </div>

        </div>
      </header>
    )
  }
}

export default withRouter(Header);