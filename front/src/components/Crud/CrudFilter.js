/* global document */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Form, Button, Row, Col, DatePicker, Input, Cascader } from 'antd'
import { FormBuilder } from '../../components'

class Filter extends Component {

  handleSubmit = () => {
    const { onFilterChange, form } = this.props
    const { getFieldsValue } = form
    let fields = getFieldsValue()
    onFilterChange(fields)
  }

  handleReset = () => {
    const { form } = this.props
    const { getFieldsValue, setFieldsValue } = form

    const fields = getFieldsValue()
    for (let item in fields) {
      if ({}.hasOwnProperty.call(fields, item)) {
        if (fields[item] instanceof Array) {
          fields[item] = []
        } else {
          fields[item] = undefined
        }
      }
    }
    setFieldsValue(fields)
    this.handleSubmit()
  }
  handleChange = (key, values) => {
    const { form, onFilterChange } = this.props
    const { getFieldsValue } = form

    let fields = getFieldsValue()
    fields[key] = values
    fields = this.handleFields(fields)
    onFilterChange(fields)
  }

  renderElements = (element) => {
    const { form } = this.props
    const { getFieldDecorator } = form
      return  <Form.Item>
        {getFieldDecorator(
          element.id || element.key,
        )(
          <element.widget {...element.widgetProps}>
            {element.children || null}
          </element.widget>
        )}
    </Form.Item>
  }

  render() {
    const {searchElements } = this.props

    return (
        <Form layout="inline" onSubmit={this.handleSubmit}>
            {searchElements != undefined?
            <div>
             {searchElements.map(this.renderElements)}
             <Form.Item>
               <Button
                 type="default"
                 className="margin-right"
                 icon="search"
                 style={{backgroundColor:"#16c75f",color:"white"}}
                 onClick={this.handleSubmit}
               >
                 搜索
               </Button>
               <Button  
               type="default"
               style={{backgroundColor:"#feb21a",color:"white"}}
               icon="redo"  
               onClick={this.handleReset}>
                 重置
               </Button>
           </Form.Item>
           </div>
            : null}
           
      </Form>
    )
  }
}

Filter.propTypes = {
  onAdd: PropTypes.func,
  form: PropTypes.object,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
}

const WrappedAgentFilter = Form.create({ name: 'crud_Filter' })(Filter);

export default WrappedAgentFilter
