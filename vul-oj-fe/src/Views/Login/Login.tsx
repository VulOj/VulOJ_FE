import { Button, Checkbox, Form, Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import React from 'react'

import styles from './Login.module.scss'
import { login } from '../../Api/account';
import { set } from '../../Utils/utils';

class Login extends React.Component {

  handleFinish = (form: any) => {
    const { email, password } = form;

    login(email, password).then(response => {
      const { code, msg } = response.data;
      console.log(response.status);

      if (code === 200) {
        // Login successfully
        set('token', response.data.token);
      } else if (code === 400) {
        // Wrong email or password

      } else {
        // Unknown error

      }
    });
  }

  handleFinishFailed = () => {
    
  }

  checkUserName = (_: any, value: string) => {
    if (value === undefined) {
      return Promise.reject(new Error('请输入邮箱'))
    } else if (value === 'abc') {
      return Promise.reject(new Error('Invalid email'));
    } else {
      return Promise.resolve();
    }
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
              name="email"
              rules={[{ required: true,  validator: this.checkUserName }]}
            >
              <Input
                className={styles['login_input']}
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="请输入注册邮箱"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: '请输入密码' }]}
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