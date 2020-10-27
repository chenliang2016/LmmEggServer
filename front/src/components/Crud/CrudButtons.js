/* global document */
import React, { Component } from 'react'
import { Button, Row, Col, Input } from 'antd'

class Buttons extends Component {

  render() {
    const { buttons,title,floatRight } = this.props
    let justify = "space-between"
    if (floatRight != undefined && floatRight == true){
        justify = "end"
    }
    return (
      <Row gutter={24} align="middle" style={{
            marginBottom:10
        }}>
        <Col>
            {title != undefined ?
            <Row type="flex" align="middle" justify={justify} >
                <div style={{fontSize:20}}>{title}</div>
                {buttons.map(item => {
                    if (item.name != undefined){
                        return (<Button  style={{backgroundColor:item.color,marginRight:10}} onClick = {(e) => item.onClick()} {...item.buttonProps} >{item.name}</Button>)
                    }
                    return (<Button  style={{backgroundColor:item.color,marginRight:10}} onClick = {(e) => item.onClick()} {...item.buttonProps} />)
                })}
            </Row>
           : 
           <Row type="flex" style={{
                height:40,
            }} align="middle" justify={justify} >
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
