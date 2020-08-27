import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';


class Node extends Component {
  static propTypes = {

  };

   handleSubmit = e => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          this.props.submitNode(values);
        }
      });
    };

  render() {
      const { getFieldDecorator } = this.props.form;
    return (
      <div className="generate-node">
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item label="表名">
          {getFieldDecorator('table', {
            rules: [{ required: true, message: '请输入数据库表名!' }],
          })(
            <Input
              placeholder="请输入数据库表名（eg: cc_user）"
            />,
          )}
        </Form.Item>
        <Form.Item label="类名">
          {getFieldDecorator('class_name', {
            rules: [{ required: true, message: '请输入类名(User)!' }],
          })(
            <Input
              placeholder="请输入类名(User)"
            />,
          )}
        </Form.Item>
        <Form.Item label="包名">
          {getFieldDecorator('package', {
            rules: [{ required: true, message: '请输入包名(com.lmm)!' }],
          })(
            <Input
              placeholder="请输入包名(com.lmm)"
            />,
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            生成
          </Button>
        </Form.Item>
        {this.props.downloadUrl != "" ? 
        <a href={this.props.downloadUrl}  >下载</a>
          :null        
        }
      </Form>
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'node_form' })(Node);

export default WrappedNormalLoginForm;