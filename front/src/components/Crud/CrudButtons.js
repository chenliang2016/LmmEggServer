/* global document */
import React, { Component } from 'react'
import { Button, Row, Col, Input } from 'antd'

class Buttons extends Component {

  render() {
    const { buttons,title } = this.props
    return (
      <Row gutter={24} style={{marginTop:10}}>
        <Col
          style={{
            marginBottom:16,
          }}
        >
            {title != undefined ?
            <Row type="flex" align="middle" justify="space-between" >
                <div style={{fontSize:20}}>{title}</div>
                {buttons.map(item => {
                    if (item.name != undefined){
                        return (<Button  style={{backgroundColor:item.color,marginRight:10}} onClick = {(e) => item.onClick()} {...item.buttonProps} >{item.name}</Button>)
                    }
                    return (<Button  style={{backgroundColor:item.color,marginRight:10}} onClick = {(e) => item.onClick()} {...item.buttonProps} />)
                })}
            </Row>
           : 
           <Row type="flex" align="middle" justify="space-between" >
            <div>
              {buttons.map(item => {
                  if (item.name != undefined){
                    return (<Button  style={{backgroundColor:item.color,marginRight:10}} onClick = {(e) => item.onClick()} {...item.buttonProps} >{item.name}</Button>)
                  }
                  return (<Button  style={{backgroundColor:item.color,marginRight:10}} onClick = {(e) => item.onClick()} {...item.buttonProps} />)
              })}
            </div> 
          </Row>
           }
          
        </Col>
      </Row>
    )
  }
}

export default Buttons
