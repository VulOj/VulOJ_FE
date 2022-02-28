import React, { CSSProperties } from 'react'

import styles from '../styles/Header.module.scss'

import logo from 'src/commons/images/VULOJ_LOGO.png'
import { UserOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { Link, NavigateFunction } from 'react-router-dom';
import { withRouter } from 'src/commons/utils/withRouter';

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

  handleClick = (e: any) => {
    this.props.navigate(e.key);
  }

  render() {
    const { selected } = this.props;

    const menuItemStyle: CSSProperties = {
      height: '100%',
      lineHeight: '64px',
      fontSize: '16px'
    }

    return (
      <header className={styles['header']}>
        <div className={styles['header_wrapper']}>
          <div className={styles['header_logo']}>
            <img src={logo} alt="vuloj_logo" />
          </div>

          <div className={styles['header_tab_left']}>
            <Menu onClick={this.handleClick} selectedKeys={[selected]} mode='horizontal'
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
            <UserOutlined style={{
              width: '100%',
              display: 'block',
              marginTop: 20,
              fontSize: '22px',
              textAlign: 'center',
              cursor: 'pointer'
            }} />
          </div>

          <div className={styles['header_tab_right']}>
            <Menu onClick={this.handleClick} selectedKeys={[selected]} mode='horizontal'
              style={{ borderBottom: 'none' }}
            >
              <Menu.Item key='register' style={menuItemStyle}>
                注册
              </Menu.Item>
              <Menu.Item key='login' style={menuItemStyle}>
                登录
              </Menu.Item>
            </Menu>
          </div>

        </div>
      </header>
    )
  }
}

export default withRouter(Header);