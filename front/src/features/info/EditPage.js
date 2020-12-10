import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

import { Page, LmmEdit, Upload as LmmUpload} from '../../components'
import { Form, Input, message as AntMessage, Modal, Icon, Upload, Button, Select, Tag, Message, Radio } from 'antd'
import BraftEditor from 'braft-editor'

const FormItem = Form.Item;
const Option = Select.Option;
const {UploadQiniu} = LmmUpload;

const formItemLayout = {
  labelCol: {
    xs: { span: 12 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 12 },
    sm: { span: 8 },
  },
};

let id

export class EditPage extends Component {
  static propTypes = {
    info: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  componentDidMount() {
    const { getAllCategory, getQiniuToken } = this.props.actions;
    const { currentInfo } = this.props.info;
    getAllCategory();
  }

  getCategory = () => {
    const { allinfoCategoryList, allinfoCategoryById } = this.props.info;
    return allinfoCategoryList !== undefined ? allinfoCategoryList.map(id => allinfoCategoryById[id]).map(item => (
      <Option key={item.id} value={item.id}>{item.categoryName}</Option>
    )) : null
  }

  handleSubmit = () => {
    const { item = {}, info, form } = this.props
    const { validateFields, getFieldsValue } = form
    const {currentInfo} = info;
    const {submitInfo} = this.props.actions

    validateFields(errors => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        id: currentInfo.id,
      }
      console.log(data);

      let tempImg = ""
      data.img.map(item => {
        tempImg = item.url;
      })
      
      submitInfo(Object.assign({},data,{img:tempImg})).then(res => {
        AntMessage.success("添加成功")
      })

    })
  }


  render() {
    let { onOk, form, info } = this.props
    const { getFieldDecorator } = form;
    const { currentInfo,qntoken } = info;

    const { content, logo, previewVisible, previewImage, cropVisible, cropSrc } = this.state

    let id = -1;
    let img = []
    if (currentInfo !== undefined) {
      id = currentInfo.id;
      if (currentInfo.img != undefined){
        console.log(currentInfo.img.split("/").indexOf(currentInfo.img.split("/").length-1))
        img = [
          {
            name:currentInfo.img.split("/")[currentInfo.img.split("/").length-1],
            url:currentInfo.img
          }
        ]
      }
    }

    // let text = BraftEditor.createEditorState(conttext)

    const options = [
      { label: '是', value: 1 },
      { label: '不是', value: 0 },
    ];
    const contentoptions = [
        { label: 'url', value: 1 },
        { label: 'html', value: 2 },
    ];

    const qndata = {
      token: qntoken
    }
    return (
        <Page inner>
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>

          <FormItem label="信息类别">
            {getFieldDecorator('categoryId', {
              initialValue: id > 0 ? currentInfo.categoryId : "",
              rules: [
                {
                  required: true,
                  message: '信息名称不能为空!',
                },
              ],
            })(<Select
              placeholder="选择类别"
              allowClear
            >
              {this.getCategory()}
            </Select>)}
          </FormItem>

          <FormItem label="信息名称">
            {getFieldDecorator('title', {
              initialValue: id > 0 ? currentInfo.title : "",
              rules: [
                {
                  required: true,
                  message: '信息名称不能为空!',
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label="信息简述">
            {getFieldDecorator('shortDes', {
              initialValue: id > 0 ? currentInfo.shortDes : "",
              rules: [
                {
                  required: true,
                  message: '信息简述不能为空!',
                },
              ],
            })(<Input />)}
          </FormItem>

          <FormItem label="是否首页轮播">
            {getFieldDecorator('isFouce', {
              initialValue: id > 0 ? currentInfo.isFouce : 0,
              rules: [
                {
                  required: true,
                  message: '选择是否是首页轮播!',
                },
              ],
            })(<Radio.Group options={options} />)}
          </FormItem>

          <FormItem label="封面图">
          {getFieldDecorator('img', {
              initialValue: id > 0 ? img : [],
              onChange: (info) => {
                console.log("封面图",info)
              },
              rules: [
                {
                  required: true,
                  message: '添加图片!',
                },
              ],
            })(
                <UploadQiniu 
                isSingle={true}
                listType="picture" 
                tokenUrl="/api/b/file/qiniuToken" />
            )}
          </FormItem>

          <FormItem label="内容类型">
            {getFieldDecorator('contentType', {
              initialValue: id > 0 ? currentInfo.contentType : 0,
              rules: [
                {
                  required: true,
                  message: '选择内容类型!',
                },
              ],
            })(<Radio.Group options={contentoptions} />)}
          </FormItem>

          <FormItem label="跳转地址">
            {getFieldDecorator('url', {
              initialValue: id > 0 ? currentInfo.url : "",
            })(<Input />)}
          </FormItem>

          <FormItem label="信息内容">
          {getFieldDecorator('content', {
              initialValue: id > 0 ? currentInfo.content : "",
            })(
                <LmmEdit 
                tokenUrl="/api/b/file/qiniuToken" 
                style={{ width: 800 }} />
            )}
          </FormItem>

          <div>
            <Button
              type="primary"
              onClick={this.handleSubmit}
            >
              提交
          </Button>
          </div>
        </Form>
      </Page>
    );
  }

}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    info: state.info,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

const WrapperModal = Form.create({ name: 'info_edit' })(EditPage);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrapperModal);
