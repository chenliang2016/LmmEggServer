/* global document */
import React, { Component } from 'react'
import { Button, Row, Col, Upload, message, Icon } from 'antd'
class Buttons extends Component {

    constructor(props) {
        super(props);
  
        this.state = {
          fileList:[],
        };
      }
  
      get uploadProps() {
         return {
          name: 'file',
          listType: this.props.listType,
          fileList: this.state.fileList,
          action: this.props.action,
          headers: {
            authorization: 'authorization-text',
          },
          previewFile(file) {
            console.log('Your upload file:', file);
            // Your process logic. Here we just mock to the same file
            return null;
          },
          onChange : (info) => {
            console.log("onChange",info)
          //   this.updateFileList(info)
            let fileList = []
            this.setState({fileList:info.fileList})
            if (info.file.status === 'uploading') {
              fileList = info.fileList;
            //   this.triggerChange(info.fileList);
            }
            if (info.file.status === 'done') {
              let fileResponse = info.file.response
              if (fileResponse.status == "success"){
                //   fileList = info.fileList
                  message.success(`${info.file.name} 上传成功`);
                  this.setState({fileList:[]})
                  this.props.onUploadSuccess(info)
              }else if (fileResponse.status == "fail"){
                  message.error(fileResponse.msg);
                  this.setState({fileList:[]})
              }
            } 
          },
        }
      }

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
            <Row type="flex" align="middle" justify={justify} >
               <Upload {...this.uploadProps}>
                    <Button type="primary">
                        <Icon type="upload" /> 上传文件
                    </Button>
                </Upload>
            </Row>
        </Col>
      </Row>
    )
  }
}

export default Buttons
