import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal, Cascader,Button } from 'antd'
import { FormBuilder } from '../../components'
import { Page } from '../../components'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}


class AddList extends Component {
  static propTypes = {

  };

  handleOk = () => {
    const { item = {}, form } = this.props
    const { validateFields, getFieldsValue } = form

    validateFields(errors => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
      }

      console.log(data)

    })
  }

  render() {
    const { item = {}, onOk, form, ...modalProps } = this.props

    const formMeta = {
      colon: true,
      columns: 1,
      formItemLayout: formItemLayout,
      elements: [
        {
          key: "filename",
          label: "文件名",
          widget: Input,
          required: true
        },
        
      ]
    };

    return (
      <page inner >
      <div className="home-add-list-page">
       <Form layout="horizontal">
          <FormBuilder meta={formMeta} form={form} />
        </Form>
        <Button type="primary" onClick={this.handleOk}>添加</Button>
        </div>
       </page> 
    );
  }
}

const AddListPage = Form.create({ name: 'add_list' })(AddList);

export default AddListPage;
