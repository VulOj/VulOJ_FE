import React from 'react'

import styles from '../styles/Register.module.scss';
import publicStyles from 'src/commons/styles/public.module.scss';
import { Button, Checkbox, Col, Form, Input, Row, message } from 'antd';
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { check } from 'src/commons/utils/utils';
import { IFormValidate } from 'src/commons/interface';
import { register, sendVerifyCode } from 'src/commons/api/account';
import { NavigateFunction } from 'react-router-dom';
import { withRouter } from 'src/commons/utils/withRouter';

interface IRegisterProp {
  navigate: NavigateFunction
}

interface IRegisterState {
  validateEmail: IFormValidate,
  validateVerify: IFormValidate,
  validatePassword: IFormValidate,
  validateConfirm: IFormValidate,

  // 表单数据
  email: string,
  verify: string,
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
        help: ''
      },
      email: '',
      verify: '',
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
        
    if (!this.validate('all')('')) {
      return;
    }
    
    if (!form.agreement) {
      message.error('请先阅读并同意《用户协议》！');
      return;
    }
    
    const { email, password, verify: verify_code } = this.state;
    register(email, password, verify_code).then(
      response => {
        console.log(response);
        message.success(response.data.msg);
        this.props.navigate('/login');
      },
      reason => {
        console.log(reason);
        message.error(reason.response.data.msg);
      }
    );
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

  // 表单中的输入框全部为受控组件
  handleChange = (name: string) => (e: any) => {
    const value = e.target.value;
    this.validate(name)(value);

    switch (name) {
      case 'email':
        this.setState({ email: value });
        break;

      case 'verify':
        this.setState({ verify: value });
        break;

      case 'password':
        this.setState({ password: value });
        break;

      case 'confirm':
        this.setState({ confirm: value });
        break;

      default:
        break;
    }
  }

  // 发送验证码
  handleSendVerifyCode = () => {
    const { email } = this.state;
    const v = check('email')(email);
    this.setState({
      validateEmail: v
    });

    if (v.validateStatus === 'success') {
      sendVerifyCode(email).then(
        value => {
          message.success(value.data.msg);
        }
      ).catch(reason => {
        message.error(reason.toString());
      })

      // 60秒后重新发送验证码
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
  }

  // 表单验证
  validate = (name: string) => (value: string): boolean => {
    const { password } = this.state;

    if (this.isFirstSubmit) {
      return true;
    }

    switch (name) {
      case 'email': {
        let v = check('email')(value);
        this.setState({
          validateEmail: v
        });

        return v.validateStatus === 'success';
      }

      case 'verify': {
        let v = check('verify')(value);
        this.setState({
          validateVerify: v
        });

        return v.validateStatus === 'success';
      }

      case 'password': {
        let v = check('password')(value);
        this.setState({
          validatePassword: v
        });

        return v.validateStatus === 'success';
      }

      case 'confirm': {
        if (value === '' || value === undefined || value === null) {
          this.setState({
            validateConfirm: {
              validateStatus: 'error',
              help: '请输入确认密码'
            }
          });
          return false;
        } else if (password !== value) {
          this.setState({
            validateConfirm: {
              validateStatus: 'error',
              help: '两次输入密码不一致'
            }
          });
          return false;
        } else {
          this.setState({
            validateConfirm: {
              validateStatus: 'success',
              help: ''
            }
          });
          return true;
        }
      }

      case 'all': {
        const { email, verify, password, confirm } = this.state;
        const validate = this.validate;
        let v = validate('email')(email);
        v = validate('verify')(verify) && v;
        v = validate('password')(password) && v;
        v = validate('confirm')(confirm) && v;

        return v;
      }

      default:
        break;
    }

    return false;
  }



  render() {
    const { validatePassword, validateEmail, validateConfirm, validateVerify,
      email, verify: verifyCode, password, confirm, verifyDisabled, verifyMessage }
      = this.state;

    return (
      <div className={publicStyles['container']}>
        <div className={publicStyles['content_small']}>
          <h2 className={styles['register_title']}>欢迎注册VulOj</h2>

          <Form
            name="register"
            onFinish={this.handleFinish}
            autoComplete="off"
            initialValues={{
              email: email,
              captcha: verifyCode,
              password: password,
              confirm: confirm,
              agreement: false
            }}
          >
            <Form.Item
              name="email"
              {...validateEmail}
            >
              <Input
                size="large"
                prefix={<UserOutlined />}
                placeholder="输入你的邮箱地址"
                onChange={this.handleChange('email')}
              />
            </Form.Item>

            <Form.Item style={{ marginBottom: 0 }}>
              <Row gutter={8} >
                <Col span={16}>
                  <Form.Item
                    name="captcha"
                    {...validateVerify}
                  >
                    <Input
                      size='large'
                      prefix={<MailOutlined />}
                      placeholder='邮箱验证码'
                      onChange={this.handleChange('verify')}
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
            >
              <Input.Password
                size="large"
                prefix={<LockOutlined />}
                type="password"
                placeholder="输入你的密码"
                onChange={this.handleChange('password')}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
              />
            </Form.Item>

            <Form.Item
              name="confirm"
              {...validateConfirm}
            >
              <Input.Password
                size="large"
                prefix={<LockOutlined />}
                type="password"
                placeholder="确认你的密码"
                onChange={this.handleChange('confirm')}
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

export default withRouter(Register);