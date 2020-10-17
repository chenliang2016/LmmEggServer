import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { Input } from 'antd'
import md5 from 'md5'
import { Page,Crud } from '../../components'

const {CrudTable,CrudForm,CrudFilter} = Crud

export class AdminPage extends Component {
  static propTypes = {
    admin: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentDidMount(){
     const { adminPage,currentAdmin} = this.props.admin;
     this.fetchList( adminPage);
  }

  fetchList = (page,name) => {
    const {getAdminList} = this.props.actions;
    getAdminList(page);
  }

  getDataSource() {
    const { admin } = this.props;
    const { adminById, adminList } = admin;
    if (!adminList) return [];
    return adminList.map(id => adminById[id]);
  }

  get listProps() {
    const { admin,actions } = this.props
    const { getAdminListPending,adminTotal,adminPage } = admin
    const { deleteAdmin,chooseCurrentAdmin,adminModalChange } = actions;

    return {
      dataSource: this.getDataSource(),
      loading: getAdminListPending,
      columns:[
        {
          title: "登录名",
          dataIndex: 'loginId',
          key: 'loginId',
          width: 180,
        },
        {
          title: "账户名",
          dataIndex: 'name',
          key: 'name',
          width: 180,
        },
        {
          title: "密码",
          dataIndex: 'password',
          key: 'password',
          width: 180,
        },
      ],
      pagination:{
        total:adminTotal,
        current:adminPage,
        onChange : (page) => {
          this.fetchList(page);
        }
      },
      op:[
        {
          key:1,
          name:'编辑'
        },
        {
          key:3,
          name:'删除',
          needConfirm:true,
          confirmTitle:"确认删除"
        }
      ],
      handleMenuClick: (record,item) => {
        if (item.key == 1){
          chooseCurrentAdmin(record);
          adminModalChange(true,"updata");
        }else if(item.key == 3){
            deleteAdmin(record.id).then((data) => {
            this.fetchList(adminPage);
          })
        }
      }
    }
  } 

  get modalProps() {
    const { admin,actions } = this.props
    const { currentAdmin, adminModalVisible,adminPage, adminModalType,submitAdminPending } = admin

    const { adminModalChange,submitAdmin } = actions;
    const editItem  = adminModalType === 'create' ? {} : currentAdmin
    return {
      item: adminModalType === 'create' ? {} : currentAdmin,
      visible: adminModalVisible,
      destroyOnClose: true,
      maskClosable: false,
      confirmLoading: submitAdminPending,
      title: `${
        adminModalType === 'create' ? `创建` : `更新`
      }`,
      centered: true,
      elements: [
        {
          key: "loginId",
          label: "登录名",
          initialValue: editItem.loginId,
          widget: Input,
          required: true
        },
        {
          key: "name",
          label: "账户名",
          initialValue: editItem.name,
          widget: Input,
          required: true
        },
        {
          key: "password",
          label: "密码",
          // initialValue: editItem.password,
          widget: Input,
          required: true
        },
      ],
      onOk: data => {
        let password = md5(data.password);
        submitAdmin(Object.assign({},data,{password})).then(data=> {
          adminModalChange(false,"create");
          this.fetchList(adminPage);
        })
      },
      onCancel() {
        adminModalChange(false,"create");
      },
    }
  }

  get filterProps() {
    const { location,actions,admin } = this.props
    const { query } = location
    const { currentAdmin,adminPage} = admin
    const { adminModalChange } = actions;

    return {
      filter: {
        ...query,
      },
      title:"",
      onFilterChange: value => {
         this.fetchList(adminPage,value.name)
      },
      onAdd() {
        adminModalChange(true,'create')
      },
    }
  }

  render() {
    return (
      <Page inner>
        <CrudFilter {...this.filterProps} />
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
)(AdminPage);