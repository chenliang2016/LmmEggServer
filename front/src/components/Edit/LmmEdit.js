import React, { Component } from 'react';
// 引入编辑器组件
import BraftEditor from 'braft-editor'
// 引入编辑器样式
import 'braft-editor/dist/index.css'
let qiniuTokenUrl = ''
let keyUrl = ''
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

function fileSize(str) {
  var fileSize;
  if (str.indexOf('=') > 0) {
    var indexOf = str.indexOf('=');
    str = str.substring(0, indexOf);//把末尾的’=‘号去掉
  }
  fileSize = parseInt(str.length - (str.length / 8) * 2);
  return fileSize;
}

const myUploadFn = async file => {

  file.preview = await getBase64(file.file);
  let pic = file.preview.replace(/data:image\/.*;base64,/, '')
  let picUrl
  var url = "http://upload-z2.qiniup.com/putb64/" + fileSize(pic);
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      var keyText = JSON.parse(xhr.responseText);
      picUrl = keyUrl + keyText.key;
      file.success({ url: picUrl })
    }
  }
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/octet-stream");
  xhr.setRequestHeader("Authorization", 'UpToken ' + qiniuTokenUrl);
  xhr.send(pic);
}

class LmmEdit extends React.Component {


  triggerChange = changedValue => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(changedValue.toHTML());
    }
  };

  render() {
    const { value,style, qiniuToken, url } = this.props;
    if (qiniuToken) qiniuTokenUrl = qiniuToken
    if (url) keyUrl = url

    let initValue = value;

    if (value != undefined){
      initValue = BraftEditor.createEditorState(value);
    }

    return (
      <div style={style}>
        <BraftEditor
          media={{ uploadFn: myUploadFn }}
          value={value}
          defaultValue={initValue}
          onChange={this.triggerChange}
        />
      </div>
    );
  }

};
export default LmmEdit