import React from 'react'

import styles from '../styles/Register.module.scss';
import publicStyles from 'src/commons/styles/public.module.scss';
import { Button, Form, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { checkEmail } from 'src/commons/utils/utils';

interface IRegisterProp {

}

interface IRegisterState {

}

class Register extends React.Component<IRegisterProp, IRegisterState> {
  isFirstSubmit = true;

  handleFinish = (form: any) => {
    this.isFirstSubmit = false;
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
                placeholder="请输入注册邮箱"
              />
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