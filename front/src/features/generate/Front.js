// package = j['package']
//     feature = j['feature']
//     modal = j['modal']
//     deleteUrl = j['deleteUrl']
//     listUrl = j['listUrl']
//     addUrl = j['addUrl']
//     updateUrl = j['addUrl']

import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';

class Front extends Component {
  static propTypes = {

  };

   handleSubmit = e => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          this.props.submitFront(values);
        }
      });
    };

  render() {
      const { getFieldDecorator } = this.props.form;
    return (
      <div className="generate-node">
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item label="功能">
          {getFieldDecorator('feature', {
            rules: [{ required: true, message: '请输入功能!' }],
          })(
            <Input
              placeholder="请输入功能（eg: OPEN）"
            />,
          )}
        </Form.Item>
        <Form.Item label="实体">
          {getFieldDecorator('modal', {
            rules: [{ required: true, message: '请输入实体!' }],
          })(
            <Input
              placeholder="请输入实体(open)"
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
        <Form.Item label="删除接口">
          {getFieldDecorator('deleteUrl', {
            rules: [{ required: true, message: '请输入删除接口!' }],
          })(
            <Input
              placeholder="请输入删除接口"
            />,
          )}
        </Form.Item>
        <Form.Item label="新增接口">
          {getFieldDecorator('addUrl', {
            rules: [{ required: true, message: '请输入新增接口!' }],
          })(
            <Input
              placeholder="请输入新增接口"
            />,
          )}
        </Form.Item>
        <Form.Item label="更新接口">
          {getFieldDecorator('updateUrl', {
            rules: [{ required: true, message: '请输入更新接口!' }],
          })(
            <Input
              placeholder="请输入更新接口"
            />,
          )}
        </Form.Item>
        <Form.Item label="列表接口">
          {getFieldDecorator('listUrl', {
            rules: [{ required: true, message: '请输入列表接口!' }],
          })(
            <Input
              placeholder="请输入列表接口"
            />,
          )}
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            生成
          </Button>
        </Form.Item>
        {this.props.downloadUrl != "" ? 
        <a href={this.props.downloadUrl} >下载</a>
          :null        
        }
      </Form>
      </div>
    );
  }
}

const WrappedNormalFrontForm = Form.create({ name: 'front_form' })(Front);

export default WrappedNormalFrontForm;