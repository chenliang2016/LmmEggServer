import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

import { Input } from 'antd'

import { Page,Crud, Upload} from '../../components'
import FileUploadButton from './FileUploadButton'
const {UploadFile} = Upload

const {CrudTable,CrudForm,CrudFilter,CrudButtons} = Crud

export class AfilePage extends Component {
  static propTypes = {
    file: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentDidMount(){
     const { afilePage,currentAfile} = this.props.file;
     this.fetchList( afilePage);
  }

  fetchList = (page) => {
    const {getAfileList} = this.props.actions;
    let params = Object.assign({},{page:page},this.query)
    getAfileList(params);
  }

  getDataSource() {
    const { file } = this.props;
    const { afileById, afileList } = file;
    if (!afileList) return [];
    return afileList.map(id => afileById[id]);
  }

  get listProps() {
    const { file,actions } = this.props
    const { getAfileListPending,afileTotal,afilePage } = file
    const { deleteAfile,chooseCurrentAfile,afileModalChange } = actions;

    return {
      dataSource: this.getDataSource(),
      loading: getAfileListPending,
      columns:[
        {
          title: "文件名",
          dataIndex: 'fileName',
          key: 'fileName',
          width: 180,
        },
        {
            title: "地址",
            dataIndex: 'fileUrl',
            key: 'fileUrl',
            width: 180,
        },
        {
            title: "文件类型",
            dataIndex: 'fileType',
            key: 'fileType',
            width: 180,
        },
      ],
      pagination:{
        total:afileTotal,
        current:afilePage,
        onChange : (page) => {
          this.fetchList(page);
        }
      },
      op:[
       {
          key:1,
          name:'编辑',
          buttonProps:{
            icon:"edit",
            type:"primary"
          },
        },
        {
          key:3,
          name:'删除',
          buttonProps:{
            icon:"delete",
            type:"danger"
          },
          needConfirm:true,
          confirmTitle:"确认删除"
        }
      ],
      handleMenuClick: (record,item) => {
        if (item.key == 1){
          chooseCurrentAfile(record);
          afileModalChange(true,"updata");
        }else if(item.key == 3){
            deleteAfile(record.id).then((data) => {
            this.fetchList(afilePage);
          })
        }
      }
    }
  } 

  get modalProps() {
    const { file,actions } = this.props
    const { currentAfile, afileModalVisible,afilePage, afileModalType,submitAfilePending } = file

    const { afileModalChange,submitAfile } = actions;
    const editItem  = afileModalType === 'create' ? {} : currentAfile
    return {
      item: afileModalType === 'create' ? {} : currentAfile,
      visible: afileModalVisible,
      destroyOnClose: true,
      maskClosable: false,
      confirmLoading: submitAfilePending,
      title: `${
        afileModalType === 'create' ? `创建` : `更新`
      }`,
      centered: true,
      elements: [
        {
          key: "fileName",
          label: "文件名",
          initialValue: editItem.fileName,
          widget: Input,
          required: true
        },
        {
          key: "fileUrl",
          label: "上传文件",
          initialValue: [
            // {
            //   name:'0.png',
            //   url:'1111',
            // }
          ],
          widget: UploadFile,
          widgetProps: {
            action:'/api/b/file/upload',
            single: true,
            listType: 'file'
          },
        },
      ],
      onOk: data => {
        console.log(data);
        submitAfile(Object.assign({},data,{})).then(data=> {
          afileModalChange(false,"create");
          this.fetchList(afilePage);
        })
      },
      onCancel() {
        afileModalChange(false,"create");
      },
    }
  }

  get filterProps() {
    const { actions,file } = this.props
    const { currentAfile,afilePage} = file
    const { afileModalChange } = actions;

    return {
      title:"",
      searchElements: [
        {
            key: "fileName",
            widget: Input,
            widgetProps:{
                placeholder:"请输入文件名"
            },
        },
      ],
      onFilterChange: value => {
          this.query = value
         this.fetchList(afilePage)
      },
      onAdd() {
        afileModalChange(true,'create')
      },
    }
  }

  get buttonProps() {
    const { actions,file } = this.props
    const { currentAfile,afilePage} = file
    const { afileModalChange } = actions;

    return {
        buttons:[
            {
                name:"新增",
                buttonProps:{
                    type:"primary",
                    icon:"plus",
                },
                onClick:()=>{ afileModalChange(true,'create')}
            }
        ]
    }
  }

  get uploadButtonProps (){
      return {
        onUploadSuccess:() => {
            this.fetchList(1)
        },
        action:'/api/b/file/upload',
        single: true,
        listType: 'file'
      }
  }

  render() {
    return (
      <Page inner>
        <CrudFilter {...this.filterProps} />
        {/* <CrudButtons {...this.buttonProps} /> */}
        <FileUploadButton {...this.uploadButtonProps} />
        <CrudTable {...this.listProps} />
        <CrudForm {...this.modalProps} />
      </Page>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    file: state.file,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AfilePage);