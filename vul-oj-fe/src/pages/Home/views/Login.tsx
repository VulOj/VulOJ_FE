import React from 'react'
import { Link } from 'react-router-dom';
import { Button, Checkbox, Form, Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import styles from '../styles/Login.module.scss';
import publicStyles from 'src/commons/styles/public.module.scss'
import { login } from 'src/commons/api/account';
import { set, check } from 'src/commons/utils/utils';
import { IFormValidate } from 'src/commons/interface';

interface ILoginProp {

}

interface ILoginStatus {
  validateEmail: IFormValidate,
  validatePassword: IFormValidate,
  password: string,
  email: string
}

class Login extends React.Component<ILoginProp, ILoginStatus> {
  isFirstSubmit = true;

  constructor(props: ILoginProp) {
    super(props);
    this.state = {
      validatePassword: {
        validateStatus: 'validating',
        help: ''
      },
      validateEmail: {
        validateStatus: 'validating',
        help: ''
      },
      password: '',
      email: ''
    };
  }

  handleFinish = (form: any) => {
    this.isFirstSubmit = false;

    login(form.email, form.passwd).then(
      response => {
        console.log(response);
      },
      reason => {

      }
    )

  }

  // 密码框聚焦时显示密码提示
  handleFocus = (e: any) => {
    this.setState((prevState) => {
      return {
        validatePassword: {
          ...prevState.validatePassword,
          help: '密码长度为8-16位，且必须同时包括数字、字母和特殊符号'
        }
      }
    });
  }

  // 密码框失焦时隐藏密码提示
  handleBlur = (e: any) => {
    const { validatePassword } = this.state;
    if (validatePassword.validateStatus === 'validating'
      || validatePassword.validateStatus === 'success') {

      this.setState((prevStatus) => {
        return {
          validatePassword: {
            ...prevStatus.validatePassword,
            help: ''
          }
        }
      });

    }
  }

  validate = (name: string) => (value: string) => {
    if (this.isFirstSubmit) {
      return true;
    }

    switch (name) {
      case 'email': {
        let v = check('email')(value);
        this.setState({
          validateEmail: v
        });

        if (v.validateStatus === 'success') {
          return true;
        }
        break;
      }

      case 'password': {
        let v = check('password')(value);
        this.setState({
          validatePassword: v
        });

        if (v.validateStatus === 'success') {
          return true;
        }
        break;
      }

      default:
        break;
    }
    return false;
  }

  handleChange = (name: string) => (e: any) => {
    const value = e.target.value;
    this.validate(name)(value);

    switch (name) {
      case 'email':
        this.setState({email: value});
        break;

      case 'password':
        this.setState({password: value});
        break;
    
      default:
        break;
    }
  }

  render() {
    const { validateEmail, validatePassword, email, password } = this.state;

    return (
      <div className={publicStyles['container']}>
        <div className={publicStyles['content_small']}>
          <h2 className={styles['login_title']}>欢迎使用VulOj</h2>

          <Form
            name="login"
            initialValues={{ remember: true }}
            onFinish={this.handleFinish}
            autoComplete="off"
          >
            <Form.Item
              name="email"
              initialValue={email}
              {...validateEmail}
            >
              <Input
                size="large"
                prefix={<UserOutlined />}
                placeholder="请输入邮箱"
                onChange={this.handleChange('email')}
              />
            </Form.Item>
            <Form.Item
              name="password"
              initialValue={password}
              {...validatePassword}
            >
              <Input.Password
                size="large"
                prefix={<LockOutlined />}
                type="password"
                placeholder="请输入密码"
                onChange={this.handleChange('password')}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
              />
            </Form.Item>

            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>记住用户名/密码</Checkbox>
              </Form.Item>

              <a href="." style={{ float: 'right' }}>
                忘记密码
              </a>
            </Form.Item>

            <Form.Item>
              <Button
                className={styles['submit_button']}
                type="primary"
                htmlType="submit"
                onClick={() => this.isFirstSubmit = false}
              >
                登录
              </Button>
            </Form.Item>
            没有账号? &nbsp; <Link to="/register">点我注册!</Link>
          </Form>
        </div>
      </div>
    )
  }
}

export default Login;