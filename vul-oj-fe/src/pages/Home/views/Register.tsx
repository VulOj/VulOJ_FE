import React from 'react'

import styles from '../styles/Register.module.scss';
import publicStyles from 'src/commons/styles/public.module.scss';
import { Button, Checkbox, Col, Form, Input, Row } from 'antd';
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { checkEmail } from 'src/commons/utils/utils';
import { IFormValidate } from 'src/commons/interface';

interface IRegisterProp {

}

interface IRegisterState {
  validatePassword: IFormValidate
}

class Register extends React.Component<IRegisterProp, IRegisterState> {
  isFirstSubmit = true;

  constructor(props: IRegisterProp) {
    super(props);

    this.state = {
      validatePassword: {
        validateStatus: 'validating',
        help: ''
      }
    }
  }

  handleFinish = (form: any) => {
    this.isFirstSubmit = false;
  }

  handleFocus = () => {

  }

  handleBlur = () => {

  }

  validate = (name: string) => (_: any, value: any) => {
    if (this.isFirstSubmit) {
      return Promise.resolve();
    }

    if (value === undefined || value === '' || value === null) {
      return Promise.reject(new Error('必填'));
    }

    switch (name) {
      case 'email': {
        if (!checkEmail(value))
          return Promise.reject(new Error('邮箱格式不正确'));
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
          <h2 className={styles['register_title']}>欢迎注册VulOj</h2>

          <Form
            name="register"
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
                placeholder="输入你的邮箱地址"
              />
            </Form.Item>

            <Form.Item>
              <Row gutter={8}>
                <Col span={16}>
                  <Form.Item
                    name="captcha"
                    noStyle
                    rules={[{ required: true, message: '请输入验证码' }]}
                  >
                    <Input
                      size='large'
                      prefix={<MailOutlined />}
                      placeholder='邮箱验证码'
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Button
                    size='large'
                    style={{ width: '100%' }}
                  >发送邮件</Button>
                </Col>
              </Row>
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
                placeholder="输入你的密码"
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
              />
            </Form.Item>

            <Form.Item
              name="confirm"
              {...validatePassword}
              rules={[{ validator: this.validate('password') }]}
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