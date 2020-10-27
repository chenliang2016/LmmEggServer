import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table, Modal, Avatar,Divider,Button } from 'antd'
import moment from 'moment';

const { confirm } = Modal

class List extends PureComponent {

  handleMenuClick = (record, item) => {
    const {handleMenuClick} = this.props
    if (item.needConfirm != undefined){
      if (item.needConfirm){
        confirm({
          title: item.confirmTitle,
          onOk() {
            handleMenuClick(record,item)
          },
        })
      }else{
         handleMenuClick(record,item)
      }
    }else{
      handleMenuClick(record,item);
    }
  }

  render() {
    const {handleMenuClick,columns,op , ...tableProps} = this.props

    let cs = columns;

    if (op != undefined && op.length > 0){
      cs.push({
          title: '操作',
          key: 'action',
          width: 180,
          render: (text, record) => {
            return  <span>
             {op.map( (item,i) => {
                 if (i != op.length -1){
                     if (item.buttonProps != undefined){
                         return <span> <Button  style={{width:50,backgroundColor:item.color}} onClick = {(e) => this.handleMenuClick(record,item)} {...item.buttonProps} /> </span>
                     }else {
                        return (<span><a onClick = {(e) => this.handleMenuClick(record,item)}>{item.name}</a> <Divider type="vertical" /></span>)
                     }
                 }else{
                    if (item.buttonProps != undefined){
                        return <span> <Button  style={{width:50,backgroundColor:item.color}} onClick = {(e) => this.handleMenuClick(record,item)} {...item.buttonProps} /> </span>
                    }else {
                        return (<span> <a onClick = {(e) => this.handleMenuClick(record,item)}>{item.name}</a> </span>)
                    }
                   
                 }
              })}
            </span>
          },
      })
    }

    let p = {
        ...tableProps.pagination,
        showTotal: total => `共 ${total} 项`,
    }

    if (!tableProps.pagination){
        p = false
    }

    return (
      <Table
        {...tableProps}
        pagination={p}
        columns={cs}
        simple
        size="middle"
        rowKey={record => record.id}
      />
    )
  }
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  location: PropTypes.object,
}

export default List