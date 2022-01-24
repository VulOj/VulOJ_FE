import { Button, Checkbox, Form, Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import React from 'react'

import styles from '../Styles/Login.module.scss';
import publicStyles from '../Styles/Public.module.scss'
import { login } from '../Apis/account';
import { set, checkEmail, checkPassword } from '../Utils/utils';
import { Link } from 'react-router-dom';
import { ValidateStatus } from 'antd/lib/form/FormItem';

interface ILoginProp {

}

interface ILoginStatus {
  vStatusEmail: ValidateStatus,
  helpEmail: string,
  vStatusPassword: ValidateStatus,
  helpPassword: string
}

class Login extends React.Component<ILoginProp, ILoginStatus> {
  isFirstSubmit = true;

  constructor(props: ILoginProp) {
    super(props);
    this.state = {
      vStatusEmail: 'validating',
      helpEmail: '',
      vStatusPassword: 'validating',
      helpPassword: ''
    };
  }

  handleFinish = (form: any) => {
    this.isFirstSubmit = false;
    
    let isValidate = this.validate('email', form.email);
    isValidate = isValidate && this.validate('password', form.password);

    if (isValidate) {
      login(form.email, form.passwd).then(
        response => {
          console.log(response);
        },
        reason => {

        }
      )
    }
  }

  handleChange = (name: string) => (e: any) => {
    if (this.isFirstSubmit) return;

    this.validate(name, e.target.value);
  }

  // 校验数据，并显示相关提示信息
  validate = (name: string, value: string) => {
    switch (name) {
      case 'email': {
        if (value === undefined || value === '' || value === null) {
          this.setState({
          vStatusEmail: 'error',
          helpEmail: '请输入邮箱'
          });
          return false;
        }
        let b = checkEmail(value);
        this.setState({
          vStatusEmail: b ? 'success' : 'error',
          helpEmail: b ? '' : '邮箱格式不正确'
        });
        return b;
      }

      case 'password': {
        if (value === undefined || value === '' || value === null) {
          this.setState({
          vStatusPassword: 'error',
          helpPassword: '请输入密码'
          });
          return false;
        }
        let b = checkPassword(value);
        this.setState({
          vStatusPassword: b ? 'success' : 'error',
          helpPassword: b ? '' : '密码长度为8-16位，且必须同时包括数字、字母和特殊符号'
        });
        return b
      }
      default:

        break;
    }
  }

  handleFocus = (e: any) => {
    this.setState({
      helpPassword: '密码长度为8-16位，且必须同时包括数字、字母和特殊符号'
    });
  }

  handleBlur = (e: any) => {
    if (this.state.vStatusPassword === 'validating'
      || this.state.vStatusPassword === 'success') {
      this.setState({
        helpPassword: ''
      });
    }
  }

  render() {
    const { vStatusEmail, helpEmail, vStatusPassword, helpPassword } = this.state;

    return (
      <div className={publicStyles['container']}>
        <div className={publicStyles['content_small']}>
          <h2 className={styles['login_title']}>欢迎使用VulOj</h2>

          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={this.handleFinish}
            autoComplete="off"
          >
            <Form.Item
              name="email"
              validateStatus={vStatusEmail}
              help={helpEmail}
            >
              <Input
                size='large'
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="请输入注册邮箱"
                onChange={this.handleChange('email')}
              />
            </Form.Item>
            <Form.Item
              name="password"
              validateStatus={vStatusPassword}
              help={helpPassword}
            >
              <Input
                size='large'
                prefix={<LockOutlined className="site-form-item-icon" />}
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
              >
                登录
              </Button>
            </Form.Item>
            没有账号? &nbsp; <Link to='/register'>点我注册!</Link>
          </Form>
        </div>
      </div>
    )
  }
}

export default Login;