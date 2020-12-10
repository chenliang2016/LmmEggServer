import React, { Component } from 'react';
// 引入编辑器组件
import BraftEditor from 'braft-editor'
// 引入编辑器样式
import 'braft-editor/dist/index.css'

import * as qiniu from 'qiniu-js'
import request from '../../utils/request'
import { message, } from 'antd';

const prexUrl = "https://image.zhelut.com/"

class LmmEdit extends React.Component {

    myUploadFn = async file => {
        let config = {
            useCdnDomain: true,
            region: qiniu.region.z2
          };
          
          let key = file.file.name
        
          let putExtra = {
            fname: key,
            params: {},
            mimeType: null
          };
        
          request({
              method:'post',
              url:this.props.tokenUrl,
            }).then(data => {
              var observable = qiniu.upload(file.file, key, data, putExtra, config)
              var observer = {
                next(res){
                  console.log("qiniu-next")
                  console.log(res)
                },
                error(err){
                  console.log("qiniu-err")
                  console.log(err)
                  message.error(`${file.file.name} 上传失败`);
                }, 
                complete(res){
                  console.log("qiniu-complete")
                  message.success(`${file.file.name} 上传成功`);
        
              
                  file.success({ url: prexUrl + key })
                }
              }
              var subscription = observable.subscribe(observer) // 上传开始
            })
        
        }

  triggerChange = changedValue => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(changedValue.toHTML());
    }
  };

  render() {
    const { value,style } = this.props;

    let initValue = value;

    if (value != undefined){
      initValue = BraftEditor.createEditorState(value);
    }

    return (
      <div style={style}>
        <BraftEditor
          media={{ uploadFn: this.myUploadFn }}
          value={value}
          defaultValue={initValue}
          onChange={this.triggerChange}
        />
      </div>
    );
  }

};
export default LmmEdit