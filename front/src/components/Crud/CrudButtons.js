/* global document */
import React, { Component } from 'react'
import { Button, Row, Col, Input } from 'antd'

const ColProps = {
  xs: 24,
  sm: 12,
  style: {
    marginBottom: 16,
  },
}

const TwoColProps = {
  ...ColProps,
  xl: 96,
}

class Buttons extends Component {

  render() {
    const { buttons } = this.props
    return (
      <Row gutter={24} style={{marginTop:10}}>
        <Col
          {...TwoColProps}
          xl={{ span: 16 }}
          md={{ span: 24 }}
          sm={{ span: 24 }}
        >
          <Row type="flex" align="middle" justify="space-between" >
            <div>
              {buttons.map(item => {
                  if (item.name != undefined){
                    return (<Button  style={{backgroundColor:item.color,marginRight:10}} onClick = {(e) => item.onClick()} {...item.buttonProps} >{item.name}</Button>)
                  }
                  return (<Button  style={{backgroundColor:item.color,marginRight:10}} onClick = {(e) => item.onClick()} {...item.buttonProps} />)
              })}
            </div> 
            {/* <div>
                <ButtonGroup>
                    <Button icon="search"></Button>
                    <Button icon="redo"></Button>
                </ButtonGroup>
            </div> */}
          </Row>
        </Col>
      </Row>
    )
  }
}

export default Buttons
