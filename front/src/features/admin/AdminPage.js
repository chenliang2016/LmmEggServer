import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import * as roleActions from '../role/redux/actions';
import { Input,TreeSelect,Row,Col,Tree,Select,message } from 'antd'
import md5 from 'md5'
import { Page,Crud } from '../../components'

const Option = Select.Option;
const {CrudTable,CrudForm,CrudFilter,CrudButtons} = Crud
const { Search } = Input

export class AdminPage extends Component {
  static propTypes = {
    admin: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentDidMount(){
     const { adminPage,currentAdmin} = this.props.admin;
     const {getAllDept} = this.props.actions;
     const {getAllRole} = this.props.roleActions;
     getAllRole();
     getAllDept().then(data => {
      this.fetchList( adminPage);
     })
  }

  fetchList = (page,values) => {
    const {getAdminList} = this.props.actions;
    let params = Object.assign({},{page:page},values)
    getAdminList(params);
  }

  getDataSource() {
    const { admin } = this.props;
    const { adminById, adminList } = admin;
    if (!adminList) return [];
    return adminList.map(id => adminById[id]);
  }

  get listProps() {
    const { admin,actions } = this.props
    const { getAdminListPending,adminTotal,adminPage,allDeptById } = admin
    const { deleteAdmin,chooseCurrentAdmin,adminModalChange,resetPassword } = actions;

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
          dataIndex: 'username',
          key: 'username',
          width: 180,
        },
        {
          title: "部门",
          dataIndex: 'deptId',
          key: 'deptId',
          width: 180,
          render: text => {
            if (text == 1){
              return <span></span>
            }else{
              let item = allDeptById[text];
              if (item != undefined){
                return  <span>{item.deptName}</span>
              }
            }
           
          },
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
          name:'编辑',
        //   color:"#ffffff",
        //   buttonProps:{
        //     icon:"edit",
        //     type:"primary"
        //   },
        },
        {
          key:3,
          name:'删除',
        //   buttonProps:{
        //     icon:"delete",
        //     type:"danger"
        //   },
          needConfirm:true,
          confirmTitle:"确认删除"
        },
        {
          key:2,
          name:'重置密码',
        //   buttonProps:{
        //     icon:"delete",
        //     type:"danger"
        //   },
          needConfirm:true,
          confirmTitle:"确认重置"
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
        }else if (item.key == 2){
            resetPassword(record.id).then(data => {
                message.success("重置密码成功")
                this.fetchList(adminPage);
            })
        }
      }
    }
  } 

  getRole = () => {
        const {role} = this.props;
        const {allRole} = role
        return allRole.map(item => (
            <Option key={item.id}>{item.roleName}</Option>
        ))
    }

  get modalProps() {
    const { admin,actions } = this.props
    const { currentAdmin, deptTree,adminModalVisible,adminPage, adminModalType,submitAdminPending } = admin

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
          key: "deptId",
          label: "父部门",
          initialValue: editItem.deptId,
          widget: TreeSelect,
          widgetProps:{
            treeData:deptTree,
            treeDefaultExpandAll:false,
            onChange:this.onChange,
          },
          required: false
        },
        {
          key: "loginId",
          label: "登录名",
          initialValue: editItem.loginId,
          widget: Input,
          required: true
        },
        {
          key: "username",
          label: "账户名",
          initialValue: editItem.username,
          widget: Input,
          required: true
        },
        // {
        //   key: "password",
        //   label: "密码",
        //   // initialValue: editItem.password,
        //   widget: Input,
        //   required: true
        // },
        {
            key: "role",
            label: "权限",
            initialValue: editItem.role == undefined ? "": editItem.role.split(","),
            widget: Select,
            widgetProps:{
                mode:"multiple"
            },
            children:this.getRole(),
        },
      ],
      onOk: data => {
        let password = md5(data.password);
        submitAdmin(Object.assign({},data,{password,role: data.role.join(";")})).then(data=> {
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
        searchElements: [
            {
                key: "username",
                widget: Input,
                widgetProps:{
                    placeholder:"请输入账户名"
                },
            },
        ],
    //   title:"",
        onFilterChange: value => {
            this.fetchList(adminPage,value)
        },
        onAdd() {
            adminModalChange(true,'create')
        },
    }
  }

  get buttonProps() {
    const { location,actions,admin } = this.props
    const { query } = location
    const { currentAdmin,adminPage} = admin
    const { adminModalChange } = actions;
    return {
        buttons:[
            {
                name:"新增",
                buttonProps:{
                    type:"primary",
                    icon:"plus",
                },
                onClick:()=>{adminModalChange(true,'create')}
            }
        ]
    }
  }

  onSelect = (selectedKeys) => {
    this.fetchList(1,{deptId:selectedKeys[0]})
  }

  render() {
    const {admin} = this.props
    const { currentAdmin, deptTree,adminModalVisible,adminPage, adminModalType,submitAdminPending } = admin
    return (
      <Page inner>
        <Row>
            <Col span={4}>
            <div style={{marginTop:6,paddingRight:10,borderWidth:1,borderColor:"#eee"}}>
                <div style={{fontSize:20}}>部门选择</div>
                <Tree
                    style={{paddingRight:30}}
                    treeData={deptTree}
                    onSelect={this.onSelect}
                >
                </Tree>
            </div>
            </Col>
            <Col span={20} >
            <CrudFilter {...this.filterProps} />
            <CrudButtons {...this.buttonProps} />
            <CrudTable {...this.listProps} />
            <CrudForm {...this.modalProps} />
            </Col>
        </Row>
      </Page>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    admin: state.admin,
    role: state.role,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
    roleActions: bindActionCreators({ ...roleActions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminPage);