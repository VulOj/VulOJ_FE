import React from 'react'

import styles from '../styles/Register.module.scss';
import publicStyles from 'src/commons/styles/public.module.scss';
import { Button, Checkbox, Col, Form, Input, Row, message } from 'antd';
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { checkEmail } from 'src/commons/utils/utils';
import { IFormValidate } from 'src/commons/interface';
import { sendVerifyCode } from 'src/commons/api/account';

interface IRegisterProp {

}

interface IRegisterState {
  validateEmail: IFormValidate,
  validateVerify: IFormValidate,
  validatePassword: IFormValidate,
  validateConfirm: IFormValidate,

  // 表单数据
  email: string,
  verifyCode: string,
  password: string,
  confirm: string,
  
  // 1-未发送邮件 2-已发送邮件，等待60秒 3-重新发送邮件
  verifyDisabled: boolean
  verifyMessage: string
}

class Register extends React.Component<IRegisterProp, IRegisterState> {
  isFirstSubmit = true;
  coolingTime = 60;
  timerId: any = null;

  constructor(props: IRegisterProp) {
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
      validateConfirm: {
        validateStatus: 'validating',
        help: ''
      },
      validateVerify: {
        validateStatus: 'validating',
        help:''
      },
      email: '',
      verifyCode: '',
      password: '',
      confirm: '',
      verifyDisabled: false,
      verifyMessage: '发送邮件'
    }
  }

  componentWillUnmount = () => {
    // 清除计时器
    if (this.timerId !== null) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  handleFinish = (form: any) => {
    this.isFirstSubmit = false;
  }

  // 控制展示密码格式提示
  handleFocus = () => {

  }

  handleBlur = () => {

  }

  // 表单中的输入框全部为受控组件
  handleChange = (name: string) => (e: any) => {
    const validate = this.validate(name);
    const value = e.target.value;
    switch (name) {
      case 'email':
        this.setState({
          validateEmail: validate(value),
          email: value
        });
        break;

      case 'verify':
        this.setState({
          verifyCode: value
        });
        break;

      case 'password':
        this.setState({
          validatePassword: validate(value),
          password: value
        });
        break;
      
      case 'confirm':
        this.setState({
          validateConfirm: validate(value),
          confirm: value
        });
        break;

      default:
        break;
    }
  }

  handleSendVerifyCode = () => {
    const { email,  } = this.state;

    if (!checkEmail(email)) {
      this.setState({
        validateEmail: {
          validateStatus: 'error',
          help: '邮箱格式不正确'
        }
      });
      return false;
    } else {
      sendVerifyCode(email).then(
        value => {
          console.log(value.data.msg)
          message.info(value.data.msg);
        },
        reason => {

        }
      )
    }

    this.setState({
      verifyDisabled: true,
      verifyMessage: this.coolingTime + 's后重试',
    })
    this.timerId = setInterval(() => {
      this.coolingTime -= 1;
      this.setState({
        verifyMessage: this.coolingTime + 's后重试'
      });

      if (this.coolingTime === 0) {
        this.coolingTime = 60;
        clearInterval(this.timerId);
        this.timerId = null;
        this.setState({
          verifyDisabled: false,
          verifyMessage: '重新发送'
        })
      }
    }, 1000);
  }

  // 表单验证
  validate = (name: string) => (value: any): IFormValidate => {
    if (this.isFirstSubmit) {
      return {
        validateStatus: 'validating',
        help: ''
      };
    }

    if (value === undefined || value === '' || value === null) {
      return {
        validateStatus: 'error',
        help: '必填'
      };
    }

    switch (name) {
      case 'email': {
        if (!checkEmail(value))
          return {
            validateStatus: 'error',
            help: '邮箱格式不正确'
          };
        break;
      }

      case 'password': {
        
        break;
      }

      case 'confirm': {
        
        break;
      }

      default:
        break;
    }

    return {
      validateStatus: 'success',
      help: ''
    };
  }



  render() {
    const { validatePassword, validateEmail, email, verifyCode, password, confirm, verifyDisabled, verifyMessage } = this.state;

    return (
      <div className={publicStyles['container']}>
        <div className={publicStyles['content_small']}>
          <h2 className={styles['register_title']}>欢迎注册VulOj</h2>

          <Form
            name="register"
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
                placeholder="输入你的邮箱地址"
                onChange={this.handleChange('email')}
              />
            </Form.Item>

            <Form.Item>
              <Row gutter={8}>
                <Col span={16}>
                  <Form.Item
                    name="captcha"
                    noStyle
                    rules={[{ required: true, message: '请输入验证码' }]}
                    initialValue={verifyCode}
                  >
                    <Input
                      size='large'
                      prefix={<MailOutlined />}
                      placeholder='邮箱验证码'
                      onChange={this.handleChange('verifyCode')}
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Button
                    size='large'
                    style={{ width: '100%' }}
                    onClick={this.handleSendVerifyCode}
                    disabled={verifyDisabled}
                  >
                    {verifyMessage}
                  </Button>
                </Col>
              </Row>
            </Form.Item>

            <Form.Item
              name="password"
              {...validatePassword}
              initialValue={password}
            >
              <Input.Password
                size="large"
                prefix={<LockOutlined />}
                type="password"
                placeholder="输入你的密码"
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
              />
            </Form.Item>

            <Form.Item
              name="confirm"
              {...validatePassword}
              initialValue={confirm}
            >
              <Input.Password
                size="large"
                prefix={<LockOutlined />}
                type="password"
                placeholder="确认你的密码"
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
              />
            </Form.Item>

            <Form.Item name="agreement" valuePropName="checked">
              <Checkbox>我已阅读并同意
                <a href=".">
                  《用户协议》
                </a>
              </Checkbox>
            </Form.Item>

            <Form.Item>
              <Button
                className={styles['submit_button']}
                type="primary"
                htmlType="submit"
                // 为了达到第一次提交之前不进行校验的效果
                onClick={() => this.isFirstSubmit = false}
              >
                注册
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

export default Register;