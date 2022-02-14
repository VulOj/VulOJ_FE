import React from 'react'
import { Link } from 'react-router-dom';
import { Button, Checkbox, Form, Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import styles from '../styles/Login.module.scss';
import publicStyles from 'src/commons/styles/public.module.scss'
import { login } from 'src/commons/api/account';
import { set, checkEmail, checkPassword } from 'src/commons/utils/utils';
import { IFormValidate } from 'src/commons/interface';

interface ILoginProp {

}

interface ILoginStatus {
  validatePassword: IFormValidate,
}

class Login extends React.Component<ILoginProp, ILoginStatus> {
  isFirstSubmit = true;

  constructor(props: ILoginProp) {
    super(props);
    this.state = {
      validatePassword: {
        validateStatus: 'validating',
        help: ''
      }
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

  validate = (name: string) => (_: any, value: any) => {
    if (this.isFirstSubmit) {
      return Promise.resolve();
    }

    switch (name) {
      case 'email': {
        if (value === undefined || value === '' || value === null)
          return Promise.reject(new Error('请输入邮箱'));
        else if (!checkEmail(value))
          return Promise.reject(new Error('邮箱格式不正确'));
        break;
      }

      case 'password': {
        if (value === undefined || value === '' || value === null) {
          this.setState({
            validatePassword: {
              validateStatus: 'error'
            }
          });
          return Promise.reject(new Error('请输入密码'));
        }
        else if (!checkPassword(value)) {
          this.setState({
            validatePassword: {
              validateStatus: 'error'
            }
          });
          return Promise.reject(new Error('密码长度为8-16位，且必须同时包括数字、字母和特殊符号'));
        }

        this.setState({
          validatePassword: {
            validateStatus: 'success'
          }
        });
        break;
      }

      default:
        break;
    }
    return Promise.resolve();
  }

  render() {
    const { validatePassword } = this.state;

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
              rules={[{ validator: this.validate('email') }]}
            >
              <Input
                size="large"
                prefix={<UserOutlined />}
                placeholder="请输入邮箱"
              />
            </Form.Item>
            <Form.Item
              name="password"
              {...validatePassword}
              rules={[{ validator: this.validate('password') }]}
            >
              <Input.Password
                size="large"
                prefix={<LockOutlined />}
                type="password"
                placeholder="请输入密码"
                // onChange={this.handleChange('password')}
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