import React, { Component } from 'react'
import { Upload, message, Button, Icon } from 'antd';

export default class UploadFile extends Component {

//   static getDerivedStateFromProps(nextProps){
//     // Should be a controlled component.
//     if ('value' in nextProps) {
//       let newFileList = nextProps.value.map((item,i) => {
//         return {
//           uid:-i,
//           name:item.name,
//           status: 'done',
//           url: item.url,
//         }
//       })
//       return {
//         ...(nextProps.value || {}),
//         fileList:newFileList,
//       };
//     }
//     return null;
//   }

    constructor(props) {
      super(props);

      const value = props.value || {};
      this.state = {
        fileList:this.convertValueToFileList(value),
      };
    }

    convertValueToFileList = (value) => {
      return value.map((item,i) => {
        return {
          uid:-i,
          name:item.name,
          status: 'done',
          url: item.url,
        }
      })
    }

    convertFileListToValue = (fileList) => {
      return fileList.map((item,i) => {
        return {
          name:item.name,
          url: item.url,
        }
      })
    }    

    triggerChange = changedValue => {
      // Should provide an event to pass value to Form.
      const { onChange } = this.props;
    //   if (onChange) {
          console.log("转化的value")
          console.log(this.convertFileListToValue(changedValue))
          onChange(this.convertFileListToValue(changedValue));
    //   }
    };

    onUploadSuccess = (info) => {
        let newFileList = info.fileList
            .filter(item => {
              return item.status == "done" || item.status == "uploading"
            })
            .map(item => {
              if (item.response != undefined){
                let url = "";
                if (item.response.status == "success"){
                  url = item.response.url;
                }
                  let newItem = {
                    uid:item.uid,
                    name:item.name,
                    url:url,
                    status:'done'
                  }
                  return newItem;
              }else{
                return item;
              }
            })
          console.log("新的newFileList",newFileList)
            // 独立的文件
          if (this.props.single != undefined){
            let singleFileList = [];
            singleFileList = newFileList.filter(item => {
              return item.uid == info.file.uid
            })
            console.log(singleFileList)
            this.triggerChange(singleFileList);
            return;
          }

          this.triggerChange(newFileList);
    }

    updateFileList = (info) => {
        if (this.props.single != undefined){
            let singleFileList = [];
            singleFileList = info.fileList.filter(item => {
              return item.uid == info.file.uid
            })
            console.log(singleFileList)
            this.setState({fileList:singleFileList})
        }else {
            this.setState({fileList:info.fileList})
        }
    }

    get uploadProps() {

        let value = this.props.value;
        console.log("图片的值",value);
        let fileList = this.convertValueToFileList(value)

       return {
        name: 'file',
        listType: this.props.listType,
        fileList: this.state.fileList,
        action: this.props.action,
        headers: {
          authorization: 'authorization-text',
        },
        onChange : (info) => {
          console.log("onChange",info)
        //   this.updateFileList(info)
          let fileList = []
          if (info.file.status === 'uploading') {
            fileList = info.fileList;
            this.triggerChange(info.fileList);
          }
          if (info.file.status === 'done') {
            let fileResponse = info.file.response
            if (fileResponse.status == "success"){
                fileList = info.fileList
                message.success(`${info.file.name} 上传成功`);
                this.onUploadSuccess(info)
            }else if (fileResponse.status == "fail"){
                message.error(fileResponse.msg);
                fileList = []
            }
          } 
          this.setState({fileList:fileList})
        },
      }
    }

      render() {
        return <Upload {...this.uploadProps}>
          <Button>
            <Icon type="upload" /> 上传文件
          </Button>
        </Upload>
      }

}