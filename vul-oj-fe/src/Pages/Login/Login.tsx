import { Button, Checkbox, Form, Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import React from 'react'

import styles from './Login.module.scss'

class Login extends React.Component {

  handleFinish = () => {

  }

  handleFinishFailed = () => {

  }

  render() {
    return (
      <div className={styles['container']}>

        <div className={styles['login_form']}>
          <h2 className={styles['login_title']}>欢迎使用VulOj</h2>

          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={this.handleFinish}
            onFinishFailed={this.handleFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              className={styles['']}
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input
                className={styles['login_input']}
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="请输入用户名"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input
                className={styles['login_input']}
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="请输入密码"
              />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked" >
              <Checkbox>记住用户名/密码</Checkbox>
            </Form.Item>

            <Form.Item>
              <Button
                className={styles['submit_button']}
                type="primary"
                htmlType="submit"
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}

export default Login;