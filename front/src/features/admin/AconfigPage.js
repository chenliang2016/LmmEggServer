import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

import { Input } from 'antd'

import { Page,Crud } from '../../components'

const {CrudTable,CrudForm,CrudFilter,CrudButtons} = Crud

export class AconfigPage extends Component {
  static propTypes = {
    admin: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentDidMount(){
     const { aconfigPage,currentAconfig} = this.props.admin;
     this.fetchList( aconfigPage);
  }

  fetchList = (page,values) => {
    const {getAconfigList} = this.props.actions;
    let params = Object.assign({},{page:page},values)
    getAconfigList(params);
  }

  getDataSource() {
    const { admin } = this.props;
    const { aconfigById, aconfigList } = admin;
    if (!aconfigList) return [];
    return aconfigList.map(id => aconfigById[id]);
  }

  get listProps() {
    const { admin,actions } = this.props
    const { getAconfigListPending,aconfigTotal,aconfigPage } = admin
    const { deleteAconfig,chooseCurrentAconfig,aconfigModalChange } = actions;

    return {
      dataSource: this.getDataSource(),
      loading: getAconfigListPending,
      columns:[
        {
          title: "配置Key",
          dataIndex: 'configKey',
          key: 'configKey',
          width: 180,
        },
        {
          title: "配置value",
          dataIndex: 'configValue',
          key: 'configValue',
          width: 180,
        },
      ],
      pagination:{
        total:aconfigTotal,
        current:aconfigPage,
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
          chooseCurrentAconfig(record);
          aconfigModalChange(true,"updata");
        }else if(item.key == 3){
            deleteAconfig(record.id).then((data) => {
            this.fetchList(aconfigPage);
          })
        }
      }
    }
  } 

  get modalProps() {
    const { admin,actions } = this.props
    const { currentAconfig, aconfigModalVisible,aconfigPage, aconfigModalType,submitAconfigPending } = admin

    const { aconfigModalChange,submitAconfig } = actions;
    const editItem  = aconfigModalType === 'create' ? {} : currentAconfig
    return {
      item: aconfigModalType === 'create' ? {} : currentAconfig,
      visible: aconfigModalVisible,
      destroyOnClose: true,
      maskClosable: false,
      confirmLoading: submitAconfigPending,
      title: `${
        aconfigModalType === 'create' ? `创建` : `更新`
      }`,
      centered: true,
      elements: [
        {
          key: "configKey",
          label: "配置key",
          initialValue: editItem.configKey,
          widget: Input,
          required: true
        },
        {
          key: "configValue",
          label: "配置value",
          initialValue: editItem.configValue,
          widget: Input,
          required: true
        },
      ],
      onOk: data => {
        submitAconfig(Object.assign({},data,{})).then(data=> {
          aconfigModalChange(false,"create");
          this.fetchList(aconfigPage);
        })
      },
      onCancel() {
        aconfigModalChange(false,"create");
      },
    }
  }

  get filterProps() {
    const { actions,admin } = this.props
    const { currentAconfig,aconfigPage} = admin
    const { aconfigModalChange } = actions;

    return {
      title:"",
      searchElements: [
        {
            key: "configKey",
            widget: Input,
            widgetProps:{
                placeholder:"请输入配置key"
            },
        },
      ],
      onFilterChange: value => {
         this.fetchList(aconfigPage,value)
      },
      onAdd() {
        aconfigModalChange(true,'create')
      },
    }
  }

  get buttonProps() {
    const { actions,admin } = this.props
    const { currentAconfig,aconfigPage} = admin
    const { aconfigModalChange } = actions;

    return {
        buttons:[
            {
                name:"新增",
                buttonProps:{
                    type:"primary",
                    icon:"plus",
                },
                onClick:()=>{ aconfigModalChange(true,'create')}
            }
        ]
    }
  }

  render() {
    return (
      <Page inner>
        <CrudFilter {...this.filterProps} />
        <CrudButtons {...this.buttonProps} />
        <CrudTable {...this.listProps} />
        <CrudForm {...this.modalProps} />
      </Page>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    admin: state.admin,
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
)(AconfigPage);