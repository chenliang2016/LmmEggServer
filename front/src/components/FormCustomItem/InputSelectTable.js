import React, { Component } from 'react';
import { Input,Button,Modal } from 'antd'
// import ProjectzhaobiaoPage from './ProjectzhaobiaoPage'
export default class InputSelectTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible:false,
        }
    }
    
    handleClick = () => {
        console.log("点击")
        this.setState(
            {visible:!this.state.visible}
        )
    }

    handleOk = () => {
        const { onChange, onChooseItem , convertValue,form } = this.props;
        
        this.setState(
            {visible:!this.state.visible}
        )

        if (onChange) {
            onChange(convertValue(this.chooseRecord));
        }

        if (onChooseItem) {
            onChooseItem(this.chooseRecord,form);
        }
    }

    handleCancle = () => {
        this.setState(
            {visible:!this.state.visible}
        )
    }
  
    render() {
        const chooseProps = {
            visible:this.state.visible,
            destroyOnClose: true,
            maskClosable: false,
            onOk: this.handleOk,
            onCancel:this.handleCancle,
            width:1000
        }

        const rowSelection = {
            onChange:(keys,record) => {
                console.log(record)
                this.chooseRecord = record;
            },
            type:"radio"
        }

        const { value,PageWidget } = this.props;

        return (
        <div className="project-choose-zhaobiao">
            <span>
            <Input
                value = {value}
                style={{ width: '65%', marginRight: '3%' }}
            />
            <Button
                style={{ width: '32%', }}
                onClick={this.handleClick}
            >选择</Button>
            </span>
            <Modal {...chooseProps}>
                <PageWidget tableRowSelection = {rowSelection}/>
            </Modal>
        </div>
        );
  }
}
